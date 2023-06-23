const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const PDFGeneratorController = require('../controllers/PDFGenerator/pdfGeneratorController');
const multer = require('multer');

// Configuración básica de multer
const upload = multer();

router.get('/',mainController.index);
router.get('/servicios',mainController.services);
router.get('/blog',mainController.blogList)
router.get('/blog/:blogId',mainController.blog)
router.get('/preguntas-frecuentes',mainController.frequentQAndA);
router.get('/medicalInfo', mainController.showMedicalForm);
router.post('/generateMedicalPDF',upload.single('signature'),PDFGeneratorController.medicalPDF);
router.get('/budget',mainController.budget);
router.post('/generateBudgetPDF',PDFGeneratorController.budgetPDF);
router.get('/consent',mainController.consent);
router.post('/generateConsentPDF',upload.single('signature'),PDFGeneratorController.consentPDF);
router.get('/getTestProducts',mainController.getTestingProducts);

module.exports=router;