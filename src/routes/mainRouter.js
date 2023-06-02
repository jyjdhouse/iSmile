const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/',mainController.index);
router.get('/test/list/:id?',mainController.productList)
router.get('/test/:prodId/:colorId',mainController.productDetail)


module.exports=router;