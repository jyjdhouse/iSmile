//Database
const db = require('../database/models');
const axios = require('axios')
// Utils
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;

// Librerias
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

// UTILS
const provinces = require('../utils/staticDB/provinces');
const countryCodes = require('../utils/staticDB/countryCodes');
const getUser = require('../utils/getUser');
const getOrder = require('../utils/getOrder');
const getDeepCopy = require('../utils/getDeepCopy');
const getAllGenres = require('../utils/getAllGenres');
const getAllProducts = require('../utils/getAllProducts');
const dateFormater = require('../utils/dateFormater');
const sendOrderMails = require('../utils/sendOrderMails')
// CONTROLLER
const controller = {

    userProfile: async (req, res) => {
        try {
            const user = getDeepCopy(await getUser(req.session.userLoggedId));
            // Formateo la fecha
            user.birth_date = dateFormater(user.birth_date);
            // return res.send(user);
            const genres = await getAllGenres()
            return res.render('userProfile', { user, provinces, genres })
        } catch (error) {
            console.log(`Falle en userController.userProfile: ${error}`);
            return res.json({ error })
        }
    },
    checkout: async (req, res) => {
        let userId = req.session.userLoggedId;
        // return res.render('checkout.ejs', { provinces });
        if (userId) { //Si hay usuario loggeado
            let user = getDeepCopy(await getUser(userId));
            // Agarro los temporal Items, que son los productos que estan en el carro
            let cart = user.temporalCart?.temporalItems;
            // Ahora voy por cada producto del temporalItem, lo dejo con un precio y la primer imagen
            // de cada producto
            cart = cart?.map(tempItem => {
                // Esto es por si tiene un video como primer archivo, no puedo hacer files [0],
                // antes era tempItem.product.files[0]?.filename
                let tempItemFile = tempItem.product.files.find(file => file.file_types_id == 1)?.filename;
                return {
                    tempItemId: tempItem.id,
                    products_id: tempItem.products_id,
                    name: tempItem.product.name,
                    price: tempItem.product.price,
                    filename: tempItemFile
                }
            });
            // Ordeno el carro del tempItemId mas gde a mas chico (Mas nuevo arriba)
            cart = cart?.sort((a, b) => b.tempItemId - a.tempItemId);
            return res.render('checkout.ejs', { user, cart, provinces, countryCodes });
        }
        return res.render('checkout.ejs', { provinces, countryCodes });
    },
    processCheckout: async (req, res) => {
        try {
            let { items, users_id, name, email, last_name, dni, phone_code, phone, billing_street, billing_zip_code,
                billing_floor, billing_province, billing_city, order_types_id, use_same_address, payment_methods_id,
                save_user_address, use_user_address } = req.body
            // return res.send(req.body);
            items = JSON.parse(items);

            // Traigo los errores de formulario (si alguno vino vacio de los que no debia)
            let errors = validationResult(req);

            if (!errors.isEmpty()) { //Si hay errores...
                // No importa de que fue error, fue porque algo hicieron en el front ==> Repinto la vista
                // con mensaje de que hubo error
                // return res.send(errors);
                return res.redirect(`/user/checkout?checkoutErrors=${true}&msg=${errors.errors[0].msg}`)
            }

            // Si no hay errores
            let productsInDB = getDeepCopy(await getAllProducts());
            // return res.send({productsInDB,items});
            // La direccion de facturacion se crea primero que todo
            const billingAddressToDB = {
                id: uuidv4(),
                street: billing_street,
                apartment: billing_floor || '',
                city: billing_city,
                provinces_id: billing_province,
                zip_code: billing_zip_code
            };
            // Armo el objeto del pedido
            const randomString = Math.random().toString(36).substring(2, 2 + 10);
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
                payment_methods_id
            };
            // armo los orderItems
            const orderItemsToDB = [];
            items.forEach(item => {
                // Agarro el producto
                let itemInDB = productsInDB.find(prod => prod.id == item.products_id);
                // console.log(itemInDB);
                let orderItemName = itemInDB.name;
                let orderItemPrice = item.price ? parseInt(item.price) : itemInDB?.price;
                let orderItemQuantity = parseInt(item.quantity);
                // Voy armando el array de orderItems para hacer un bulkcreate
                orderItemsToDB.push({
                    id: uuidv4(),
                    orders_id: orderDataToDB.id,
                    products_id: itemInDB.id,
                    name: orderItemName,
                    price: orderItemPrice,
                    quantity: orderItemQuantity
                });
            });

            // Pregunto que tipo de orden es (RETIRO LOCAL - ENTREGA A DOMICILIO)
            let shippingAddressToDB;
            if (order_types_id == 1) { //ENTREGA A DOMICILIO
                //Aca pregunto si tildo la opcion de 'usar misma direccion'. Si la tildo no hago nada (ya habia seteado null
                // la direccion de entrega)
                if (!use_same_address) { //Aca vienieron 2 direcciones ( 1facturacion - 1Entrega) ==> Le tengo que agregar a la orden
                    // el shipping id
                    // Pregunto si vino marcado el campo 'Completar con direccion de entrega del usuario'
                    if (use_user_address) { //Si vino marcado eso entonces busco por el nombre de la direccion
                        shippingAddressToDB = await db.ShippingAddress.findOne({
                            where: {
                                users_id
                            }
                        });
                        orderDataToDB.shipping_addresses_id = shippingAddressToDB.id;
                    } else { //Aca vino una direccion de entrega nueva
                        //armo el objeto shippingAddress con los datos del front
                        shippingAddressToDB = {
                            id: uuidv4(),
                            street: req.body.shipping_street,
                            apartment: req.body.shipping_floor || null,
                            city: req.body.shipping_city,
                            provinces_id: req.body.shipping_province,
                            zip_code: req.body.shipping_zip_code,
                            users_id: null,//Es nulo porque si el usuario no lo quiere guardar en su perfil queda para la compra nada mas
                        }
                        // Aca pregunto si vino 'Guardar direccion'.
                        if (save_user_address) {
                            // Si vino tengo que borrar el users_id de la direccion vieja para poder crear la nueva
                            // No borro la direccion porque sino no se puede acceder en una consulta (quizas se necesite para ver una
                            // compra vieja)
                            await db.ShippingAddress.update({
                                users_id: null
                            }, {
                                where: {
                                    users_id: users_id
                                }
                            });
                            // Tengo que asociar el usuario a la nueva direccion
                            shippingAddressToDB.users_id = users_id;

                        };
                        // Creo la direccion en ShippingAddress
                        const createdShippingAddress = await db.ShippingAddress.create(shippingAddressToDB);
                        // Le pego a la orden con esta direccion
                        orderDataToDB.shipping_addresses_id = createdShippingAddress.id;
                    };
                };
            } else { //Retiro por local ==> is_same_address = 0 
                orderDataToDB.is_same_address = 0;
            };
            // Hasta aca ya arme todo. (BillingAddress - Order - OrderItem - ShippingAddress) ==> Tengo que insertar en la DB

            //Tema de status
            // Si payment_methods_id es 2 o 3 quiere decir que ya se aprobo el pago ==> pongo el estado pendiente de envio
            if (payment_methods_id == 2 || payment_methods_id == 3) { //Debito o Credito
                orderDataToDB.order_status_id = 2; //Pendiente de envio
            } else if (payment_methods_id == 1) { //Transferencia
                orderDataToDB.order_status_id = 4; //Pendiente de confirmacion
            }
            // Tema total
            let orderTotalPrice = 0;
            orderItemsToDB.forEach(item => {
                orderTotalPrice += parseInt(item.price) * parseInt(item.quantity);
            })
            // Hago los insert en la base de datos
            // await db.BillingAddress.create(billingAddressToDB);
            // await db.OrderItem.bulkCreate(orderItemsToDB);

            let orderCreated = await db.Order.create({
                id: orderDataToDB.id,
                billing_name: orderDataToDB.billing_name,
                billing_email: orderDataToDB.billing_email,
                billing_id: orderDataToDB.billing_id,
                billing_phone: orderDataToDB.billing_phone,
                users_id: orderDataToDB.users_id,
                shipping_addresses_id: orderDataToDB.shipping_addresses_id,
                is_same_address: orderDataToDB.is_same_address,
                order_types_id: orderDataToDB.order_types_id,
                payment_methods_id: orderDataToDB.payment_methods_id,
                total: orderTotalPrice,
                order_status_id: orderDataToDB.order_status_id,
                tra_id: orderDataToDB.tra_id,
                // Esto es para hacer un create dircetamente
                billingAddress: billingAddressToDB,
                orderItems: orderItemsToDB,
            }, {
                include: ['orderItems', 'billingAddress']
            });
            orderCreated = await getOrder(orderCreated.id);
            // Tengo que armar 2 mails: 1 al que compro y otro a las chicas
            await sendOrderMails(orderCreated);
            return res.send(orderCreated)
            // Si se creo la orden entonces limpio el carro del usuario
            if(users_id){
                await db.temporalCart.destroy({
                    where: {
                        users_id
                    }
                })
            }
            
            return res.render('orderSuccess.ejs', { Order });
            return res.send({
                orderDataToDB, orderItemsToDB, billingAddressToDB, shippingAddressToDB
            });
        } catch (error) {
            console.log(`Falle en userController.proccessOrder: ${error}`);
            return res.json({ error })
            return res.redirect(`/user/checkout?checkoutErrors=${true}&msg="Error al procesar la compra, intente nuevamente"`)
        }
    },
    processRegist: async (req, res) => {
        // Ultima ruta que estuvo, para luego redirigir
        let relativePath = getRelativePath(req.headers.referer);
        try {

            // Traigo errores
            let errors = validationResult(req);

            if (!errors.isEmpty()) { //Si hay errores en el back...
                errors = errors.mapped();
                console.log(errors);
                let registErrors = {
                    msg: `${errors.email ? errors.email.msg : errors['password']?.msg || errors['re-password'].msg}`//Si viene el del mail le mando primero ese
                }
                return res.redirect(`${relativePath}?errors=${true}&registErrors=${JSON.stringify(registErrors)}`);
            }

            const emailBody = req.body.email.toLowerCase();

            const emailAlreadyInDb = await db.User.findOne({
                where: {
                    email: emailBody
                }
            });

            if (emailAlreadyInDb) {
                errors = {
                    credentials: { msg: "Email ya registrado" }
                };
                const oldData = {
                    email: emailAlreadyInDb.email
                }
                return res.redirect(`${relativePath}?errors=${JSON.stringify(errors)}&oldData=${JSON.stringify(oldData)}`);
            }

            // Datos del body
            let { password } = req.body
            let userData = {
                id: uuidv4(),
                first_name: '',
                last_name: '',
                dni: '',
                email: emailBody,
                password: bcrypt.hashSync(password, 10),//encripta la password ingresada ,
                wpp_notifications: 0,
                email_notifications: 0,
                email_newsletter: 0,
                user_categories_id: 3 //Cliente
            };
            const userCreated = await db.User.create(userData); //Creo el usuario
            // Lo tengo que loggear directamente
            const cookieTime = (1000 * 60) * 60 * 24 * 7 //1 Semana

            req.session.userLoggedId = userCreated.id; //Defino en sessions al usuario loggeado

            // Generar el token de autenticación
            const token = jwt.sign({ id: userCreated.id }, secret, { expiresIn: '1w' }); // genera el token
            res.cookie('userAccessToken', token, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });

            // Lo redirijo al prefil para completar la info
            return res.redirect(`/user/profile?completeForm=${true}`);
        } catch (error) {
            console.log(`Falle en userController.processRegist: ${error}`);
            return res.json(error);
        }
    },
    logout: async (req, res) => {
        try {
            let relativePath = getRelativePath(req.headers.referer);
            res.clearCookie('userAccessToken');
            res.clearCookie('adminToken')
            // res.clearCookie('token');
            req.session.destroy();
            res.redirect(relativePath);
        } catch (error) {
            console.log(`Falle en userController.logout: ${error}`);
            return res.json(error);
        }
    },
    login: async (req, res) => {
        try {
            // Ultima ruta que estuvo, para luego redirigir
            let relativePath = getRelativePath(req.headers.referer);

            let userData = req.body;

            let userToLog = await db.User.findOne({ where: { email: userData.email } });
            // return res.send(userToLog);
            // Si hay usuario
            if (userToLog) {
                // Comparo contrasenas
                if (bcrypt.compareSync(userData.password, userToLog.password)) {

                    let cookieTime = (1000 * 60) * 60 * 24  //1 Dia
                    // Generar el token de autenticación
                    const token = jwt.sign({ id: userToLog.id }, secret, { expiresIn: '1d' }); // genera el token
                    res.cookie('userAccessToken', token, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });
                    // Si es admin armo una cookie con el token de admin
                    if (userToLog.user_categories_id == 1 || userToLog.user_categories_id == 2) {
                        const adminToken = jwt.sign({ id: userToLog.id }, secret, { expiresIn: '4h' });
                        cookieTime = (1000 * 60) * 60 * 4; //4 horas
                        res.cookie('adminToken', adminToken, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });
                        // Le agrego el token al user en la db
                        // TODO: Preguntarle a martin para que usar esto
                        // await db.User.update({
                        //     admin_token: adminToken
                        // },{
                        //     where: {
                        //         id: userToLog.id
                        //     }
                        // })
                    }
                    return res.redirect(relativePath);
                }
                // Si llego aca es porque esta mal la contrasena
                return res.redirect(`${relativePath}?loginErrors=${true}`);

            }
            // Si llego aca es porque esta mal el email o password
            return res.redirect(`${relativePath}?loginErrors=${true}`);

        } catch (error) {
            console.log(`Falle en userController.login: ${error}`);
            if (isJwtError(error)) { //Si es error de jwt
                let msg = "Error al cambiar la contraseña"
                return res.redirect(`${lastPath}?alert=${msg}`);
            }
            return res.json(error);
        }
    },
    update: async (req, res) => {
        try {
            let userToUpdate = await getUser(req.session.userLoggedId)
            let userBodyData = req.body;
            // return res.send({userToUpdate,userBodyData});
            // Datos para la tabla user
            let userDataDB = {
                first_name: userBodyData.first_name,
                last_name: userBodyData.last_name,
                birth_date: userBodyData.birth_date,
                genres_id: userBodyData.genre,
                phone: userBodyData.phone,
                dni: userBodyData.dni,
                wpp_notifications: parseInt(userBodyData.wpp_notifications),
                email_notifications: parseInt(userBodyData.email_notifications),
                email_newsletter: parseInt(userBodyData.email_newsletter),
            };
            // Actualizo el usuario
            await db.User.update(userDataDB, {
                where: {
                    id: userToUpdate.id
                }
            })
            // Datos para la tabla address
            // Armo el objeto address con los datos que me llegan del form
            let createdAddress, shippingAddressDataDB;
            let shippingAddressBody = {
                id: uuidv4(),
                street: userBodyData.street || null,
                apartment: userBodyData.apartment || null,
                city: userBodyData.city || null,
                zip_code: userBodyData.zip_code || null
            }
            // Me fijo si son todos los valores nulos, entonces no creo el address
            const shippingAddressAllKeysNull = Object.values(shippingAddressBody).every(value => value === null);
            // Si completo por lo menos algun address data tengo que actualizar/crear
            if (!shippingAddressAllKeysNull) {
                shippingAddressDataDB = {
                    ...shippingAddressBody,
                    provinces_id: userBodyData.provinces_id,
                    users_id: userToUpdate.id
                };
                if (!userToUpdate.shippingAddress) {//Si no tiene una dirección tengo que crear una
                    // Le agrego el campo id 
                    shippingAddressDataDB.id = uuidv4();
                    createdAddress = await db.ShippingAddress.create(shippingAddressDataDB);
                } else { // Si ya tenia tengo que actualizarla
                    await db.ShippingAddress.update(shippingAddressDataDB, {
                        where: {
                            id: userToUpdate.shippingAddress.id
                        }
                    });
                }
            }
            return res.redirect('/user/profile')
        } catch (error) {
            console.log(`Falle en userController.login: ${error}`);
            return res.json(error);
        }
    },
    changePasswordView: async (req, res) => {
        try {
            const { token } = req.params;
            // Verificar si el token es válido
            const userWithToken = await db.User.findOne({
                where: {
                    password_token: token
                }
            });
            // Si no encuentro usuario redirijo a la home TODO: 404
            if (!userWithToken) return res.redirect('/');
            // Ahora me fijo si el token sigue siendo valido
            const decodedData = jwt.verify(token, secret);
            // Renderizar la página de cambio de contraseña
            res.render('userChangePassword', { token });
        } catch (error) {
            console.log(`Falle en userController.changePasswordView: ${error}`);
            //Si no verifico el token, redirijo a vista de error
            return res.redirect('/user/contrasena-error')

        }
    },
    processNewPassword: async (req, res) => {
        try {
            const { token } = req.params;
            const { password } = req.body;
            // Verificar si el token es válido
            const userWithToken = await db.User.findOne({
                where: {
                    password_token: token
                }
            });
            // Si no encuentro usuario redirijo a la home TODO: 404
            if (!userWithToken) return res.redirect('/');
            // Ahora me fijo si el token sigue siendo valido
            const decodedData = jwt.verify(token, secret);

            // Si hay, le cambio la contrasena por la nueva
            await db.User.update({
                password: bcrypt.hashSync(password, 10),
                password_token: null //Le saco el token
            }, {
                where: {
                    id: userWithToken.id
                }
            })
            // Renderizar la página de cambio de contraseña
            res.redirect('/');
        } catch (error) {
            console.log(`Falle en userController.changePasswordView: ${error}`);
            if (isJwtError(error)) { //Si es error de jwt
                return res.redirect(`/user/contrasena-error`);
            }
        }
    },
    passwordError: (req, res) => {
        return res.render('changePasswordError');
        return res.json(error);
    },
    bookingView: (req, res) => {
        return res.render('userBooking')
    }

};

module.exports = controller;
