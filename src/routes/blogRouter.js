const express = require('express');
const router = express.Router();
const path = require('path');
const blogController = require('../controllers/blogController');
// Middleware
/* const checkForToken = require('../../middlewares/checkForToken'); */

// MULTER
const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/blog');
        return 
    },
    filename: (req,file,cb)=>{
        const randomString = Math.random().toString(36).substring(2, 2 + 10);
        cb(null, file.fieldname + '-' + randomString + path.extname(file.path))
    }
});

let upload = multer({storage})

// RUTEO

// GET
router.get('',blogController.list)
router.get('/:blogId',blogController.detail) 
router.get('/create', blogController.createBlog)

router.post('/',upload.any('images'),blogController.processBlogCreation);

router.put('/updateProduct/:blogId',upload.any('images'),blogController.update);

router.delete('/updateProduct/:blogId', blogController.deleteProduct);

module.exports=router;