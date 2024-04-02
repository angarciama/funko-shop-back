const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserProduct extends Model {}

UserProduct.init({
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    product_id : {type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "user_product",
    timestamps: false
})

UserProduct.associate = models =>{
    UserProduct.hasMany(models.ShoppingCar, {
        as:"Shoppingcar",
        foreignKey: "product_user_id"
    })
}

module.exports = UserProduct