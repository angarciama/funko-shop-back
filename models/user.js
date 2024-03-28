const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password_hash: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    category_user_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'user',
    timestamps: false // Desactivar el manejo automático de marcas de tiempo
});

module.exports = User;