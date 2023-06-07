const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/',mainController.index);
router.get('/servicios',mainController.services)
router.get('/blogs',mainController.blogList)
router.get('/blogs/:blogId',mainController.blog)
router.get('/preguntas-frecuentes',mainController.frequentQAndA)

module.exports=router;