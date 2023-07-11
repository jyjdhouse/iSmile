const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// Middlewares
const loginMiddleware = require('../middlewares/loginMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

// RUTEO

// GET
router.get('/servicios-modificar-precio', adminController.updateServicesPrice);
router.get('/medicalInfo',/*isAdminMiddleware,*/ adminController.showMedicalForm);
router.get('/budget',isAdminMiddleware,adminController.budget);
router.get('/consent',/*isAdminMiddleware,*/adminController.consent);
// PUT
router.put('/updateServicesPrice',adminController.processServicesPriceUpdating)

module.exports=router;