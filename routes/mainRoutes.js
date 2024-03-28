const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const mainController = require('../controllers/mainController');

// RUTAS

//home
router.get('/', mainController.home);

router.get("/product-detail/:id", mainController.detalleProducto);

router.get('/coleccion', mainController.collecion);
// carrito de compras
router.get('/shopping-cart', mainController.shoppingCart);


module.exports = router;