const db = require('../../database/models');
const fs = require('fs');
const handleStock = require('../../utils/handleStock')
// Librerias
const secret = require('../../utils/secret').secret;
const jwt = require('jsonwebtoken');
const json2csv = require('json2csv').parse;
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require('sharp');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// AWS 
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// Creo el objeto
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});

// Utils
const getDeepCopy = require('../../utils/getDeepCopy');
const getAllOrders = require('../../utils/getAllOrders');
const dateFormater = require('../../utils/dateFormater');
const provinces = require('../../utils/staticDB/provinces');
const paymentMethods = require('../../utils/staticDB/paymentMethods');
const orderTypes = require('../../utils/staticDB/orderTypes');
const orderStatuses = require('../../utils/staticDB/orderStatus');
const controller = {

  downloadClients: async (req, res) => {

    try {
      const clients = await db.User.findAll({
        where: {
          user_categories_id: 3
        },
        attributes: ['first_name', 'last_name', 'email', 'phone']
      })
      const csvData = json2csv(clients, {
        fields: [
          { label: 'Email', value: 'email' },
          { label: 'Nombres', value: 'first_name' },
          { label: 'Apellidos', value: 'last_name' },
          { label: 'Teléfono', value: 'phone' }
        ]
      });

      const timestamp = Date.now();
      const fileName = `CLIENTES_${timestamp}.csv`;

      const filePath = `public/csv/${fileName}`;
      // Codificar a UTF-8
      const utf8Data = '\ufeff' + csvData;

      try {
        await fs.promises.writeFile(filePath, utf8Data, { encoding: 'utf-8' });


        const headers = {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=${fileName}`
        };

        // Envía el archivo al cliente para descarga
        res.set(headers);
        fs.createReadStream(filePath).pipe(res);

        // Elimina el archivo después de enviarlo al cliente
        await fs.promises.unlink(filePath);

        return

      } catch (error) {
        console.error('Error al generar el archivo CSV:', error);
      }

    } catch (error) {
      console.log('Fallé en admin controller.downloadClientes' + ' ' + error)
      return res.send(error)
    }

  },
  getOrders: async (req, res) => {
    try {
      // Obtengo las fechas del query si hay
      let fromValue = req.query?.from || undefined;
      // Le resto 1 dia para que lo incluya la busqueda
      fromValue = fromValue && new Date(fromValue);
      fromValue && fromValue.setDate(fromValue.getDate() - 1);
      const toValue = req.query?.to || undefined;
      // Obtengo las ordenes de las ultimas 2 semanas
      const todaysDate = new Date()
      const twoWeeksAgoDate = new Date(todaysDate)
      twoWeeksAgoDate.setDate(twoWeeksAgoDate.getDate() - 15);
      let orders;
      orders = getDeepCopy(await db.Order.findAll({
        where: {
          date: {
            // Aca pregunto si vienen los filtros de busqueda, sino traigo las ultimas 2 semanas
            [Op.gte]: fromValue && toValue ? fromValue : twoWeeksAgoDate,
            [Op.lte]: fromValue && toValue ? toValue : todaysDate
          }
        },
        order: [
          [
            Sequelize.literal("cast(substring_index(tra_id, '-', 1) as unsigned)"),
            'DESC'
          ]
        ],
        include: ['billingAddress', 'shippingAddress', 'orderItems']
      }));

      let statuses = orderStatuses;
      orders.forEach(ord => {
        ord.date = dateFormater(ord.date);
      });

      return res.status(200).json({
        meta: {
          status: 200,
          url: `api/admin/order`
        },
        ok: true,
        amount: orders.length,
        orders,
        provinces,
        paymentMethods,
        orderTypes,
        statuses
      });
    } catch (error) {
      console.log(`Falle en adminApiController.getOrders: ${error}`);
      return res.status(500).json({
        true: false,
        error
      })
    }
  },
  updateOrders: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const categoryId = req.body.categoryId;
      const order = await db.Order.findOne({ where: { tra_id: orderId } });
      const orderItem = await db.OrderItem.findAll({ where: { orders_id: order.id } })
      let method;


      // armo el stock items para mandarle a la funcion
      let stockItems = [];
      orderItem.forEach(item => {
        stockItems.push({
          id: item.products_id,
          quantity: item.quantity
        })

      })

      switch (categoryId) {
        // veo si va de pendiente de confirmación a pendiente de pago 
        case order.order_status_id == 4 && categoryId == 3:
          method = 'resta';
          handleStock(stockItems, method);
          // hago el update con la fecha y el valor true en e
          await db.Order.update(
            {
              order_status_id: categoryId,
              pending_payment_date: Date.now()
            },
            { where: { tra_id: orderId } }
          );
          cron.schedule('0 0 */24 * * *', async () => {
            const order = await db.Order.findOne({ where: { tra_id: orderId } });

            if (order) {
              const currentTime = new Date();
              const twentyFourHoursLater = new Date(order.pending_payment_date.getTime() + (24 * 60 * 60 * 1000)); // Suma 24 horas en milisegundos

              if (currentTime >= twentyFourHoursLater) {
                console.log('Han transcurrido 24 horas. Actualización de estado realizada.');

                await db.Order.update
                  ({ is_pending_payment_expired: 1 },
                    { where: { tra_id: orderId } });

                // Configurar el transporte SMTP para enviar el correo electrónico
                const transporter = nodemailer.createTransport({
                  // Configuración de tu proveedor de correo
                });

                // Configurar los detalles del correo electrónico a enviar
                let mailOptions = {
                  from: 'ismile@ismile.com.ar',
                  to: 'ismile@ismile.com.ar',
                  subject: `Orden vencida: ${order.tra_id}`,
                  text: `Hola ! Este es un mail automático para dejarles saber que la orden ${order.tra_id} pasó el plazo de las 24 horas para completar el pago.`
                };

                // Enviar el correo electrónico
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log('Error al enviar el correo:', error);
                  } else {
                    console.log('Correo electrónico enviado:', info.response);
                  }
                });
              } else {
                console.log('No han transcurrido 24 horas aún.');
              }
            }
          });
          break;
           // veo si se anula
          case 5:
            method = 'suma';
            handleStock(stockItems, method);
            await db.Order.update(
              {
                order_status_id: categoryId,
                pending_payment_date: null,
                is_pending_payment_expired: 0
              },
              { where: { tra_id: orderId } }
            );
          break;
          // veo si va a pendiente de envio
          case 2:
            await db.Order.update(
              {
                order_status_id: categoryId,
                pending_payment_date: null,
                is_pending_payment_expired: 0
              },
              { where: { tra_id: orderId } }
            );
        
        }


    

      return res.status(200).json({ msg: 'Orden actualizada correctamente' })

    } catch (error) {
      return res.status(400).json({ msg: error });
    }

  },
  deleteOrders: async (req, res) => {
    try {
      const orderId = req.params.orderId

      await db.Order.destroy({
        where: {
          id: orderId
        }
      });

      return res.status(200).json({ msg: 'Orden eliminada exitosamente' });


    } catch (error) {
      console.log('Fallé en admin controller.downloadClientes' + ' ' + error)
      return res.status(400).json({ msg: 'Problema al eliminar una orden' });
    }

  },
  processServicesPriceUpdating: async (req, res) => {
    const ids = JSON.parse(req.body.ids);
    const files = req.files;
    const { newPrice, newCashPrice } = req.body;
    const treatmentsInDb = await db.Treatment.findAll();
    let treatmentsToModify = [];
    // Voy por cada id que me llego (tratamiento a editar)
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      // Pusheo el id para hacer el bulkUpdate
      treatmentsToModify.push({
        id
      });
      const file = files[index];
      if (file.size > 0) { //Entonce este id tiene file
        // Tengo que hacer la logica para crear esta imagen en AWS y guardar en el campo filename en la db
        // Creo el nombre unico para la foto (dentro del forEach)
        randomName = 'treatment-' + Math.random().toString(36).substring(2, 2 + 10) + '.webp';
        // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
        //  no se necesita tan gde      
        buffer = await sharp(file.buffer).toFormat('webp').toBuffer();
        // Armo el objeto para subir a AWS   
        let params = {
          Bucket: bucketName,
          Key: `treatment/${randomName}`,//Esto hace que se guarde en la carpeta treatment, y que sobreEscriba a la foto vieja
          Body: buffer,
          ContentType: 'image/webp'
        };
        let command = new PutObjectCommand(params);
        await s3.send(command);

        // Ahora pusheo el filename para hacer el bulkUpdate
        treatmentsToModify[index].filename = randomName;
        // Pregunto si el item tenia filename, si tenia entonces elimino en AWS
        if (treatmentsInDb.find(treat => treat.id == id).filename) {
          params = {
            Bucket: bucketName,
            Key: `treatment/${treatmentsInDb.find(treat => treat.id == id).filename}`
          };
          command = new DeleteObjectCommand(params);
          // Hago el delete de la base de datos
          await s3.send(command);
        }
      } else { //Esto es si no me vino file para ese item
        // Aca le tengo que dejar el que ya estaba
        treatmentsToModify[index].filename = treatmentsInDb.find(treat => treat.id == id).filename;
      };
      // Le termino de agregar lo otro, si hay nuevo precio le pongo el nuevo sino el que estaba
      treatmentsToModify[index].price = newPrice ? parseInt(newPrice) : treatmentsInDb.find(treat => treat.id == id).price;
      treatmentsToModify[index].cash_price = newCashPrice ? parseInt(newCashPrice) : treatmentsInDb.find(treat => treat.id == id).cash_price;

    };

    // Una vez que hago esto con todos los servicios a modificar, hago el bulkUpdate
    await db.Treatment.bulkCreate(treatmentsToModify, {
      updateOnDuplicate: ["price", "cash_price", "filename"]
    });
    // console.log(req.body, req.files);
    return res.status(200).json({});

    // Array con valores numericos
    let treatmentsToUpdate = JSON.parse(req.body.treatments_id);
    // return res.send(treatmentsToUpdate); 
    // Me fijo cuales tienen foto para guardar la imagen
    let treatmentsWithFile = treatmentsToUpdate.filter(treat => treat.file);
    let filenamesToPush = [];
    // Guardo las imagenes en AWS
    for (let i = 0; i < treatmentsWithFile.length; i++) {
      const treat = treatmentsWithFile[i];
      // Si hay archvio lo armo para subir AWS
      if (treat.file) {
        file = Buffer.from(treat.file, 'base64');

      }
    }



    return res.send(treatmentsWithFile);
    let price = req.body.new_price;
    let cashPrice = req.body.new_cash_price;





    // return res.send(treatmentsToUpdate)


    return res.redirect('/');
  }
}

module.exports = controller