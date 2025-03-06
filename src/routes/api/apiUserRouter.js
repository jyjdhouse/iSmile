const express = require('express');
const router = express.Router();
const apiUserController = require('../../controllers/api/apiUserController');

// MIDDLEWARES
const checkForToken = require('../../middlewares/checkForToken');

// VALIDATIONS
const validations = require('../../middlewares/validations')

// RUTEO
// router.get('/'/*,checkForToken*/,apiUserController.getAllUsers);
router.get('/getLoggedUserId',checkForToken,apiUserController.getLoggedUserId);
router.get('/change-password',checkForToken,apiUserController.changePassword);
router.get('/send-verification-code',checkForToken,apiUserController.sendVerificationCode);

// POST
router.post('/createTempCart',checkForToken,apiUserController.createTempCart);
router.post('/addTempItem',checkForToken,apiUserController.addTempItem);
router.post('/forget-password',apiUserController.forgetPassword);
router.post('/checkout',validations.orderIsCompleteValidations,apiUserController.processCheckout);
router.post('/check-verification-code',checkForToken,apiUserController.checkVerificationCode);
router.post('/getEstimateShipmentCost',apiUserController.getEstimateShipmentData);
// DELETE   
router.delete('/deleteTempItem',checkForToken,apiUserController.deleteTempItem)

module.exports=router;