const express = require('express');
const router = express.Router();

const userApiController = require('../../../controllers/api/userApiController');


router.get('/', userApiController.listUsers);
router.get('/:id', userApiController.showOneUser);

module.exports = router;

