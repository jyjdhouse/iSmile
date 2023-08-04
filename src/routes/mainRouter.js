const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const PDFGeneratorController = require('../controllers/PDFGenerator/pdfGeneratorController');

// Middlewares
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const uploadHomeImages = require('../middlewares/uploadHomeImages');

// Configuración básica de multer
const multer = require('multer');
const upload = multer();

// GET
router.get('/', mainController.index);
router.get('/servicios', mainController.services);
router.get('/servicios/:specialtyId/:specialtyServiceId?', mainController.serviceDetail)
router.get('/preguntas-frecuentes', mainController.frequentQAndA);
router.get('/nosotros', mainController.aboutUs)
router.get('/terminos-condiciones', mainController.termsAndCondition)
// Ruta unica (para hacer cosas puntuales)


// POST
router.post('/generateMedicalPDF', upload.single('signature'), PDFGeneratorController.medicalPDF);
router.post('/generateBudgetPDF', PDFGeneratorController.budgetPDF);
router.post('/generateConsentPDF', upload.single('signature'), PDFGeneratorController.consentPDF);

// PUT
router.put('/updateHomeFile', isAdminMiddleware, uploadHomeImages.single('homeFile'), mainController.updateHomeFile)

module.exports = router;