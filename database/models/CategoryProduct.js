module.exports = (sequelize , dataTypes) => {
    let alias= "CategoryProduct";
    let cols = {
        id :{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },  
        name_category : {
        type: dataTypes.STRING(255),
        allowNull: true
    }

    }
    let config = {
        timestamps: false,
        tableName: "category_product"
    }

    const CategoryProduct = sequelize.define(alias, cols, config);

    CategoryProduct.associate = models =>{
        CategoryProduct.hasMany(models.Product, {
            as:"products",
            foreignKey: "category_id"
        })
    }

    return CategoryProduct;
}

