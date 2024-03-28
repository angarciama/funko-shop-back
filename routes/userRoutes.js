const express = require('express');
const router = express.Router();
//controller
const userController = require('../controllers/userController');

//Middlewares
const validations = require('../middlewares/validateRegisterMiddleware');


//ADMIN REGISTER
router.get('/admin-register', guesMiddleware, userController.adminRegister);
router.post('/admin-register',uploadFile.single('profile_picture'),validations.register, userController.saveAdminRegister)
router.get('/admin-profile', authMiddleware, userController.adminProfile);

//CRUD Usuarios

//Formulario de registro <Create>
router.get('/register', guesMiddleware, userController.register);

//Processar el registro <Create>
router.post('/register',uploadFile.single('profile_picture'), validations.register, userController.processRegister)

//Formulario de edicion <Uptade>
router.get('/edit/:id',authMiddleware, userController.editUser)

router.post('/edit/:id',uploadFile.single('profile_picture'), validations.userEdition, userController.saveEdition)


//Formulario del login
router.get('/login', guesMiddleware, userController.login);

// Proceso formulario del login
router.post('/login', userController.loginProcess);

// perfil de usuario
router.get('/profile', authMiddleware, userController.profile);

// logout  
router.get('/logout',  userController.logout);

module.exports = router;