const express = require('express');
const { detail } = require('../../controllers/api/productsApiController');
const router = express.Router();
//controller
const userApiController = require('../../controllers/api/userApiController');

//<Read>
router.get('/',userApiController.userList);

router.get('/:id',userApiController.detailUser);

module.exports = router;