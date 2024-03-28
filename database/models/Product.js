module.exports = (sequelize , dataTypes) => {
    let alias= "Product";
    let cols = {
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
        




    }
    let config = {
        timestamps: false,
        tableName: "products"
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models =>{
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

    return Product;
}

