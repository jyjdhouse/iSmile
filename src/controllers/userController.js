//Database
const db = require('../database/models');
// Utils
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;

// Librerias
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// AWS S3
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
// UTILS
const provinces = require('../utils/staticDB/provinces');
const countryCodes = require('../utils/staticDB/countryCodes');
const getUser = require('../utils/getUser');
const getOrder = require('../utils/getOrder');
const getDeepCopy = require('../utils/getDeepCopy');
const getAllGenres = require('../utils/getAllGenres');
const getAllProducts = require('../utils/getAllProducts');
const dateFormater = require('../utils/dateFormater');
const dateFormaterForInput = require('../utils/userProfDateFormater');

// CONTROLLER
const controller = {

    userProfile: async (req, res) => {
        try {
            let user = getDeepCopy(await getUser(req.session.userLoggedId));
            let dateFormated;
            // Formateo la fecha
            if(user.birth_date){
                dateFormated = dateFormater(user.birth_date);
                user.birth_date = dateFormaterForInput(user.birth_date)
            }
           
            console.log(user.birth_date)
       
            
            // return res.send(user);
            const genres = await getAllGenres()
            return res.render('userProfile', { user, provinces, genres, dateFormated })
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
            console.log(user.temporalCart)
            // Agarro los temporal Items, que son los productos que estan en el carro
            let cart = user.temporalCart?.temporalItems;
            // Ahora voy por cada producto del temporalItem, lo dejo con un precio y la primer imagen
            // de cada producto
            cart = cart?.map(tempItem => {
                // Primero busco si hay mainImage, sino primer foto que aparezca
                let tempItemFile = tempItem.product.files?.find(file => file.main_image)?.filename;
                !tempItemFile ? tempItemFile = tempItem.product.files?.find(file => file.file_types_id = 1)?.filename : null;
                return {
                    tempItemId: tempItem.id,
                    products_id: tempItem.products_id,
                    name: tempItem.product.name,
                    price: tempItem.product.price,
                    filename: tempItemFile,
                    stock: tempItem.stock
                }
                
            });
            console.log(cart)
           
           
            if (cart) {
                // Para obtener url de las fotos
                for (let i = 0; i < cart.length; i++) {
                    const product = cart[i];
                    const filename = product.filename;
                    let url;
                    if (filename) {
                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `product/${filename}`
                        }
                        const command = new GetObjectCommand(getObjectParams);
                        url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                    }

                    product.file_url = url; //en el href product.files[x].file_url
                };
                // return res.send(cart);
                // Ordeno el carro del tempItemId mas gde a mas chico (Mas nuevo arriba)
                cart = cart?.sort((a, b) => b.tempItemId - a.tempItemId);
                
            }
            
            return res.render('checkout.ejs', { user, cart, provinces, countryCodes });
        }
        return res.render('checkout.ejs', { provinces, countryCodes });
    },
    processRegist: async (req, res) => {
        // Ultima ruta que estuvo, para luego redirigir
        let relativePath = getRelativePath(req.headers.referer);
        try {

            // Traigo errores
            let errors = validationResult(req);

            if (!errors.isEmpty()) { //Si hay errores en el back...
                errors = errors.mapped();

                errors = {
                    msg: `${errors.email ? errors.email.msg : errors['password']?.msg || errors['re-password'].msg}`//Si viene el del mail le mando primero ese
                }
                // return res.send(errors)
                return res.render('regist', { errors });
            }

            // Datos del body
            let { password, email } = req.body
            let userData = {
                id: uuidv4(),
                first_name: '',
                last_name: '',
                dni: '',
                email,
                password: bcrypt.hashSync(password, 10),//encripta la password ingresada ,
                wpp_notifications: 0,
                email_notifications: 0,
                email_newsletter: 0,
                user_categories_id: 3 //Cliente
            };
            const userCreated = await db.User.create(userData); //Creo el usuario
            // Lo tengo que loggear directamente
            const cookieTime = (1000 * 60) * 60 * 24 * 7 //1 Semana

            /* req.session.userLoggedId = userCreated.id; //Defino en sessions al usuario loggeado */

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
            let pathToReturn = req.session.returnTo
            res.clearCookie('userAccessToken');
            res.clearCookie('adminToken')
            // res.clearCookie('token');
            req.session.destroy();
            res.redirect(`${pathToReturn}`);
        } catch (error) {
            console.log(`Falle en userController.logout: ${error}`);
            return res.json(error);
        }
    },
    login: (req, res) => {
        console.log(req.session);
        return res.render('login');
    },
    regist: (req, res) => {
        return res.render('regist')
    },
    processLogin: async (req, res) => {
        try {
            // Ultima ruta que estuvo, para luego redirigir
            let userData = req.body;

            let userToLog = await db.User.findOne({ where: { email: userData.email } });
            // return res.send(userToLog);
            // Si hay usuario
            if (userToLog) {
                // Comparo contrasenas
                if (bcrypt.compareSync(userData.password, userToLog.password)) {

                    let cookieTime = (1000 * 60) * 60 * 24  //1 Dia
                    // Generar el token de autenticación
                    req.session.userLoggedId = userToLog.id;
                    console.log({userController: req.session})
                    const token = jwt.sign({ id: userToLog.id }, secret, { expiresIn: '1d' }); // genera el token
                    res.cookie('userAccessToken', token, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });
                    // Si es admin armo una cookie con el token de admin
                    if (userToLog.user_categories_id == 1 || userToLog.user_categories_id == 2) {
                        const adminToken = jwt.sign({ id: userToLog.id }, secret, { expiresIn: '4h' });
                        cookieTime = (1000 * 60) * 60 * 4; //4 horas
                        res.cookie('adminToken', adminToken, { maxAge: cookieTime, httpOnly: true, /*TODO: Activarlo una vez deploy => secure: true,*/  sameSite: "strict" });
                    }
                    return res.redirect(`${req.session.returnTo}`);
                }
                // Si llego aca es porque esta mal la contrasena
                return res.render('login', { errors: true });

            }
            // Si llego aca es porque esta mal el email o password
            return res.render('login', { errors: true });

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
            console.log(userBodyData.birth_date)
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
            // Si no encuentro usuario redirijo a la 404
            if (!userWithToken) return res.render('error404');
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
            // Si no encuentro usuario redirijo a la 404
            if (!userWithToken) return res.render('error404');
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
