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
router.get('/register', guestMiddleware, userController.register);
router.get('/userDetail', guestMiddleware, userController.detailView);
router.post('/register', upload.single("image"), userController.processRegister);
router.get('/logout', userController.logout);


module.exports = router;