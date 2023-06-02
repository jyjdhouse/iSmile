const express = require('express');
const router = express.Router();
const path = require('path');
const apiMainController = require('../../controllers/api/apiMainController');
// Middleware
const checkForToken = require('../../middlewares/checkForToken');


// RUTEO
router.get('/countryCodeList',apiMainController.countryList);


module.exports=router;