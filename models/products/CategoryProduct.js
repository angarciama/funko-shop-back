const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class CategoryProduct extends Model {}

CategoryProduct.init({
    id :{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_category : {
        type: dataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    tableName: "category_product",
    timestamps: false
})

CategoryProduct.associate = models =>{
    CategoryProduct.hasMany(models.Product, {
        as:"products",
        foreignKey: "category_id"
    })
}

module.exports = CategoryProduct