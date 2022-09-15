const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")
const { body } = require('express-validator');

const validationLogin =[
    body('email')
    .notEmpty().withMessage('Tenes que completar un Email valido').bail() //bail detiene la validacion si dio error,
    .isEmail().withMessage('El formato no corresponde a un email'),
    body('password').notEmpty().withMessage('Tenes que completar el password'),
  ]

router.get('/', mainController.list )
router.get('/login', mainController.login )
router.post('/login', validationLogin, mainController.loginEntry )
router.post('/register', mainController.createUser )
router.get('/register', mainController.register )
router.get('/services', mainController.services )

module.exports = router;