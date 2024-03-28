const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { memoryStorage } = require('multer');

const db = require('../database/models')
const sequelize = db.sequelize
const {Op} = require('sequelize');
const session = require('express-session');

const User = db.User
const CategoryUser = db.CategoryUser



const userController = {

//ARMIN REGISTER
    adminRegister:  (req, res) => {
    //permite guardar la informacion del usuario logueado para mostrarla en la barra de navegacion
        let userLogged = req.session.userId

   
        return res.render('./users/admin-register',{userLogged});
    },

    saveAdminRegister: async (req, res) =>{
        let userLogged = req.session.userId
        const resultValidation = validationResult(req);
        let emailExits = req.body.email

        let userInDB = await User.findOne({where:{
            email:emailExits
            }
        });
        
       
        if (userInDB) {
            res.render('./users/admin-register',{
                errors: [{ email :{msg: 'Este correo electrónico ya existe'}}],
                old: req.body,
                userLogged
                 
            })
        }

        if(resultValidation.isEmpty() && !userInDB){
        let userToCreate = {
            full_name: req.body.full_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password,10),            
            profile_picture: req.file.filename,
            category_user_id:1
            
        } 
        
        
         await User.create(userToCreate)
          return  res.redirect('/user/login')
       } else  {
        const users = await CategoryUser.findAll()
           res.render('./users/admin-register',{
            errors: errors.array(),
            oldData: req.body,
               userLogged
           })
       }
       
    },

    adminProfile: (req,res) => {
    
        return res.render('./users/admin-profile',{userLogged: req.session.userId});
     },


// CRUD USUARIOS-CUSTOMERS
    register:  (req, res) => {
        //permite guardar la informacion del usuario logueado para mostrarla en la barra de navegacion
        let userLogged = req.session.userId

       
        return res.render('./users/register',{userLogged});
    },
    processRegister: async (req,res) =>{
        let userLogged = req.session.userId
       
        const resultValidation = validationResult(req);
        let emailExits = req.body.email

        let userInDB = await User.findOne({where:{
            email:emailExits
            }
        });
        
       
        if (userInDB) {
            res.render('./users/register',{
                errors: [{ email :{msg: 'Este correo electrónico ya existe'}}],
                old: req.body,
                userLogged  
            })
        }

        if(resultValidation.isEmpty() && !userInDB){
        let userToCreate = {
            full_name: req.body.full_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password,10),            
            profile_picture: req.file.filename,
            category_user_id:2
            
        } 
        
        
         await User.create(userToCreate)
          return  res.redirect('/user/login')
       } else  {
        const users = await CategoryUser.findAll()
           res.render('./users/register',{
               errors: resultValidation.array(),
               old: req.body,
               userLogged
           })
       }
       

    },

    editUser: async (req,res) =>{
        try {
            let userLogged = req.session.userId
            const id = req.params.id;
        
        const user = await User.findByPk(id)

        res.render('./users/editUsers',{user,userLogged})
            
        } catch (error) {
            console.log(error);
        }
        

    },
    saveEdition: async (req,res) =>{

        try {
            
            const id = req.params.id

            const userImage = await User.findByPk(id)

            let image = req.file ?  req.file.filename : userImage.profile_picture;
            const {full_name,email,user_name}=req.body

            

            await User.update({
                full_name,
                user_name,
                profile_picture:image,
                email
            },{where: {id:id}})
            
            let adminTologin = await  User.findOne({where:{
                category_user_id:1
                }
            });
            if(adminTologin) {
                res.redirect("/user/admin-profile")
            } else{
                return res.redirect("/user/profile")
            }
       
            
        } catch (error) {
            console.log(error);
        }
    },


    //LOGIN USER

    login: (req,res) => {
        let userLogged = req.session.userId

        return res.render('login',{userLogged})
    },

    // Proceso validacion de credenciales login
    loginProcess: async (req, res) => {

        let userLogged = req.session.userId
        let email= req.body.email

        let adminTologin = await  User.findOne({where:{
            email:email,
            category_user_id:1
            }
        });

        if(adminTologin){
            let isOkthePassword = bcryptjs.compareSync(req.body.password, adminTologin.password);
            if(isOkthePassword){
                delete adminTologin.password;
                req.session.userId = adminTologin;

                if(req.body.remember_user) {
                    res.cookie(adminTologin, { maxAge: (1000 * 60 ) * 2});
                }

                 return res.redirect("/user/admin-profile")

            }

            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                },
                userLogged
            });
        }

        let customerTologin = await  User.findOne({where:{
            email:email,
            category_user_id:2
            }
        });

        if(customerTologin){
            let isOkthePassword = bcryptjs.compareSync(req.body.password, customerTologin.password);
            if(isOkthePassword){
                delete customerTologin.password;
                req.session.userId = customerTologin;

                if(req.body.remember_user) {
                    res.cookie(customerTologin, { maxAge: (1000 * 60 ) * 2});
                }

                 return res.redirect("/user/profile")

            }

            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                },
                userLogged
            });
        }
    },

   profile: (req,res) => {
    
       return res.render('./users/profile',{userLogged: req.session.userId});
    },

    logout: (req, res) =>{
        let email= req.body.email
        res.clearCookie(email);
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = userController;