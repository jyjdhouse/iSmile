const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Validators
const registValidations = require('../middlewares/registValidations');

// MIDDLEWARES
const orderIsCompleteValidations = require('../middlewares/orderIsCompleteValidatons');
const getLastURL = require('../middlewares/getLastURL');
const guestMiddleware = require('../middlewares/guestMiddleware');
const onlyGuestsMiddleware = require('../middlewares/onlyGuestsMiddleware');
// Rutas

// GET
router.get('/login',onlyGuestsMiddleware,getLastURL,userController.login);
router.get('/regist',onlyGuestsMiddleware,userController.regist);
router.get('/logout',/* guestMiddleware, */getLastURL,userController.logout);
router.get('/checkout',userController.checkout); 
router.get('/profile',guestMiddleware,userController.userProfile);
router.get('/cambiar-contrasena/:token',userController.changePasswordView);
router.get('/contrasena-error',userController.passwordError);
router.get('/booking',userController.bookingView)
// POST
router.post('/login',userController.processLogin);
router.post('/regist',registValidations,userController.processRegist);
router.post('/change-password/:token',userController.processNewPassword)
// router.post('/checkout',orderIsCompleteValidations,userController.processCheckout); 
//PUT
router.put('/profile',guestMiddleware,userController.update)


module.exports=router;