const express = require('express');
const router = express.Router();
const path = require('path');
const blogController = require('../controllers/blogController');

const uploadBlogImage = require('../middlewares/uploadBlogImages');

// Middleware
/* const checkForToken = require('../../middlewares/checkForToken'); */



// RUTEO

// GET
router.get('',blogController.list)
router.get('/create', blogController.createBlog);
router.get('/:blogId',blogController.detail) ;

router.post('/',uploadBlogImage.any('images'),blogController.processBlogCreation);

router.put('/updateProduct/:blogId',uploadBlogImage.any('images'),blogController.update);

router.delete('/updateProduct/:blogId', blogController.deleteProduct);

module.exports=router;