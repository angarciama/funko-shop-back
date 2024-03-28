const fs = require('fs');
const path = require('path');
// const { brotliDecompress } = require('zlib');
// const { BLOB } = require('sequelize/types');
// const { brotliDecompress } = require('zlib');

// const productsFilePath = path.join(__dirname,'../database/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

const db = require('../database/models')

const Product = db.Product
const CategoryProduct = db.CategoryProduct



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    
    products : (req, res) => {
    
		let userLogged = req.session.userId
		const product = Product.findAll()
		.then( (products) =>{
			res.render('products', {products, toThousand, userLogged})
		})
    },

  
    
    create: async (req, res) => {
		let userLogged = req.session.userId
		const allProduct = await CategoryProduct.findAll();
		res.render('product-create-form.ejs', {allProduct, userLogged});

	},
	

    createPost: async (req, res) => {
		try {

			let image = req.file ? req.file.filename : 'default-img.png'
			await db.Product.create({
				product_name: req.body.product_name,
				product_description: req.body.product_description,
				image: image,
				category_id: req.body.category,
				price: req.body.price
			})
	
			res.redirect('/products')
			
		} catch (error) {
			return res.send(error)
		}
		
	},



    listado: (req, res) => {
		let userLogged = req.session.userId
		db.Product.findAll()
			.then(function(products){
				res.render('listado-productos', {products: products, userLogged, toThousand});
			})
		

	},


	detalleProducto: (req, res) => {
				
		let userLogged = req.session.userId
		db.Product.findByPk(req.params.id)
			.then( function(products){
				res.render('detalle-producto.ejs', {products: products, userLogged,toThousand});
			})

	},

	edit: (req, res) => {

		let userLogged = req.session.userId

		let pedidoProducto = db.Product.findByPk(req.params.id);

		let pedidoCategoria = db.CategoryProduct.findAll();

		
		Promise.all([pedidoProducto,pedidoCategoria,])
		.then(function([product, category]){
			res.render("editar-producto", {product:product, category:category, userLogged});
		})
		
	},

	actualizar: (req, res) => {
		let image = req.file ? req.file.filename : 'default-img.png'
			 db.Product.update({
				product_name: req.body.name,
				product_description: req.body.description,
				image: image,
				category_id: req.body.category,
				price: req.body.price
			},{
				where: {
					id: req.params.id
				}
			});

			res.redirect("/products/" + req.params.id)
	
	},

	delete: (req, res) => {
		db.Product.destroy({
			where: {
				id: req.params.id
			}
		})

		res.redirect("/")
	}


 };