const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadFile = require('../middlewares/uploadProductImages')

router.get('/',productController.list);
router.get('/create', productController.createProduct)
router.get('/update/:productId', productController.updateProduct)
router.get('/:productId',productController.detail);

router.post('/create', uploadFile.any('images'),productController.processProductCreation);

router.put('/:productId',uploadFile.any('images'),productController.processProductUpdate);

router.delete('/delete/:productId', productController.deleteProduct);

// router.get('/getProduct',productController.getOneProduct);

// router.post('/searchResult',productController.searchResult);

module.exports=router;