const express = require('express')
const router = express.Router()
const apiAdminRouter = require('../../controllers/api/apiAdminController')

router.get('/get-clients', apiAdminRouter.downloadClients)

module.exports = router