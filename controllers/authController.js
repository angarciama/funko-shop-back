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

exports.verifyToken = (req, res) => {
    // Obtener el token del encabezado de autorización
    const token = req.header('Authorization');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    // Extraer el token de la cadena "Bearer token"
    const tokenParts = token.split(' ');
    const tokenString = tokenParts[1]; // La parte después de "Bearer"

    // Verificar el token
    try {
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: 'Token no válido' });
        }

        res.status(200).json({ msg: 'Token válido' });
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};