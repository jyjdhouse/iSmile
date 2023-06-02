const express = require('express');
const router = express.Router();
const path = require('path');
const apiProductController = require('../../controllers/api/apiProductController');
// Middleware
const checkForToken = require('../../middlewares/checkForToken');
// MULTER

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        if(file.mimetype.startsWith('video/')){//Si es video
            cb(null,'./public/video');
            return 
        }
        cb(null,'./public/img');
        return 
    },
    filename: (req,file,cb)=>{
        const randomString = Math.random().toString(36).substring(2, 2 + 10);
        cb(null, file.fieldname + '-' + randomString + path.extname(file.originalname))
    }
});

let upload = multer({storage})

// RUTEO
router.get('/',apiProductController.list);
router.get('/color',apiProductController.getColors);
router.get('/:id',apiProductController.detail); //Esta va ultima por el :id

router.post('/createProduct',upload.any(),apiProductController.create);
router.post('/createColor',apiProductController.newColor);
router.post('/addWishlistProduct',apiProductController.addWishlistProduct);
router.post('/removeWishlistProduct',apiProductController.removeWishlistProduct);
router.post('/getWishedProducts',apiProductController.getWishedProducts);

router.put('/updateProduct/:id',upload.any(),apiProductController.update);

module.exports=router;