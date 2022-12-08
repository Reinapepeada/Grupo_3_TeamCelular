const express = require('express');
const router = express.Router();

const productApiRouter = require('../../../controllers/api/productApiController');


router.get('/', productApiRouter.listProducts);
//router.get('/:id', productApiController.showOneUser);

module.exports = router;