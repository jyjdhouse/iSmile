// MULTER
const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/blog');
        return 
    },
    filename: (req,file,cb)=>{
        const randomString = Math.random().toString(36).substring(2, 2 + 10);
        console.log(file);
        cb(null, file.fieldname + '-' + randomString + path.extname(file.originalname))
    }
});

let upload = multer({storage});

module.exports = upload;