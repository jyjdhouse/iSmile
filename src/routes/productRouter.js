const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',productController.list);
// router.get('/getProduct',productController.getOneProduct);
// router.get('/:id',productController.detail);

// router.post('/searchResult',productController.searchResult);

module.exports=router;