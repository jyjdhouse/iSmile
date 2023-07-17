const express = require('express')
const router = express.Router()
const apiAdminController = require('../../controllers/api/apiAdminController')

router.get('/get-clients', apiAdminController.downloadClients)
router.get('/order',apiAdminController.getOrders)
module.exports = router