const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController');

router.get('/', productsApiController.products);
router.get("/:id", productsApiController.detail);

module.exports = router;