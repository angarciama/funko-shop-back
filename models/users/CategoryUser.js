const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
class CategoryUser extends Model {}

CategoryUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profile_category: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "CategoryUser",
    timestamps: false
})

CategoryUser.associate = models => {
    CategoryUser.hasMany(models.User, {
        as: "users",
        foreignKey: "category_user_id"
    })
}

module.exports = CategoryUser