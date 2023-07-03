const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Validators
const registValidations = require('../middlewares/registValidations');
router.get('/logout',userController.logout);
router.get('/checkout',userController.checkout); 
router.get('/profile',userController.userProfile);
router.post('/login',userController.login);
router.post('/regist',registValidations,userController.processRegist);


module.exports=router;