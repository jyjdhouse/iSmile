const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/',mainController.index);
router.get('/servicios',mainController.services)
router.get('/blog',mainController.blogList)
router.get('/blog/:blogId',mainController.blog)
router.get('/preguntas-frecuentes',mainController.frequentQAndA)

module.exports=router;