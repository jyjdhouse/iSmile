const express = require('express')
const router = express.Router()
const apiAdminController = require('../../controllers/api/apiAdminController')
const adminCredentialsMiddleware = require('../../middlewares/adminCredentialsMiddleware')

router.get('/get-clients', apiAdminController.downloadClients);
router.get('/order',adminCredentialsMiddleware,apiAdminController.getOrders);
router.put('/update-order/:orderId',adminCredentialsMiddleware,apiAdminController.updateOrders);
router.delete('/delete-order/:orderId',adminCredentialsMiddleware,apiAdminController.deleteOrders);


module.exports = router