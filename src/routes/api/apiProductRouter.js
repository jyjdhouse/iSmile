const express = require('express');
const router = express.Router();

const apiProductController = require('../../controllers/api/apiProductController');
// Middleware
// const checkForToken = require('../../middlewares/checkForToken');



// RUTEO
router.get('/',apiProductController.list);
router.get('/:productId',apiProductController.detail); //Esta va ultima por el :id


router.post('/addWishlistProduct',apiProductController.addWishlistProduct);
router.post('/removeWishlistProduct',apiProductController.removeWishlistProduct);
router.post('/getWishedProducts',apiProductController.getWishedProducts);



module.exports=router;