const express = require('express');
const router = express.Router();

const apiProductController = require('../../controllers/api/apiProductController');
// Middleware
const adminCredentialsMiddleware = require('../../middlewares/adminCredentialsMiddleware')



// RUTEO
router.get('/',apiProductController.list);
router.get('/getTreatments',adminCredentialsMiddleware,apiProductController.getTreatments); //Solo lo pidp en budget ==> hago el chequeo que sea admin
// router.get('/:productId',apiProductController.detail); //Esta va ultima por el :id




module.exports=router;