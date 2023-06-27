const express = require('express');
const router = express.Router();
const path = require('path');
const apiBlogController = require('../../controllers/api/apiBlogController');
// Middleware
const checkForToken = require('../../middlewares/checkForToken');
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
router.get('/',apiBlogController.list);
router.get('/:blogId',apiBlogController.detail); //Esta va ultima por el :id

router.post('/createBlog',upload.any('images'),apiBlogController.create);

router.put('/updateProduct/:blogId',upload.any('images'),apiBlogController.update);

router.delete('/updateProduct/:blogId', apiBlogController.deleteProduct);

module.exports=router;