const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// VALIDATIONS
const validations = require('../middlewares/validations')
// MIDDLEWARES
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const upload = require('../middlewares/multerMiddleware');

// GET
router.get('/',productController.list);
router.get('/create',isAdminMiddleware, productController.createProduct)
router.get('/update/:productId',isAdminMiddleware, productController.updateProduct)
router.get('/:productId',productController.detail);

// POST
router.post('/create', isAdminMiddleware, upload.any('images'),validations.productFieldsValidations, productController.processProductCreation);

// PUT
router.put('/:productId', isAdminMiddleware, upload.any('images'),validations.productFieldsValidations, productController.processProductUpdate);

// DELETE
router.delete('/:productId', isAdminMiddleware, productController.deleteProduct);

// router.get('/getProduct',productController.getOneProduct);

// router.post('/searchResult',productController.searchResult);

module.exports=router;