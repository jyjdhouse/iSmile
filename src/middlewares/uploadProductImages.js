const path = require("path");
const multer = require('multer');
// Esto es para usar la memoria, se valida, modifica la foto en memoria y despues se lleva
// a S3 sin pasar for fs
const storage = multer.memoryStorage();
const upload= multer({ storage:storage });

// const storagee = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if(file.mimetype.startsWith('video/')){//Si es video
//             cb(null,'./public/video/product');
//             return 
//         }
//         cb(null, './public/img/product')
//         return 
        
//     },
//     filename: (req, file, cb) => {
//         const randomString = Math.random().toString(36).substring(2, 2 + 10);
//         if(file.mimetype.startsWith('video/')){//Si es video
//             cb(null, 'video-' + randomString + path.extname(file.originalname))
//             return 
//         }
//         cb(null, file.fieldname + '-' + randomString + path.extname(file.originalname))
//         return
        
//     }
// })

// const uploadFile = multer( {storage} ); 

module.exports = upload;