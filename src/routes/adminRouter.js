const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// RUTEO

// GET
router.get('/updateServicesPrice', adminController.updateServicesPrice);

// PUT
router.put('/updateServicesPrice',adminController.processServicesPriceUpdating)

module.exports=router;