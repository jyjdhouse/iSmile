const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const PDFGeneratorController = require('../controllers/PDFGenerator/pdfGeneratorController');
const multer = require('multer');

// Middlewares
const loginMiddleware = require('../middlewares/loginMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

// Configuración básica de multer
const upload = multer();

// GET
router.get('/',loginMiddleware,mainController.index);
router.get('/servicios',loginMiddleware,mainController.services);
router.get('/servicios/:servicioId',loginMiddleware,mainController.serviceDetail)
router.get('/preguntas-frecuentes',loginMiddleware,mainController.frequentQAndA);
router.get('/medicalInfo',/*loginMiddleware,isAdminMiddleware,*/ mainController.showMedicalForm);
router.get('/budget',loginMiddleware,isAdminMiddleware,mainController.budget);
router.get('/consent',/*loginMiddleware,isAdminMiddleware,*/mainController.consent);


// POST
router.post('/generateMedicalPDF',upload.single('signature'),PDFGeneratorController.medicalPDF);
router.post('/generateBudgetPDF',PDFGeneratorController.budgetPDF);
router.post('/generateConsentPDF',upload.single('signature'),PDFGeneratorController.consentPDF);

module.exports=router;