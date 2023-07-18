const express = require('express')
const router = express.Router()
const apiAdminController = require('../../controllers/api/apiAdminController')
const adminCredentialsMiddleware = require('../../middlewares/adminCredentialsMiddleware')

router.get('/get-clients', apiAdminController.downloadClients);
router.get('/order',adminCredentialsMiddleware,apiAdminController.getOrders);


module.exports = router