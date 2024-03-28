const multer = require('multer');
const path = require('path');

const { validationResult } = require('express-validator');

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(file);
		let profilePicture = path.join(__dirname, '../public/img/profilePictures');
		cb(null, profilePicture);
	},
	filename: (req, file, cb) => {
		
		let finalName =  '-user' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

const upload = multer({ 
	storage: diskStorage, 
	fileFilter: (req, file, cb) => {
		let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
		let fileExtension = path.extname(file.originalname);
		let extensionIsOk = acceptedExtensions.includes(fileExtension);
		if (extensionIsOk) {
			this.diskStorage;
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
});



module.exports = upload;