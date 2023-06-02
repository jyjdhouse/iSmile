const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/',adminController.preCheckout)
// router.get('/changeAdminPasword',adminController.changeAdminPass);
router.get('/createProduct',/*isAdmin,*/adminController.createProduct);
router.get('/editProduct/:id',/*isAdmin,*/adminController.editProduct);
router.get('/destroyProduct/:id',/*isAdmin,*/adminController.destroyProduct);

module.exports=router;