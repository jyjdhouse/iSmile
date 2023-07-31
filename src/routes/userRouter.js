const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
// Validators
const registValidations = require('../middlewares/registValidations');

// MIDDLEWARES
const orderIsCompleteValidations = require('../middlewares/orderIsCompleteValidatons');
// Rutas

// GET
router.get('/login',userController.login);
router.get('/regist',userController.regist);
router.get('/logout',userController.logout);
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
router.put('/profile',userController.update)


module.exports=router;