const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');

const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/img/productsImages')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({storage});

router.get('/totalProducts',authMiddleware, productsController.products);

router.get('/create',authMiddleware,productsController.create); 

// router.post('/create', productsController.createPost); 
router.post('/create',authMiddleware, upload.single('image'), productsController.createPost); 


// LISTADO PRODUCTOS
router.get('/',authMiddleware, productsController.listado); 

// DETALLE PRODUCTOS


 router.get("/:id",authMiddleware, productsController.detalleProducto);

// EDICION PRODUCTO
router.get("/edit/:id",authMiddleware, productsController.edit);
router.post("/edit/:id",upload.single('image'), productsController.actualizar);

//DELETE
router.post("/delete/:id", productsController.delete)



//  router.post('/edit/', upload.single('image'), productsController.update); 

// router.delete('/delete/:id', productsController.delete); 

module.exports = router;




