const express = require('express')
const router = express.Router()
const apiAdminController = require('../../controllers/api/apiAdminController')
const adminCredentialsMiddleware = require('../../middlewares/adminCredentialsMiddleware')

// MIDDLEWARES
const upload = require('../../middlewares/multerMiddleware');

// GET
router.get('/get-clients',adminCredentialsMiddleware, apiAdminController.downloadClients);
router.get('/order',adminCredentialsMiddleware,apiAdminController.getOrders);

// PUT
router.put('/update-order/:orderId',adminCredentialsMiddleware,apiAdminController.updateOrders);
router.put('/updateServicesPrice',adminCredentialsMiddleware,upload.any('files'),apiAdminController.processServicesPriceUpdating);

// POST
router.post('/generateShipmentTag',apiAdminController.generateShipmentTag);
// DELETE
router.delete('/delete-order/:orderId',adminCredentialsMiddleware,apiAdminController.deleteOrders);


module.exports = router