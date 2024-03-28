const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(file);
		let profilePicture = path.join(__dirname, '../public/img/productsImages');
		cb(null, profilePicture);
	},
	filename: (req, file, cb) => {
		// let userName = req.body.username.replace( !/\s/g, '-').toLowerCase();
	// 	let finalName = userName + '-' + Date.now() + path.extname(file.originalname);
	// 	cb(null, finalName);
	// }

    const newFileName = '-' + Date.now() + path.extname(file.originalname);
		cb(null, newFileName);
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