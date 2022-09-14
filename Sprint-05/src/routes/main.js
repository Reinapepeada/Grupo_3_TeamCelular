const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")

router.get('/', mainController.list )
router.get('/login', mainController.login )
router.post('/register', mainController.createUser )
router.get('/register', mainController.register )
router.get('/services', mainController.services )

module.exports = router;