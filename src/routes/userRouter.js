const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Validators
const validations = require('../middlewares/validations');

// MIDDLEWARES
const getLastURL = require('../middlewares/getLastURL');
const guestMiddleware = require('../middlewares/guestMiddleware');
const onlyGuestsMiddleware = require('../middlewares/onlyGuestsMiddleware');
// Rutas

// GET
router.get('/login', onlyGuestsMiddleware,getLastURL,userController.login);
router.get('/regist', onlyGuestsMiddleware,userController.regist);
router.get('/logout', getLastURL,userController.logout);
router.get('/checkout',userController.checkout); 
router.get('/profile', guestMiddleware,userController.userProfile);
router.get('/cambiar-contrasena/:token',userController.changePasswordView);
router.get('/contrasena-error',userController.passwordError);
router.get('/booking',userController.bookingView);
router.get('/historial-compras',guestMiddleware,userController.orderHistory);

// POST
router.post('/login',userController.processLogin);
router.post('/regist',validations.userRegistValidations,userController.processRegist);
router.post('/change-password/:token',userController.processNewPassword)
//PUT
router.put('/profile',guestMiddleware,validations.userUpdateValidations,userController.update)


module.exports=router;