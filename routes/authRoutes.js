const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para el inicio de sesión
router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty(),
], authController.login);

// Ruta para verificar el token
router.get('/verify-token', authMiddleware.verifyTokenMiddleware, (req, res) => {
    res.status(200).json({ msg: 'Token válido' });
});

module.exports = router;