const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');



const Product = db.Product
const CategoryProduct = db.CategoryProduct


const productsApiController = {
    
    'products': async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category']
            });
            const categoryProduct = await db.CategoryProduct.findAll({
                include: ['products']
            });
            const data = {
                count: products.length,                
                categories: categoryProduct,
                //countByCategory → objeto literal con una propiedad por categoría con el total de productos.
                //countByCategory: categoryProduct.length,
                products: products.map(product => {
                return{
                    products: product,
                    //category: product.category,
                    url: 'http://localhost:4000/api/products/' + product.id,
                    urlImage: 'http://localhost:4000/img/productsImages/' + product.image


                }
                })
            }
            res.json(data);
        }catch(error){
            res.json('Algo salió mal')
        }
    },

    'detail': async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['category']
            });
            const data = {
                product:product,
                category: product.category,                
                url: 'http://localhost:4000/img/productsImages/' + product.image,
            }
            res.json(data);
        }catch(error){
            res.json('Algo salió mal')
        }
    }

}

module.exports = productsApiController;

