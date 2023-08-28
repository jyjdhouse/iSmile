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
router.get('/change-password',checkForToken,apiUserController.changePassword)
// router.get('/:userId'/*,checkForToken*/,apiUserController.getUser);

// POST
router.post('/createTempCart',checkForToken,apiUserController.createTempCart);
router.post('/addTempItem',checkForToken,apiUserController.addTempItem);
router.post('/forget-password',checkForToken,apiUserController.forgetPassword);
router.post('/checkout',validations.orderIsCompleteValidations,apiUserController.processCheckout);

// DELETE   
router.delete('/deleteTempItem',checkForToken,apiUserController.deleteTempItem)

module.exports=router;