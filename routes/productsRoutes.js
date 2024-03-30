const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

// Rutas para productos
router.post('/create', [
    // Aquí puedes agregar validaciones si lo deseas
], productController.createProduct);

router.get('/all', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.put('/:id/update', [
    // Aquí puedes agregar validaciones si lo deseas
], productController.updateProduct);

router.delete('/:id/delete', productController.deleteProduct);

module.exports = router;




