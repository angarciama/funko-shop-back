const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class ShoppingCar extends Model {}

ShoppingCar.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_user_id: {
        type: DataTypes.INTEGER,
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