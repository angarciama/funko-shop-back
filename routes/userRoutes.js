// userRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

// Definir las rutas
router.post('/create', [
    body('full_name').notEmpty(),
    body('user_name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], userController.createUser);

router.get('/all', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id/update', userController.updateUser);

router.delete('/:id/delete', userController.deleteUser);

module.exports = router;