const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
// Validators
const registValidations = require('../middlewares/registValidations');

// MIDDLEWARES
const loginMiddleware = require('../middlewares/loginMiddleware');

// Rutas

// GET
router.get('/logout',userController.logout);
router.get('/checkout',loginMiddleware,userController.checkout); 
router.get('/profile',guestMiddleware,userController.userProfile);
router.get('/change-password',guestMiddleware,userController.changePassword)

// POST
router.post('/login',userController.login);
router.post('/regist',registValidations,userController.processRegist);

//PUT
router.put('/profile',userController.update)


module.exports=router;