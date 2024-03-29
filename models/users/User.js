module.exports = (sequelize , dataTypes) => {
    let alias= "User";
    let cols = {
        id :{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name : {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        user_name : {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        email : {
            type: dataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password : {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        profile_picture : {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        category_user_id : {
            type: dataTypes.INTEGER,
            defaultValue:2,
            foreignKey: true
        },
    }
    let config = {
        timestamps: false,
        tableName: "users",
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = models =>{
        User.belognsTo(models.CategoryUser, {
            as:"UserCategory",
            foreignKey: "category_user_id"
        })
    }

    User.associate = models => {
        User.belongsToMany(models.Product, {
            as:"user",
            through: "user_product",
            foreignKey:"user_id",
            otherKey: "product_id",
            timestamps: false
        });
    }
    return User;
}