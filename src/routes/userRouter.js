const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
// Validators
const registValidations = require('../middlewares/registValidations');

// MIDDLEWARES
const loginMiddleware = require('../middlewares/loginMiddleware');
const userLogged = require('../middlewares/userLogged');
// Rutas

// GET
router.get('/logout',userController.logout);
router.get('/checkout',loginMiddleware,userController.checkout); 
router.get('/profile',userLogged,guestMiddleware,userController.userProfile);
router.get('/cambiar-contrasena/:token',userController.changePasswordView);
router.get('/contrasena-error',userController.passwordError);

// POST
router.post('/login',userController.login);
router.post('/regist',registValidations,userController.processRegist);
router.post('/change-password/:token',userController.processNewPassword)

//PUT
router.put('/profile',userController.update)


module.exports=router;