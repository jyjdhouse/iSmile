const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// Middlewares
const upload = require('../middlewares/multerMiddleware');

const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

// RUTEO

// GET
router.get('/servicios-modificar-precio',isAdminMiddleware, adminController.updateServicesPrice);
router.get('/ventas',isAdminMiddleware,adminController.orderList)
router.get('/registrar-venta',isAdminMiddleware, adminController.registerSale)
router.get('/medicalInfo',isAdminMiddleware, adminController.showMedicalForm);
router.get('/budget',isAdminMiddleware,adminController.budget);
router.get('/consent',isAdminMiddleware,adminController.consent);
router.get('/destroyAllDiscounts',isAdminMiddleware,adminController.destroyAllDiscounts)
// POST
router.post('/addTreatment',isAdminMiddleware,upload.single('treatment_image'),adminController.addTreatment);
// PUT  
router.put('/updateLabel',isAdminMiddleware,adminController.updateHomeLabel);
// DELETE
router.delete('/destroyTreatment',isAdminMiddleware,adminController.destroyTreatment);


module.exports=router;