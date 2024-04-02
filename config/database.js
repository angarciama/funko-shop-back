const Sequelize = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Exportar la instancia de Sequelize
module.exports = sequelize;