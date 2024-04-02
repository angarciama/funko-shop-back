const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Product extends Model {}

Product.init({
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_description : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image : {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id : {
        type: DataTypes.INTEGER,
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