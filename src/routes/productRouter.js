const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',productController.list);
router.get('/:id',productController.detail);
// router.get('/getProduct',productController.getOneProduct);

// router.post('/searchResult',productController.searchResult);

module.exports=router;