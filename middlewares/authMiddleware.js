const jwt = require('jsonwebtoken');

exports.verifyTokenMiddleware = (req, res) => {
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