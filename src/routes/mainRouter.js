const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const PDFGeneratorController = require('../controllers/PDFGenerator/pdfGeneratorController');

// Middlewares
const loginMiddleware = require('../middlewares/loginMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const uploadHomeImages = require('../middlewares/uploadHomeImages');

// Configuración básica de multer
const multer = require('multer');
const upload = multer();

// GET
router.get('/', loginMiddleware, mainController.index);
router.get('/servicios', loginMiddleware, mainController.services);
router.get('/servicios/:specialtyId/:specialtyServiceId?', loginMiddleware, mainController.serviceDetail)
router.get('/preguntas-frecuentes', loginMiddleware, mainController.frequentQAndA);
router.get('/nosotros', mainController.aboutUs)
// Ruta unica (para hacer cosas puntuales)
// router.get('/saddfdfgrtewrdcsadxqa');


// POST
router.post('/generateMedicalPDF', upload.single('signature'), PDFGeneratorController.medicalPDF);
router.post('/generateBudgetPDF', PDFGeneratorController.budgetPDF);
router.post('/generateConsentPDF', upload.single('signature'), PDFGeneratorController.consentPDF);

// PUT
router.put('/updateHomeFile', isAdminMiddleware, uploadHomeImages.single('homeFile'), mainController.updateHomeFile)

module.exports = router;