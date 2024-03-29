require('dotenv').config();

const express = require('express');
const errorHandler = require('./utils/errorHandler');
const sequelize = require('./config/database'); // Importar la instancia de Sequelize
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar datos JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/api/auth', authRoutes);
app.use('/api/users', userRotes);
app.use('/api/products', productRoutes);

//Rutas
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const productsApiRoutes = require('./routes/api/productsApiRoutes');
const publicPath = path.resolve(__dirname, "./public");
//Rutas API
app.use('/api/products', require('./routes/api/productsApiRoutes'));
//Template Engine
app.set('view engine', 'ejs');
app.use(express.json());//permite procesar los datos de JSON para API
app.use(express.urlencoded({ extended: false }));//permite procesar formularios
app.use(express.static(publicPath));
app.use(mainRoutes);
// Routes
app.use('/user', userRoutes);
app.use('/products', productsRoutes);
//Api Rotes

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