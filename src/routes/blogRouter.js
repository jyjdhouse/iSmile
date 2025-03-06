const express = require('express');
const router = express.Router();
const path = require('path');
const blogController = require('../controllers/blogController');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')

const upload = require('../middlewares/multerMiddleware');

// Middleware




// RUTEO

// GET
router.get('',blogController.list)
router.get('/create',isAdminMiddleware, blogController.createBlog);
router.get('/update/:blogId',isAdminMiddleware, blogController.update);
router.get('/:blogId',blogController.detail) ;

router.post('/', isAdminMiddleware, upload.any('images'),blogController.processBlogCreation);

router.put('/:blogId',isAdminMiddleware,upload.any('images'),blogController.processBlogUpdate);

router.delete('/:blogId',isAdminMiddleware, blogController.deleteBlog);

module.exports=router;