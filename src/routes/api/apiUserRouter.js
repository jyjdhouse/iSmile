const express = require('express');
const router = express.Router();
const path = require('path');
const apiUserController = require('../../controllers/api/apiUserController');
const checkForToken = require('../../middlewares/checkForToken');

// MIDDLEWARES
const orderIsCompleteValidations = require('../../middlewares/orderIsCompleteValidatons');

// RUTEO
// router.get('/'/*,checkForToken*/,apiUserController.getAllUsers);
router.get('/getLoggedUserId',checkForToken,apiUserController.getLoggedUserId);
router.get('/change-password',checkForToken,apiUserController.changePassword)
// router.get('/:userId'/*,checkForToken*/,apiUserController.getUser);

// POST
router.post('/createTempCart',checkForToken,apiUserController.createTempCart);
router.post('/addTempItem',checkForToken,apiUserController.addTempItem);
router.post('/forget-password',checkForToken,apiUserController.forgetPassword);
router.post('/checkout',orderIsCompleteValidations,apiUserController.processCheckout);
router.post('/testingResponse',(req,res)=>{
    return res.status(200).json({
        meta: {
            status: 200
        },
        body: "HOLa"
    })
})
// DELETE   
router.delete('/deleteTempItem',checkForToken,apiUserController.deleteTempItem)
module.exports=router;