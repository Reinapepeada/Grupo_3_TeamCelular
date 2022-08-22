const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController")

router.get('/create', productsController.viewFormCreate);
router.get('/edit/:id', productsController.edit);

router.get('/:id', productsController.detail);
router.get('/', productsController.list);
router.get('/details', productsController.list);

module.exports = router;