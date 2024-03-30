const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/users/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar la entrada del formulario
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            return res.status(400).json({ errors: resultValidation.array() });
        }

        // Verificar si el correo electrónico existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};