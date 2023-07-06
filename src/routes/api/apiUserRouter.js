const express = require('express');
const router = express.Router();
const path = require('path');
const apiUserController = require('../../controllers/api/apiUserController');
const checkForToken = require('../../middlewares/checkForToken');


// RUTEO
// router.get('/'/*,checkForToken*/,apiUserController.getAllUsers);
router.get('/getLoggedUserId',checkForToken,apiUserController.getLoggedUserId);
// router.get('/:userId'/*,checkForToken*/,apiUserController.getUser);

// POST
router.post('/createTempCart',apiUserController.createTempCart);
router.post('/addTempItem',apiUserController.addTempItem)

// DELETE   
router.delete('/deleteTempItem',apiUserController.deleteTempItem)
module.exports=router;