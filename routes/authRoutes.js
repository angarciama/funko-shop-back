const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// Ruta para el inicio de sesión
router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty(),
], authController.login);

module.exports = router;