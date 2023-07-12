const express = require('express');
const router = express.Router();
const path = require('path');
const apiUserController = require('../../controllers/api/apiUserController');
const checkForToken = require('../../middlewares/checkForToken');

// RUTEO
// router.get('/'/*,checkForToken*/,apiUserController.getAllUsers);
router.get('/getLoggedUserId',checkForToken,apiUserController.getLoggedUserId);
router.get('/change-password',checkForToken,apiUserController.changePassword)
// router.get('/:userId'/*,checkForToken*/,apiUserController.getUser);

// POST
router.post('/createTempCart',checkForToken,apiUserController.createTempCart);
router.post('/addTempItem',checkForToken,apiUserController.addTempItem);
router.post('/forget-password',checkForToken,apiUserController.forgetPassword);

// DELETE   
router.delete('/deleteTempItem',apiUserController.deleteTempItem)
module.exports=router;