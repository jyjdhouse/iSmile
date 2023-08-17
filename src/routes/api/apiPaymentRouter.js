const express = require('express');
const router = express.Router();

const apiPaymentController = require('../../controllers/api/apiPaymentController');


// MIDDLEWARES
const orderIsCompleteValidations = require('../../middlewares/orderIsCompleteValidatons');
// RUTEO


// POST
router.post('/getPaymentRequest',orderIsCompleteValidations,apiPaymentController.getPaymentRequest);

module.exports=router;