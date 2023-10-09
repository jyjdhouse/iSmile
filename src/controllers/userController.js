//Database
const db = require("../database/models");

// Librerias
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const cron = require("node-cron");
// AWS S3
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// Creo el objeto
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});
// UTILS
const provinces = require("../utils/staticDB/provinces");
const countryCodes = require("../utils/staticDB/countryCodes");
const genres = require("../utils/staticDB/genres");
const getUser = require("../utils/getUser");
const getDeepCopy = require("../utils/getDeepCopy");
const dateFormater = require("../utils/dateFormater");
const dateFormaterForInput = require("../utils/userProfDateFormater");
const getRelativePath = require("../utils/getRelativePath");
const webTokenSecret = process.env.JSONWEBTOKEN_SECRET;
const orderStatuses = require("../utils/staticDB/orderStatus");
const orderTypes = require("../utils/staticDB/orderTypes");
const generateRandomCodeWithExpiration = require("../utils/generateRandomCodeWithExpiration");
const sendVerificationCodeMail = require("../utils/sendverificationCodeMail");
const handleStock = require("../utils/handleStock");
const acceptedCards = require("../utils/staticDB/acceptedCards");
const paymentMethods = require("../utils/staticDB/paymentMethods");
// CONTROLLER
const controller = {
  userProfile: async (req, res) => {
    try {
      let user = getDeepCopy(await getUser(req.session.userLoggedId));
      let dateFormated;
      // Formateo la fecha
      if (user.birth_date) {
        dateFormated = dateFormater(user.birth_date,false);
        user.birth_date = dateFormaterForInput(user.birth_date);
      }
      // busco aca el prefijo del numero y lo pongo
      user.prefixCode =
        countryCodes.find((code) => code.id == user.country_codes_id)?.code ||
        "54";

      // return res.send(user);
      return res.render("userProfile", {
        user,
        provinces,
        genres,
        dateFormated,
        countryCodes,
      });
    } catch (error) {
      console.log(`Falle en userController.userProfile: ${error}`);
      return res.json({ error });
    }
  },
  checkout: async (req, res) => {
    let userId = req.session.userLoggedId;
    // return res.render('checkout.ejs', { provinces });
    if (userId) {
      //Si hay usuario loggeado
      let user = getDeepCopy(await getUser(userId));
      // return res.send(user);
      // Agarro los temporal Items, que son los productos que estan en el carro
      let cart = user.temporalCart?.temporalItems;
      // Ahora voy por cada producto del temporalItem, lo dejo con un precio y la primer imagen
      // de cada producto
      cart = cart?.map((tempItem) => {
        // Primero busco si hay mainImage, sino primer foto que aparezca
        let tempItemFile = tempItem.product.files?.find(
          (file) => file.main_image
        )?.filename;
        !tempItemFile
          ? (tempItemFile = tempItem.product.files?.find(
              (file) => (file.file_types_id = 1)
            )?.filename)
          : null;
        return {
          tempItemId: tempItem.id,
          products_id: tempItem.products_id,
          name: tempItem.product.name,
          price: tempItem.product.price,
          stock: tempItem.product.stock,
          discount: tempItem.product.discount,
          filename: tempItemFile,
        };
      });

      if (cart) {
        // Para obtener url de las fotos
        for (let i = 0; i < cart.length; i++) {
          const product = cart[i];
          const filename = product.filename;
          let url;
          if (filename) {
            const getObjectParams = {
              Bucket: bucketName,
              Key: `product/${filename}`,
            };
            const command = new GetObjectCommand(getObjectParams);
            url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
          }

          product.file_url = url; //en el href product.files[x].file_url
        }
        // return res.send(cart);
        // Ordeno el carro del tempItemId mas gde a mas chico (Mas nuevo arriba)
        cart = cart?.sort((a, b) => b.tempItemId - a.tempItemId);
      }
      // return res.send(cart)
      return res.render("checkout.ejs", {
        user,
        cart,
        provinces,
        countryCodes,
      });
    }
    return res.render("checkout.ejs", { provinces, countryCodes });
  },
  safePaymentView: async (req, res) => {
    try {
      const order_tra_id = req.session.order_tra_id;
      const cards = acceptedCards;
      // Me tengo que fijar que los items que este por pagar se encuentren en stock
      const orderToPay = getDeepCopy(
        await db.Order.findOne({
          where: {
            tra_id: order_tra_id || "",
          },
          include: ["orderItems"],
        })
      );

      // Si no hay orden, o la orden que esta no esta ni pendiente de pago ni de confirmacion lo devuelvo al checkout
      if (
        !order_tra_id ||
        !orderToPay ||
        (orderToPay.order_status_id != 4 && orderToPay.order_status_id != 3)
      ) {
        return res.redirect("/user/checkout?checkoutErrors=true");
      }
      //Si esta pendiente de confirmacion
      if (orderToPay.order_status_id == 4) {
        //Resto los items del stock antes de llevarlo a la vista(por si paga y justo se liquida uno para que no se quede sin)
        let stockItems = [];
        let method = "resta";
        orderToPay.orderItems.forEach((item) => {
          // pusheo los objetos al stockItems
          stockItems.push({
            id: item.products_id, //El id del producto
            quantity: item.quantity,
          });
        });
        let stockResponse = await handleStock(stockItems, method);
        if (!stockResponse.ok) {
          console.log("Falle en el stock");
          //Alguno de los items que quiere pagar ya no se encuentra en stock
          // Tengo que borrar la orden (porque sino queda pendiente de confirmacion y cuando vuelve a mandar
          // crea una nueva)
          await db.Order.destroy({
            where: {
              id: orderToPay.id,
            },
            force: true // Habilita la eliminación forzada. Para que la borre entera
          });
          return res.redirect("/user/checkout?checkoutErrors=true");
        }
        //Si estuvo bien, cambio la orden a pendiente de pago
        await db.Order.update(
          {
            order_status_id: 3, //Pendiente de pago
            pending_payment_date: Date.now(), //Fecha del momento
          },
          {
            where: {
              id: orderToPay.id,
            },
          }
        );
        orderToPay.pending_payment_date = Date.now(); //La actualizo en el momento para poder usarla
        //De esta manera, si hace refresh no vuelve a descontar de stock

        const checkForPaymentDone = async () => {
          const order = await db.Order.findOne({
            where: { id: orderToPay.id },
            include: ["orderItems"],
          });
          //Si la orden esta pendiente de pago...
          if (order && order.order_status_id == 3) {
            // Me fijo los tiempos (inicial, actual)
            const currentTime = new Date();
            const fifteenMinLater = new Date(
              order.pending_payment_date.getTime() + 60 * 1000 * 5
            );
            // Si pasaron 15 min y la orden sigue con el pago pendiente
            if (currentTime >= fifteenMinLater) {
              console.log(
                "Han transcurrido 15 minutos. Actualización de estado realizada."
              );

              await db.Order.update(
                {
                  is_pending_payment_expired: 1,
                  pending_payment_date: null,
                  order_status_id: 5, //Anulada,
                  details: `Compra anulada por vencimiento de pago`,
                },
                {
                  where: { id: orderToPay.id },
                }
              );
              // Tengo que sumar el stock nuevamente
              let method = "suma";
              let stockItems = [];
              order.orderItems.forEach((item) => {
                // pusheo los objetos al stockItems
                stockItems.push({
                  id: item.products_id, //El id del producto
                  quantity: item.quantity,
                });
              });
              let stockResponse = await handleStock(stockItems, method);
              if (!stockResponse.ok) {
                console.log("Hubo un error al sumar los items al stock");
              }
              // Detengo la tarea periodica
              periodicTask.stop();
            }
          } else {
            //Si no esta pendiente de pago...

            // Detengo la tarea periodica
            periodicTask.stop();
          }
        };
        // cada 5 min me fijo si pago, si no pago a partir de 15 minutos doy por anulada la transferencia
        const periodicTask = cron.schedule("*/5 * * * *", checkForPaymentDone);
      }
      // Para mostrar cuanto tiempo falta para que expire el pago
      const paymentDueDate = new Date(orderToPay.pending_payment_date);
    
      // Suma 15 minutos a la fecha de la orden
      const expireTime =  paymentDueDate.setTime(paymentDueDate.getTime() + 15 * 60 * 1000); // 15 minutos en milisegundos
      const actualTime = new Date().getTime();
      // Calcula la diferencia en milisegundos entre la fecha actual y la fecha de vencimiento
      const timeLeft =  expireTime - actualTime;
     
      orderToPay.timeLeft = timeLeft; //Milisegundos
      return res.render("creditPayment", { order_tra_id, cards, orderToPay });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
  processRegist: async (req, res) => {
    // Ultima ruta que estuvo, para luego redirigir

    let relativePath = getRelativePath(req.headers.referer);
    try {
      // Traigo errores
      let errors = validationResult(req);
      // return res.send(errors);
      if (!errors.isEmpty()) {
        //Si hay errores en el back...
        errors = errors.mapped();

        errors = {
          msg: `${
            errors.email
              ? errors.email.msg
              : errors["password"]?.msg || errors["re-password"].msg
          }`, //Si viene el del mail le mando primero ese
        };
        // return res.send(errors)
        return res.render("regist", { errors });
      }

      // Datos del body
      let { password, email } = req.body;
      // Genero el codigo de verificacion
      const { verificationCode, expirationTime } =
        generateRandomCodeWithExpiration();
      let userData = {
        id: uuidv4(),
        first_name: "",
        last_name: "",
        dni: "",
        email,
        password: bcrypt.hashSync(password, 10), //encripta la password ingresada ,
        wpp_notifications: 0,
        email_notifications: 0,
        email_newsletter: 0,
        user_categories_id: 3, //Cliente
        verified_email: false,
        verified_essential_data: false,
        verification_code: verificationCode,
        expiration_time: expirationTime,
      };

      const userCreated = await db.User.create(userData); //Creo el usuario
      sendVerificationCodeMail(verificationCode, userData.email);
      // Lo tengo que loggear directamente
      const cookieTime = 1000 * 60 * 60 * 24 * 7; //1 Semana

      // Generar el token de autenticación
      const token = jwt.sign({ id: userCreated.id }, webTokenSecret, {
        expiresIn: "1w",
      }); // genera el token
      res.cookie("userAccessToken", token, {
        maxAge: cookieTime,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      // Lo redirijo al prefil para completar la info
      return res.redirect(`/user/profile?completeForm=${true}`);
    } catch (error) {
      console.log(`Falle en userController.processRegist: ${error}`);
      return res.json(error);
    }
  },
  logout: async (req, res) => {
    try {
      let pathToReturn = req.session.returnTo;
      res.clearCookie("userAccessToken");
      res.clearCookie("adminToken");
      // res.clearCookie('token');
      req.session.destroy();
      res.redirect(`${pathToReturn}`);
    } catch (error) {
      console.log(`Falle en userController.logout: ${error}`);
      return res.json(error);
    }
  },
  login: (req, res) => {
    return res.render("login");
  },
  regist: (req, res) => {
    return res.render("regist");
  },
  processLogin: async (req, res) => {
    try {
      // Ultima ruta que estuvo, para luego redirigir
      let userData = req.body;

      let userToLog = await db.User.findOne({
        where: { email: userData.email },
      });
      // return res.send(userToLog);
      // Si hay usuario
      if (userToLog) {
        // Comparo contrasenas
        if (bcrypt.compareSync(userData.password, userToLog.password)) {
          let cookieTime = 1000 * 60 * 60 * 24; //1 Dia
          // Generar el token de autenticación
          req.session.userLoggedId = userToLog.id;
          const token = jwt.sign({ id: userToLog.id }, webTokenSecret, {
            expiresIn: "1d",
          }); // genera el token
          res.cookie("userAccessToken", token, {
            maxAge: cookieTime,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          // Si es admin armo una cookie con el token de admin
          if (
            userToLog.user_categories_id == 1 ||
            userToLog.user_categories_id == 2
          ) {
            const adminToken = jwt.sign({ id: userToLog.id }, webTokenSecret, {
              expiresIn: "4h",
            });
            cookieTime = 1000 * 60 * 60 * 4; //4 horas
            res.cookie("adminToken", adminToken, {
              maxAge: cookieTime,
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            });
          }
          return res.redirect(`${req.session.returnTo}`);
        }
        // Si llego aca es porque esta mal la contrasena
        return res.render("login", { errors: true });
      }
      // Si llego aca es porque esta mal el email o password
      return res.render("login", { errors: true });
    } catch (error) {
      console.log(`Falle en userController.login: ${error}`);
      if (isJwtError(error)) {
        //Si es error de jwt
        let msg = "Error al cambiar la contraseña";
        return res.redirect(`${lastPath}?alert=${msg}`);
      }
      return res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      let userToUpdateId = req.session.userLoggedId;
      let errors = validationResult(req);
      let userBodyData = req.body;
      if (!errors.isEmpty()) {
        //Si hay errores en el back...
        errors = errors.mapped();
        console.log(errors);
        // return res.send(errors)
        return res.redirect("/user/profile?putErrors=true");
      }
      // Datos para la tabla user
      let userDataDB = {
        first_name: userBodyData.first_name,
        last_name: userBodyData.last_name,
        birth_date: userBodyData.birth_date ? userBodyData.birth_date : null,
        genres_id: userBodyData.genre,
        country_codes_id: userBodyData.phone_code,
        phone: userBodyData.phone,
        dni: userBodyData.dni,
        verified_essential_data: 1,
        wpp_notifications: userBodyData.wpp_notifications,
        email_notifications: userBodyData.email_notifications,
        email_newsletter: userBodyData.email_newsletter,
      };
      let userToUpdate = await getUser(userToUpdateId);
      // Actualizo el usuario
      await db.User.update(userDataDB, {
        where: {
          id: userToUpdate.id,
        },
      });
      // Datos para la tabla address
      // Armo el objeto address con los datos que me llegan del form
      let createdAddress, userAddressDataDB;
      let userAddressBody = {
        street: userBodyData.street || null,
        street_number: userBodyData.street_number || null,
        apartment: userBodyData.apartment || null,
        city: userBodyData.city || null,
        zip_code: userBodyData.zip_code || null,
      };
      // Me fijo si son todos los valores nulos, entonces no creo el address
      const userAddressAllKeysNull = Object.values(userAddressBody).every(
        (value) => value === null
      );
      // Si completo por lo menos algun address data tengo que actualizar/crear
      if (!userAddressAllKeysNull) {
        userAddressDataDB = {
          ...userAddressBody,
          provinces_id: userBodyData.provinces_id,
          users_id: userToUpdate.id,
        };
        if (!userToUpdate.userAddress) {
          //Si no tiene una dirección tengo que crear una
          // Le agrego el campo id
          userAddressDataDB.id = uuidv4();
          createdAddress = await db.UserAddress.create(userAddressDataDB);
        } else {
          // Si ya tenia tengo que actualizarla
          await db.UserAddress.update(userAddressDataDB, {
            where: {
              id: userToUpdate.userAddress.id,
            },
          });
        }
      }
      return res.redirect("/user/profile");
    } catch (error) {
      console.log(`Falle en userController.update: ${error}`);
      return res.json(error);
    }
  },
  changePasswordView: async (req, res) => {
    try {
      const { token } = req.params;
      // return res.render('userChangePassword', { token });
      // Verificar si el token es válido
      const userWithToken = await db.User.findOne({
        where: {
          password_token: token,
        },
      });
      // Si no encuentro usuario redirijo a la pagina de error
      if (!userWithToken) return res.redirect("/user/contrasena-error");
      // Ahora me fijo si el token sigue siendo valido
      const decodedData = jwt.verify(token, webTokenSecret);
      // Renderizar la página de cambio de contraseña
      res.render("userChangePassword", { token });
    } catch (error) {
      console.log(`Falle en userController.changePasswordView: ${error}`);
      //Si no verifico el token, redirijo a vista de error
      return res.redirect("/user/contrasena-error");
    }
  },
  processNewPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.redirect(`/user/cambiar-contrasena/${token}?errors=true`);
      }
      // Verificar si el token es válido
      const userWithToken = await db.User.findOne({
        where: {
          password_token: token,
        },
      });
      // Si no encuentro usuario redirijo a la 404
      if (!userWithToken) return res.render("/user/contrasena-error");
      // Ahora me fijo si el token sigue siendo valido
      const decodedData = jwt.verify(token, webTokenSecret);

      // Si hay, le cambio la contrasena por la nueva
      await db.User.update(
        {
          password: bcrypt.hashSync(password, 10),
          password_token: null, //Le saco el token
        },
        {
          where: {
            id: userWithToken.id,
          },
        }
      );
      // Renderizar la página de cambio de contraseña
      res.redirect("/");
    } catch (error) {
      console.log(`Falle en userController.changePasswordView: ${error}`);
      if (isJwtError(error)) {
        //Si es error de jwt
        return res.redirect(`/user/contrasena-error`);
      }
    }
  },
  passwordError: (req, res) => {
    return res.render("changePasswordError");
    return res.json(error);
  },
  bookingView: (req, res) => {
    return res.render("userBooking");
  },
  orderHistory: async (req, res) => {
    try {
      let { userLoggedId } = req.session;
      let ordersToPaint = getDeepCopy(
        await db.Order.findAll({
          where: {
            users_id: userLoggedId,
          },
          include: [
            "shippingAddress",
            "billingAddress",
            {
              association: "orderItems",
              include: [
                {
                  association: "product",
                  include: ["files"],
                  paranoid: false,
                },
              ],
            },
          ],
          order: [
            [
              Sequelize.literal(
                "cast(substring_index(tra_id, '-', 1) as unsigned)"
              ),
              "DESC",
            ],
          ],
          // paranoid: false;
        })
      );
      // return res.send(ordersToPaint);
      // Voy por cada una
      for (let i = 0; i < ordersToPaint.length; i++) {
        const order = ordersToPaint[i];
        // Esto es para traer el estado de la venta
        let orderStatus = orderStatuses.find(
          (stat) => stat.id == order.order_status_id
        );
        let statusColor;
        switch (orderStatus.id) {
          case 1: //confirmada
            statusColor = "#0f0";
            break;
          case 5: //Anulada
            statusColor = "#f00";
            break;
          case 7: //Anulada
            statusColor = "#f00";
            break;

          default: //Pendiente
            statusColor = "#ffd100";
            break;
        }
        order.status = {
          status: orderStatus.status,
          color_code: statusColor,
        };
        // Esto es para el tipo de venta
        let orderType = orderTypes.find(
          (type) => type.id == order.order_types_id
        );
        order.type = orderType.type;
        // Esto es para ver si tiene direccion de entrega

        // Esto es para: traer el url de cada producto
        for (let j = 0; j < order.orderItems.length; j++) {
          const item = order.orderItems[j];
          // Busco en los files del item la mainImage, o la primer foto
          let fileToGetURL;
          fileToGetURL = item.product.files.find((file) => file.main_image);
          // Si no encontro main, busco la primer foto
          !fileToGetURL
            ? (fileToGetURL = item.product.files.find(
                (file) => file.file_types_id == 1
              ))
            : null;
          if (fileToGetURL) {
            const getObjectParams = {
              Bucket: bucketName,
              Key: `product/${fileToGetURL.filename}`,
            };
            const command = new GetObjectCommand(getObjectParams);
            url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
            item.file_url = url;
          }
        }
        // Esto es para el metodo de pago
        let orderPaymentMethod = paymentMethods.find(
          (meth) => meth.id == order.payment_methods_id
        );
        order.paymentMethod = {
          name: orderPaymentMethod.name,
          desc: order.details,
        };
      }

      // return res.send(ordersToPaint);
      return res.render("userOrderHistory", {
        orders: ordersToPaint,
        orderStatuses,
        provinces,
      });
    } catch (error) {
      console.log(`Falle en userController.orderHistory: ${error}`);
      return res.json({ error });
    }
  },
  verifyEmailCode: async (req, res) => {
    return res.render("userEmailVerify");
  },
  cancelOrderPayment: async(req,res) =>{
    const orderTraId = req.session.order_tra_id;
    
    const order = await db.Order.findOne({
      where: {
        tra_id: orderTraId
      }
    });
    // Si no hay orden en el session, o no encuentra orden simplemente redirijo
    if(!orderTraId || !order){
      orderTraId && delete req.session.order_tra_id;
      return res.redirect('/user/checkout');
    };
    // Si hay orden, la elimino de db y de session
    await db.Order.destroy({
      where: {
        id: order.id,
      },
      force: true // Habilita la eliminación forzada
    });
    delete req.session.order_tra_id;
    return res.redirect('/user/checkout');
  }
};

module.exports = controller;
