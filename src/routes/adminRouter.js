const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// Middlewares

const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

// RUTEO

// GET
router.get('/servicios-modificar-precio',isAdminMiddleware, adminController.updateServicesPrice);
router.get('/ventas',isAdminMiddleware,adminController.orderList)
router.get('/registrar-venta',isAdminMiddleware, adminController.registerSale)
router.get('/medicalInfo',isAdminMiddleware, adminController.showMedicalForm);
router.get('/budget',isAdminMiddleware,adminController.budget);
router.get('/consent',isAdminMiddleware,adminController.consent);
// PUT


module.exports=router;