const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Product extends Model {}

Product.init({
    id :{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name : {
        type: dataTypes.STRING(255),
        allowNull: false
    },
    product_description : {
        type: dataTypes.TEXT,
        allowNull: false,
    },
    image : {
        type: dataTypes.STRING(255),
        allowNull: false,
    },
    price : {
        type: dataTypes.INTEGER,
        allowNull: false
    },
    category_id : {
        type: dataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    },
}, {
    sequelize,
    tableName: "products",
    timestamps: false
})

Product.associate = models => {
    Product.belongsTo(models.CategoryProduct, {
        as:"category",
        foreignKey: "category_id"
    })

    Product.belongsToMany(models.User, {
        as:"user",
        through: "user_product",
        foreignKey:"product_id",
        otherKey: "user_id",
        timestamps: false
    })
}

module.exports = Product