module.exports = (sequelize , dataTypes) => {
    let alias= "UserProduct";
    let cols = {
        id :{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        user_id: {type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },

        product_id : {type: dataTypes.INTEGER,
                foreignKey: true,
                allowNull: false, 
    }

    }
    let config = {
        timestamps: false,
        tableName: "user_product"
    }

    const UserProduct = sequelize.define(alias, cols, config);

    UserProduct.associate = models =>{
        UserProduct.hasMany(models.ShoppingCar, {
            as:"Shoppingcar",
            foreignKey: "product_user_id"
        })
    }

    return UserProduct;
}

