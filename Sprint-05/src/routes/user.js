const { check } = require("express-validator");
const path = require('path');
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const guestMiddleware = require('../../middlewares/guestMiddleware');
const authMiddleware = require("../../middlewares/authMiddleware");

var multerStorage = multer.diskStorage({
  destination:(req, file, cb)=>{
      cb(null, './public/img/users')
  },
  filename: (req, file, cb) =>{
      cb(null, "avatar-" + Date.now() + path.extname(file.originalname))
  }
  })

var upload = multer({storage: multerStorage})
//ejecuto multer

router.get('/profile/', authMiddleware, userController.profile);
router.put('/upload',upload.single("image"), userController.upload);
//Mostrará el formulario de creación para un producto
router.get('/register', guestMiddleware, userController.register);
router.get('/userDetail', guestMiddleware, userController.detailView);

//Deberá recibir los datos del formulario de creación
router.post('/register', upload.single("image"), userController.processRegister);

module.exports = router;