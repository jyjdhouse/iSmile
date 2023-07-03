const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/img/product')
        return
    },
    filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).substring(2, 2 + 10);
        cb(null, file.fieldname + '-' + randomString + path.extname(file.originalname))
    }
})

const uploadFile = multer( {storage} ); 

module.exports = uploadFile;