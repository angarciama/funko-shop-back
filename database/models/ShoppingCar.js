module.exports = (sequelize , dataTypes) => {
    let alias= "ShoppingCar";
    let cols = {
        id :{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        quantity : {
        type: dataTypes.INTEGER,
        allowNull: false
        },
        unit_price : {
        type: dataTypes.INTEGER,
        allowNull: false,
        },
    
        total_price : {
        type: dataTypes.INTEGER,
        allowNull: false,
        },

        product_user_id : {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        } 

    }
    let config = {
        timestamps: false,
        tableName: "shopping_car"
    }

    const ShoppingCar = sequelize.define(alias, cols, config);

    ShoppingCar.associate = models =>{
        ShoppingCar.belongsTo(models.UserProduct, {
            as:"UserProducts",
            foreignKey: "product_user_id"
        })
    }

    return ShoppingCar;
}