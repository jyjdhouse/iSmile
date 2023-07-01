const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/logout',userController.logout);
router.get('/checkout',userController.checkout); 
router.get('/profile/:userId',userController.userProfile);
// router.post('/login',userController.login);
// router.post('/regist',userController.processRegist);


module.exports=router;