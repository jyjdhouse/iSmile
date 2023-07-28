const express = require('express');
const router = express.Router();
const path = require('path');
const blogController = require('../controllers/blogController');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')

const uploadBlogImage = require('../middlewares/uploadBlogImages');

// Middleware
/* const checkForToken = require('../../middlewares/checkForToken'); */



// RUTEO

// GET
router.get('',blogController.list)
router.get('/create',isAdminMiddleware, blogController.createBlog);
router.get('/update/:blogId',isAdminMiddleware, blogController.update);
router.get('/:blogId',blogController.detail) ;

router.post('/', isAdminMiddleware, uploadBlogImage.any('images'),blogController.processBlogCreation);

router.put('/:blogId',isAdminMiddleware,uploadBlogImage.any('images'),blogController.processBlogUpdate);

router.delete('/:blogId',isAdminMiddleware, blogController.deleteBlog);

module.exports=router;