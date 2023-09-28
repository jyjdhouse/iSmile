const db = require("../../database/models");
// Librerias
const jwt = require("jsonwebtoken");
const getAllUsers = require("../../utils/getAllUsers");
const getUser = require("../../utils/getUser");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
// From utils
const webTokenSecret = process.env.JSONWEBTOKEN_SECRET;
const isJwtError = require("../../utils/isJwtError");
const getRelativePath = require("../../utils/getRelativePath");
const getDeepCopy = require("../../utils/getDeepCopy");
const sendOrderMails = require("../../utils/sendOrderMails");
const getAllProducts = require("../../utils/getAllProducts");
const getOrder = require("../../utils/getOrder");
const emailConfig = require("../../utils/staticDB/mailConfig");
const handleStock = require("../../utils/handleStock");
const {
  shipmentStaticInfo,
  shipmentEstimateUrl,
} = require("../../utils/staticDB/shipmentData");
const generateRandomCodeWithExpiration = require("../../utils/generateRandomCodeWithExpiration");
const sendVerificationCodeMail = require("../../utils/sendverificationCodeMail");

const controller = {
  getLoggedUserId: async (req, res) => {
    try {
      let userId = req.userId;
      let msg = req.msg;

      let user = getDeepCopy(await getUser(userId));
      // Esto es para no mandar al front estos datos
      delete user?.password;
      delete user?.dni;
      delete user?.userAddress;
      delete user?.userCategory;
      delete user?.password_token;
      delete user?.email;
      delete user?.phone;
      delete user?.birth_date;

      // Mando la respuesta
      return res.status(200).json({
        meta: {
          status: 200,
          msg,
        },
        ok: true,
        user,
      });
    } catch (error) {
      console.log(`Falle en apiUserController.getLoggedUser: ${error}`);
      return res.send(error);
    }
  },
  createTempCart: async (req, res) => {
    try {
      const { userId, prodId } = req.body;

      const tempCart = await db.TemporalCart.create({
        users_id: userId,
      });

      await db.TemporalItem.create({
        temporal_cart_id: parseInt(tempCart.id),
        products_id: prodId,
        quantity: 1,
      });

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
          url: `api/user/createTempCart`,
        },
        tempCart,
      });
    } catch (error) {
      console.log("El error fue en userApiController.createTempCart: " + error);
      return res.json(error);
    }
  },
  addTempItem: async (req, res) => {
    try {
      let { tempCartId, prodId, userId } = req.body;

      let prod = await db.Product.findByPk(prodId);

      let tempItem = await db.TemporalItem.create({
        temporal_cart_id: parseInt(tempCartId),
        products_id: prodId,
        quantity: 1,
        added_date: Date.now(),
        stock: prod.stock,
      });
      // Tengo que reiniciar el periodo del carro para tema mails
      await db.User.update(
        {
          cart_period_type: null,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return res.json({
        ok: true,
        meta: {
          status: 200,
          url: `api/product/addTempItem`,
        },
        tempItem,
      });
    } catch (error) {
      console.log("El error fue en apiUserController.addTempItem: " + error);
      return res.json(error);
    }
  },
  deleteTempItem: async (req, res) => {
    try {
      let { prodId, user } = req.body;
      await db.TemporalItem.destroy({
        where: {
          products_id: prodId,
          temporal_cart_id: user.temporalCart.id,
        },
      });
      // Reinicio el contador de mails
      await db.User.update(
        {
          cart_period_type: null,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      return res.json({
        ok: true,
        meta: {
          status: 200,
          url: `api/product/deleteTempItem`,
        },
      });
    } catch (error) {
      console.log("El error fue en userApiController.deleteTempItem: " + error);
      return res.json(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const userToChangePassID = req.userId;
      // El principio de la url
      const host = "ismile.com.ar";

      const user = await getUser(userToChangePassID);

      // Si la sesion no tiene el userLoggedId devuelvo ERROR
      if (!user) res.status(404).json({ error: "Usuario no encontrado" });
      let userEmail = user.email;
      const token = jwt.sign({ id: userToChangePassID }, webTokenSecret, {
        expiresIn: "1h",
      }); // genera el token
      // Guardo el token en la db
      await db.User.update(
        {
          password_token: token,
        },
        {
          where: {
            id: userToChangePassID,
          },
        }
      );
      // URL que mando por mail
      const changePassURL = `https://${host}/user/cambiar-contrasena/${token}`;

      // Configurar el transporte de correo electrónico con nodemailer
      let transporter = nodemailer.createTransport(emailConfig);
      const mailOptions = {
        from: "ismile@ismile.com.ar", // Tu dirección de correo electrónico
        to: userEmail, // Correo electrónico del usuario
        subject: "Cambio de contraseña",
        text: `Hola, haz clic en el siguiente enlace para cambiar tu contraseña: ${changePassURL}`,
        html: `<p>Hola, haz clic <a href="${changePassURL}">aquí</a> para cambiar tu contraseña.</p>`,
      };

      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico enviado: " + info.response);
        }
      });
      // Armo la respuesta para mostrar en el front
      return res.status(200).json({
        meta: {
          status: 200,
        },
        ok: true,
        msg: "Se ha enviado un enlace para cambiar la contraseña a tu correo electrónico.",
      });
    } catch (error) {
      console.log(`Falle en apiUserController.changePassword: ${error}`);
      if (isJwtError(error)) {
        //Si es error de jwt
        let msg = "Error al cambiar la contraseña";
        return res.redirect(`${lastPath}?alert=${msg}`);
      }
      return res.json(error);
    }
  },
  forgetPassword: async (req, res) => {
    try {
      let { mail } = req.body;
      // Busco si hay usuario asociado a ese mail. Si lo hay le armo todo
      // El principio de la url
      const host = "ismile.com.ar";
      const user = await db.User.findOne({
        where: {
          email: mail,
        },
      });

      // Si no encuentra user devuelvo 404
      if (!user) return res.status(404).json({});

      const token = jwt.sign({ id: user.id }, webTokenSecret, {
        expiresIn: "1h",
      }); // genera el token
      // Guardo el token en la db
      await db.User.update(
        {
          password_token: token,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      // URL que mando por mail
      const changePassURL = `https://${host}/user/cambiar-contrasena/${token}`;

      // Configurar el transporte de correo electrónico con nodemailer
      let transporter = nodemailer.createTransport(emailConfig);
      const mailOptions = {
        from: "ismile@ismile.com.ar", // Tu dirección de correo electrónico
        to: mail, // Correo electrónico del usuario
        subject: "Cambio de contraseña",
        text: `Hola, haz clic en el siguiente enlace para cambiar tu contraseña: ${changePassURL}`,
        html: `<p>Hola, haz clic <a href="${changePassURL}">aquí</a> para cambiar tu contraseña.</p>`,
      };

      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico enviado: " + info.response);
        }
      });
      // Armo la respuesta para mostrar en el front
      return res.json({
        meta: {
          status: 200,
        },
        ok: true,
        msg: "Se ha enviado un enlace para cambiar la contraseña a tu correo electrónico.",
      });
    } catch (error) {
      console.log(`Falle en apiUserController.forgetPassword: ${error}`);
      return res.json(error);
    }
  },
  processCheckout: async (req, res) => {
    try {
      let {
        date,
        items,
        users_id,
        name,
        last_name,
        email,
        dni,
        phone_code,
        phone,
        billing_street,
        billing_zip_code,
        billing_floor,
        billing_province,
        billing_city,
        order_types_id,
        use_same_address,
        payment_methods_id,
        save_user_address,
        use_user_address,
      } = req.body;

      items = JSON.parse(items);

      // Traigo los errores de formulario (si alguno vino vacio de los que no debia)
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        //Si hay errores...
        // No importa de que fue error, fue porque algo hicieron en el front ==> Repinto la vista
        // con mensaje de que hubo error
        // return res.send(errors);
        // console.log('HAY ERRORES');
        return res.status(404).json({
          meta: {
            status: 404,
          },
          ok: false,
          errors,
          msg: "Error al procesar la compra, intente nuevamente",
        });
      }
      
      // Si no hay errores
      let productsInDB = getDeepCopy(await getAllProducts());
      // return res.send({productsInDB,items});
      // La direccion de facturacion se crea primero que todo
      const billingAddressToDB = {
        id: uuidv4(),
        street: billing_street,
        apartment: billing_floor || null,
        city: billing_city,
        provinces_id: billing_province,
        zip_code: billing_zip_code,
      };
      // Armo el objeto del pedido
      const randomString = Math.random()
        .toString(36)
        .substring(2, 2 + 10);
      let orderDataToDB = {
        id: uuidv4(),
        tra_id: `${Date.now().toString()}-${randomString}`,
        billing_name: `${name} ${last_name}`,
        billing_email: email,
        billing_id: dni,
        billing_phone: phone_code + phone,
        users_id,
        billing_addresses_id: billingAddressToDB.id,
        shipping_addresses_id: null,
        is_same_address: use_same_address ? 1 : 0,
        order_types_id,
        payment_methods_id,
      };
      // armo los orderItems
      const orderItemsToDB = [];
      let stockItems = [];
      items.forEach((item) => {
        // Agarro el producto
        let itemInDB = productsInDB.find((prod) => prod.id == item.products_id);
        let orderItemName = itemInDB.name;
        let orderItemPrice;
        let orderItemDiscount = parseInt(itemInDB?.discount || 0);
        if (orderDataToDB.order_types_id == 3) {
          //Venta presencial
          // Si vino precio es porque lo modificaron las chicas en la vista de crear venta
          orderItemPrice = item.price ? parseInt(item.price) : itemInDB?.price;
        } else {
          //Venta online
          orderItemPrice = parseInt(itemInDB?.price);
        }

        let orderItemQuantity = parseInt(item.quantity);
        // Voy armando el array de orderItems para hacer un bulkcreate
        let orderId = uuidv4();
        orderItemsToDB.push({
          id: orderId,
          orders_id: orderDataToDB.id,
          products_id: itemInDB.id,
          name: orderItemName,
          price: orderItemPrice,
          quantity: orderItemQuantity,
          discount: orderItemDiscount,
        });
        // pusheo los objetos al stockItems
        stockItems.push({
          id: itemInDB.id,
          quantity: orderItemQuantity,
        });
      });

      // Pregunto que tipo de orden es (RETIRO LOCAL - ENTREGA A DOMICILIO)
      let shippingAddressToDB;
      if (order_types_id == 1) {
        //ENTREGA A DOMICILIO
        //Aca pregunto si tildo la opcion de 'usar misma direccion'. Si la tildo no hago nada (ya habia seteado null
        // la direccion de entrega)
        if (!use_same_address) {
          //Aca vienieron 2 direcciones ( 1facturacion - 1Entrega) ==> Le tengo que agregar a la orden
          // el shipping id
          // Pregunto si vino marcado el campo 'Completar con direccion de entrega del usuario'
          if (use_user_address) {
            //Si vino marcado eso entonces busco la direccion del usuario
            userAddressDB = await db.UserAddress.findOne({
              where: {
                users_id,
              },
            });
            //armo el objeto shippingAddress con los datos del user
            shippingAddressToDB = {
              id: uuidv4(),
              street: userAddressDB?.street,
              apartment: userAddressDB?.apartment || null,
              city: userAddressDB?.city,
              provinces_id: userAddressDB?.provinces_id,
              zip_code: userAddressDB?.zip_code,
            };
          } else {
            //Aca vino una direccion de entrega nueva
            //armo el objeto shippingAddress con los datos del front
            shippingAddressToDB = {
              street: req.body.shipping_street,
              apartment: req.body.shipping_floor || null,
              city: req.body.shipping_city,
              provinces_id: req.body.shipping_province,
              zip_code: req.body.shipping_zip_code,
            };
            // Aca pregunto si vino 'Guardar direccion'.
            if (save_user_address) {
              // Si vino tengo que actualizar/crear la direccion del usuario
              // Primero busco la direccion
              const userAddressInDB = await db.UserAddress.findOne({
                where: {
                  users_id,
                },
              });
              // Si el usuario ya tenia direccion guardada, le hago el update
              if (userAddressInDB) {
                await db.UserAddress.update(shippingAddressToDB, {
                  where: {
                    users_id,
                  },
                });
              } else {
                //Sino el create
                const newUserAddressToDB = {
                  ...shippingAddressToDB,
                  id: uuidv4(), //Le agrego el id para crear
                };
                await db.UserAddress.create(newUserAddressToDB);
              }
            }
            // Le agrego id
            shippingAddressToDB.id = uuidv4();
          }
          // Creo la direccion en ShippingAddress
          const createdShippingAddress = await db.ShippingAddress.create(
            shippingAddressToDB
          );
          // Le pego a la orden con esta direccion
          orderDataToDB.shipping_addresses_id = createdShippingAddress.id;
        }
      } else {
        //Retiro por local o venta fisica ==> los checkbox de la direccion de entrega van en false
        orderDataToDB.is_same_address = 0;
      }
      // Hasta aca ya arme todo. (BillingAddress - Order - OrderItem - ShippingAddress) ==> Tengo que insertar en la DB

      //Tema de orderStatus
      // Si la venta fue presencial entonces la venta esta completa
      if (order_types_id == 3) {
        orderDataToDB.order_status_id = 1;
      } // Aca es venta online ==> Chequeo metodo de pago
      else if (payment_methods_id == 2 || payment_methods_id == 3) {
        //Debito o Credito
        // Si payment_methods_id es 2 o 3 quiere decir que tiene que ir a la pasarela de pagos
        orderDataToDB.order_status_id = 3; //Pendiente de pago
      } else if (payment_methods_id == 1) {
        //Transferencia

        orderDataToDB.order_status_id = 4; //Pendiente de confirmacion
      }

      // Tema total price
      let orderTotalPrice = 0;
      orderItemsToDB.forEach((item) => {
        orderTotalPrice += parseInt(item.price) * (1-(item.discount/100)) * parseInt(item.quantity);
      });
      // Hago los insert en la base de datos

      let orderCreated = await db.Order.create(
        {
          id: orderDataToDB.id,
          tra_id: orderDataToDB.tra_id,
          users_id: orderDataToDB.users_id,
          shipping_addresses_id: orderDataToDB.shipping_addresses_id,
          is_same_address: orderDataToDB.is_same_address,
          total: orderTotalPrice,
          order_status_id: orderDataToDB.order_status_id,
          order_types_id: orderDataToDB.order_types_id,
          payment_methods_id: orderDataToDB.payment_methods_id,
          date: date ? new Date(date) : new Date(),
          billing_name: orderDataToDB.billing_name,
          billing_email: orderDataToDB.billing_email,
          billing_phone: orderDataToDB.billing_phone,
          billing_id: orderDataToDB.billing_id,
          // Esto es para hacer un create dircetamente
          billingAddress: billingAddressToDB,
          orderItems: orderItemsToDB,
        },
        {
          include: ["orderItems", "billingAddress"],
        }
      );
      orderCreated = await getOrder(orderCreated.id);
      // Tengo que armar 2 mails: 1 al que compro y otro a las chicas
      await sendOrderMails(orderCreated);
      //   TODO: Esto no se borra aca si es payment method Tarjeta, porque si se rechaza el pago no deberia borrar el carro

      // Si paga con tarjetas
      if (payment_methods_id == 2 || payment_methods_id == 3) {
        //Armo el session con el tra_id
        req.session.order_tra_id = orderCreated.tra_id;
      } else if (users_id) { //Si medio de pago NO es tarjeta ==> Veo si tiene usuario y si tiene limpio de db
        // Limpio el carro del usuario
        await db.TemporalCart.destroy({
          where: {
            users_id,
          },
        });
        // Tambien reinicio los mails del carro por si vuelve a meter cosas
        await db.User.update(
          {
            last_cart_email: null,
            cart_period_type: null,
          },
          {
            where: {
              id: users_id,
            },
          }
        );
      }
      // Mando la respuesta
      return res.status(200).json({
        meta: {
          status: 200,
        },
        ok: true,
        order_id: orderCreated.tra_id,
        msg: `Orden registrada exitosamente`,
        //Si paga con tarjetas lo tengo que redirigir, sino le pongo false y termina ahi
        redirect:
          payment_methods_id == 2 || payment_methods_id == 3
            ? "/user/checkout/pago-seguro"
            : `/compra-exitosa/${orderCreated.tra_id}`,
      });
    } catch (error) {
      console.log(`Falle en userController.proccessCheckout: ${error}`);
      return res.status(404).json({ error });
    }
  },
  getEstimateShipmentData: async (req, res) => {
    const { zipCodeValue, quantity } = req.body;

    // restaria aca hacer la logica segun la cantidad de elementos, que volumen y peso mandamos
    let totalWeigth;
    let totalVolume;

    try {
      const bodyObject = {
        Cuit: process.env.CUIT,
        Operativa: shipmentStaticInfo.Operativa,
        PesoTotal: totalWeigth,
        VolumenTotal: totalVolume,
        CodigoPostalOrigen: shipmentStaticInfo.CodigoPostalOrigen,
        CodigoPostalDestino: zipCodeValue,
        CantidadPaquetes: --TODO,
        ValorDeclarado: --TODO,
      };
      const response = await fetch(shipmentEstimateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: JSON.stringify(bodyObject),
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud de la api de OCA");
      }
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      const totalValue = xmlDoc.querySelector("Total").textContent;
      const plazoEntregaValue =
        xmlDoc.querySelector("PlazoEntrega").textContent;

      return res.json({
        ok: true,
        meta: {
          status: 200,
          url: `api/product/addTempItem`,
        },
        shippingData: {
          totalValue,
          plazoEntregaValue,
        },
      });
    } catch (error) {
      console.log("Error pidiendo datos del envio:", error);
      return res.json({ error });
    }
  },
  getEmailCode: async (req, res) => {
    try {
      // Genero el codigo de verificacion
      const { verificationCode, expirationTime } =
        generateRandomCodeWithExpiration();
      await db.User.update({
        verification_code: verificationCode,
        expiration_time: expirationTime,
      });

      return res.status(200).json({
        ok: true,
        msg: "Se ha enviado el codigo de verificacion al mail",
      });
    } catch (error) {
      console.log("Falle en apiUserController.getEmailCode:", error);
      return res.json({ error });
    }
  },
  checkVerificationCode: async (req, res) => {
    try {
      let { code } = req.body;
      code = JSON.parse(code);
      let userId = req.userId;
      let user = getDeepCopy(await getUser(userId));
      if (!user) return res.status(400).json();
      // Primero me fijo que el expiration time este bien
      const codeExpirationTime = new Date(user.expiration_time);
      const currentTime = new Date();
      // Este if quiere decir que se vencio
      if (currentTime > codeExpirationTime) {
        return res.status(200).json({
          ok: false,
          msg: "El codigo ha vencido, solicita otro e intente nuevamente",
        });
      }
      // Aca el tiempo es correcto ==> Chequeo codigo
      if (code != user.verification_code) {
        return res.status(200).json({
          ok: false, //TODO: Preguntar como manejar los codigos incorrectos (si pedir otro o dejar que intente)
          msg: "El codigo introducido es incorrecto. Intente nuevamente",
        });
      }
      // Aca esta todo ok ==> Hago el update al usuario y mando el status ok
      await db.User.update(
        {
          verified_email: 1,
          verification_code: null,
          expiration_time: null,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.status(200).json({
        ok: true,
        msg: "Codigo verificado correctamente. Redirigiendo...",
      });
    } catch (error) {
      console.log(`Falle en apiUserController.checkVerificationCode: ${error}`);
      return res.status(400).json({ error });
    }
  },
  sendVerificationCode: async (req, res) => {
    try {
      let userId = req.userId;
      const user = getDeepCopy(await getUser(userId));
      if (!user) return res.status(400).json();
      // Obtengo nuevo codigo y tiempo de expiracion
      const { verificationCode, expirationTime } =
        generateRandomCodeWithExpiration();
      // Mando los mails
      sendVerificationCodeMail(verificationCode, user.email);
      // Hago el update en db
      await db.User.update(
        {
          verification_code: verificationCode,
          expiration_time: expirationTime,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.status(200).json({
        ok: true,
        msg: "Se le ha enviado un codigo de verificación. Por favor, revise en su correo.",
      });
    } catch (error) {
      console.log(`Falle en apiUserController.sendVerificationCode: ${error}`);
      return res.status(400).json({ error });
    }
  },
};

module.exports = controller;
