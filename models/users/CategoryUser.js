module.exports = (sequelize , dataTypes) => {
    let alias= "CategoryUser";
    let cols = {
        id :{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        profile_category : {
        type: dataTypes.STRING(255),
        allowNull: false
    }

    }
    let config = {
        timestamps: false,
        tableName: "category_user"
    }

    const CategoryUser = sequelize.define(alias, cols, config);

    CategoryUser.associate = models =>{
        CategoryUser.hasMany(models.User, {
            as:"users",
            foreignKey: "category_user_id"
        })
    }

    return CategoryUser;
}