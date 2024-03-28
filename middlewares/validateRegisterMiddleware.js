
const { body } = require('express-validator');
const path = require('path');
const validations = {
	register: [

		// Nombre completo y nombre de usuario
		body('full_name').notEmpty().withMessage('Ingresa tu nombre completo')
						.isLength({min:6}).withMessage('El nombre debe contener minimo 6 caracteres'),
		body('user_name').notEmpty().withMessage('Debe contener un nombre de usuario')
						.isAlphanumeric().withMessage('El usuario debe ser alfanumerico')
						.isLength({min: 6}).withMessage('Debe contener Minimo 6 caracteres')
						.trim()
						.withMessage('El nombre de usuario no debe contener espacios, ni caracteres especiales y debe contener minimo 6 caracteres'),
		//Email en formato correcto
		body('email').notEmpty().bail()
						.isEmail().bail()
						.withMessage('Ingresar un email válido'),
		

		//password con mas de 8 caracteres
		body('password').notEmpty().withMessage('Ingrese una contraseña').bail()
						.isStrongPassword({
							minLength: 8,
							minLowercase: 1,
							minUppercase: 1,
							minNumbers: 1,
							minSymbols: 1
						}).withMessage('La contraseña debe contener minimo: 8 caracteres, una mayuscula, una miniscula, un numero y un caracter especial'),

		// la confirmacion de contraseña debe coincidir
		body('re_password', 'Las contraseñas no coinciden')
			.exists()
			.custom((value, { req }) => req.body.password.length < 8 || value === req.body.password),

			body('profile_picture').custom((value, { req }) => {
				let file = req.file;
				let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
				if (!file) {
					throw new Error('Tienes que subir una imagen');
				} else {
					let fileExtension = path.extname(file.originalname);
					if (!acceptedExtensions.includes(fileExtension)) {
						throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
					}
				}
		
				return true;
			})

	],

	userEdition:[
		// Nombre completo y nombre de usuario
		body('full_name').notEmpty().withMessage('Ingresa tu nombre completo')
						.isLength({min:6}).withMessage('El nombre debe contener minimo 6 caracteres'),

		body('user_name').notEmpty().withMessage('Debe contener un nombre de usuario')
						.isAlphanumeric().withMessage('El usuario debe ser alfanumerico')
						.isLength({min: 6,max:10}).withMessage('Debe contener Minimo 6 caracteres y Maximo 10')
						.trim()
						.withMessage('El nombre de usuario no debe contener espacios, ni caracteres especiales y debe contener minimo 6 caracteres'),
		
			

			body('profile_picture').custom((value, { req }) => {
				let file = req.file;
				let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
				if (!file) {
					throw new Error('Tienes que subir una imagen');
				} else {
					let fileExtension = path.extname(file.originalname);
					if (!acceptedExtensions.includes(fileExtension)) {
						throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
					}
				}
		
				return true;
			})

	]
	
						

}

module.exports = validations