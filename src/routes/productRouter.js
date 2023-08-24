const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// MIDDLEWARES
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const uploadFile = require('../middlewares/uploadProductImages');
// Este midd es para fijarme que no esten vacios algunos campos, para chequear tipo de dato etc
const productFieldsMiddleware = require('../middlewares/productFieldsMiddleware');

// GET
router.get('/',productController.list);
router.get('/create',isAdminMiddleware, productController.createProduct)
router.get('/update/:productId',isAdminMiddleware, productController.updateProduct)
router.get('/:productId',productController.detail);

// POST
router.post('/create', isAdminMiddleware, uploadFile.any('images'),productFieldsMiddleware, productController.processProductCreation);

// PUT
router.put('/:productId', isAdminMiddleware, uploadFile.any('images'),productFieldsMiddleware, productController.processProductUpdate);

// DELETE
router.delete('/:productId', isAdminMiddleware, productController.deleteProduct);

// router.get('/getProduct',productController.getOneProduct);

// router.post('/searchResult',productController.searchResult);

module.exports=router;