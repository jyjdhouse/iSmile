const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadFile = require('../middlewares/uploadProductImages')

// MIDDLEWARES
const loginMiddleware = require('../middlewares/loginMiddleware');

// GET
router.get('/',loginMiddleware,productController.list);
router.get('/create',loginMiddleware, productController.createProduct)
router.get('/update/:productId',loginMiddleware, productController.updateProduct)
router.get('/:productId',loginMiddleware,productController.detail);

// POST
router.post('/create', uploadFile.any('images'),productController.processProductCreation);

// PUT
router.put('/:productId',uploadFile.any('images'),productController.processProductUpdate);

// DELETE
router.delete('/:productId', productController.deleteProduct);

// router.get('/getProduct',productController.getOneProduct);

// router.post('/searchResult',productController.searchResult);

module.exports=router;