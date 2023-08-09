const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// Middlewares
const upload = require('../middlewares/uploadServiceImage');

const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

// RUTEO

// GET
router.get('/servicios-modificar-precio',isAdminMiddleware, adminController.updateServicesPrice);
router.get('/ventas',isAdminMiddleware,adminController.orderList)
router.get('/registrar-venta',isAdminMiddleware, adminController.registerSale)
router.get('/medicalInfo',isAdminMiddleware, adminController.showMedicalForm);
router.get('/budget',isAdminMiddleware,adminController.budget);
router.get('/consent',isAdminMiddleware,adminController.consent);
// POST
router.post('/addTreatment',isAdminMiddleware,upload.single('treatment_image'),adminController.addTreatment)


module.exports=router;