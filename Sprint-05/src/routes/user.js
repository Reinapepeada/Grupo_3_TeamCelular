const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');

const { body } = require('express-validator');

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
         cb(null, path.join(__dirname,'../../public/images'))
  },
  filename:(req, file, cb)=>{
      // extrae el nombre de la extencion de un archivo
       const newFilename = 'user-'+ Date.now() + path.extname(file.originalname);
      cb(null, newFilename);
  }
 
})
//ejecuto multer
const upload = multer({storage: storage });

router.get('/profile/:id', userController.profile);
router.put('/upload',upload.single('image'), userController.upload);

module.exports = router;