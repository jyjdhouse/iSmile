const express = require('express');
const router = express.Router();
const uploadFile = require('../../middlewares/uploadProductImages')
const apiProductController = require('../../controllers/api/apiProductController');
// Middleware
// const checkForToken = require('../../middlewares/checkForToken');



// RUTEO
router.get('/',apiProductController.list);
router.get('/:productId',apiProductController.detail); //Esta va ultima por el :id

router.post('/create', uploadFile.any('images'),apiProductController.create);
router.post('/addWishlistProduct',apiProductController.addWishlistProduct);
router.post('/removeWishlistProduct',apiProductController.removeWishlistProduct);
router.post('/getWishedProducts',apiProductController.getWishedProducts);

router.put('/updateProduct/:productId',uploadFile.any('images'),apiProductController.update);

router.delete('/updateProduct/:productId', apiProductController.deleteProduct);

module.exports=router;