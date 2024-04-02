const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    category_user_id: {
        type: DataTypes.INTEGER,
        defaultValue: 2, // Si este es el valor predeterminado deseado
        allowNull: false // Asegurarse de que no sea nulo
    }
}, {
    sequelize,
    modelName: "User",
    timestamps: false
})

// Asociaciones
User.associate = models => {
    User.belongsTo(models.CategoryUser, {
        as: "UserCategory",
        foreignKey: "category_user_id"
    });

    User.belongsToMany(models.Product, {
        as: "user",
        through: "user_product",
        foreignKey: "user_id",
        otherKey: "product_id",
        timestamps: false
    });
};

module.exports = User