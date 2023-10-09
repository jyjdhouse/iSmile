const express = require('express');
const router = express.Router();

const apiPaymentController = require('../../controllers/api/apiPaymentController');


// VALIDAATIONS
const validations = require('../../middlewares/validations')
// RUTEO


// POST
router.post('/getPaymentRequest',validations.paymentCardsValidations,apiPaymentController.getPaymentRequest);
router.post('/handlePaymentRequestError',apiPaymentController.handlePaymentError);

module.exports=router;