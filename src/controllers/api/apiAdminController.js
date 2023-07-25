const db = require('../../database/models');
const fs = require('fs');
// Librerias
const secret = require('../../utils/secret').secret;
const jwt = require('jsonwebtoken');
const json2csv = require('json2csv').parse;
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
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

        fs.unlink(filePath, (error) => {
          if (error) {
            console.log('Error al eliminar el archivo CSV:', error);
          } else {
            console.log('Archivo CSV eliminado exitosamente.');
          }
        });

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
      const orderId = req.params.orderId

      const categoryId = req.body.categoryId

      console.log(categoryId)
  
      await db.Order.update(
        { order_status_id: categoryId },
        { where: { tra_id: orderId } } 
      );

      return res.status(200).json({msg: 'Orden actualizada correctamente'})
  
    } catch (error) {
        console.log(error, req.body)
        return res.status(400).send(req.body);
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

    return res.status(200).json({msg: 'Orden eliminada exitosamente'});


    } catch (error) {
      console.log('Fallé en admin controller.downloadClientes' + ' ' + error)
      return res.status(400).json({msg: 'Problema al eliminar una orden'});
    }

  }
}

module.exports = controller