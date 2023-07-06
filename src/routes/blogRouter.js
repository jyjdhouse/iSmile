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
router.get('/update/:blogId', blogController.update);
router.get('/:blogId',blogController.detail) ;

router.post('/',uploadBlogImage.any('images'),blogController.processBlogCreation);

router.put('/:blogId',uploadBlogImage.any('images'),blogController.processBlogUpdate);

router.delete('/:blogId', blogController.deleteProduct);

module.exports=router;