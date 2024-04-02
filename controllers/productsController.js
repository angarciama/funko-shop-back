const Product = require('../models/products/Product');
const {validationResult} = require("express-validator");

exports.createProduct = async (req, res) => {
	try {
		// Validar la entrada del formulario
		const resultValidation = validationResult(req);
		if (!resultValidation.isEmpty()) {
			return res.status(400).json({ errors: resultValidation.array() });
		}

		const product = await Product.create({
			product_name: req.body.product_name,
			product_description: req.body.product_description,
			image: req.body.image,
			category_id: req.body.category_id,
			price: req.body.price
		})

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.json(product);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.findAll();

		if (!products) {
			return res.status(404).json({ error: 'Products not found' });
		}

		res.json(products);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.json(product);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		// Validar la entrada del formulario
		const resultValidation = validationResult(req);
		if (!resultValidation.isEmpty()) {
			return res.status(400).json({ errors: resultValidation.array() });
		}

		const product = await Product.findByPk(req.params.id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		await product.update({
			product_name: req.body.product_name,
			product_description: req.body.product_description,
			image: req.body.image,
			category_id: req.body.category,
			price: req.body.price
		});

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.json(product);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		await product.destroy();
		res.json({ message: 'Product deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};