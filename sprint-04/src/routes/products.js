const express = require('express');
const multer = require('multer');
const path = require('path');

const productsController = require("../controllers/productsController")
const { body } = require('express-validator');


const storage = multer.diskStorage({
    
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname,'../../public/img'))
    },
    filename:(req, file, cb)=>{ 
        // extrae el nombre de la extencion de un archivo
         const newFilename = 'product-'+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    },

})
const upload = multer({storage: storage });
var router = express.Router();

const validationProducts =[
    body('name').notEmpty().withMessage('debes completar el nombre'),
    body('price').notEmpty().withMessage('debes completar el precio'),
    body('description').notEmpty().withMessage('debes completar una descripcion'), 
    
]
router.post('/create', upload.single('img'),validationProducts, productsController.create); //validationProducts
router.get('/create', productsController.viewFormCreate);

//ejecuto multer
 
router.get('/list_products', productsController.list_products);
router.get('/search', productsController.search);

router.get('/:id', productsController.detail);
router.get('/', productsController.list);
router.get('/details', productsController.detail);
router.get('/details/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id',upload.single('product-image'), productsController.update); 

module.exports = router;