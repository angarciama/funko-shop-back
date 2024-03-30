require('dotenv').config();

const express = require('express');
const errorHandler = require('./utils/errorHandler');
const sequelize = require('./config/database'); // Importar la instancia de Sequelize
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar datos JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// Manejador de errores
app.use(errorHandler);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});