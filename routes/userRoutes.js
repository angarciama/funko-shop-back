const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

// Rutas para crear usuarios
router.post('/admin', [
    body('full_name').notEmpty().withMessage('El nombre completo es obligatorio'),
    body('user_name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('Ingrese un correo electrónico válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], userController.createAdminUser);

router.post('/', [
    body('full_name').notEmpty().withMessage('El nombre completo es obligatorio'),
    body('user_name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('Ingrese un correo electrónico válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], userController.createUser);

// Ruta para obtener la lista de usuarios
router.get('/', userController.userList);

// Ruta para obtener detalles de un usuario específico
router.get('/:id', userController.detailUser);

// Ruta para editar un usuario
router.put('/:id', userController.editUser);

// Ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;