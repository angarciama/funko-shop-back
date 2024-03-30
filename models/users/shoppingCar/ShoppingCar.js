const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class ShoppingCar extends Model {}

ShoppingCar.init({
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: dataTypes.INTEGER,
        allowNull: false
    },
    unit_price: {
        type: dataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: dataTypes.INTEGER,
        allowNull: false,
    },
    product_user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    }
}, {
    sequelize,
    tableName: "shopping_car",
    timestamps: false
})

ShoppingCar.associate = models =>{
    ShoppingCar.belongsTo(models.UserProduct, {
        as:"UserProducts",
        foreignKey: "product_user_id"
    })
}

module.exports = ShoppingCar