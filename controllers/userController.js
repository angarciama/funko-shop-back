const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { memoryStorage } = require('multer');

const User = require('../models/User');
const controller = {

    register: (req, res) => {
        return res.render('register');
    },
    processRegister: (req,res) =>{

        const resultValidation = validationResult(req);

        let userInDB = User.findByField('email', req.body.email);
       
        if (userInDB) {
            res.render('register',{
                errors: [{ msg: 'Este correo electrónico ya existe'}],
                old: req.body  
            })
        }

        if(resultValidation.isEmpty() && !userInDB){
        let userToCreate = {
            fullname: req.body.fullname,
            userName: req.body.username,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password,10),            
            profilePicture: req.file.filename
            
        }        
        User.create(userToCreate)
           res.redirect('login')
       } else  {
           res.render('register',{
               errors: resultValidation.array(),
               old: req.body
           })
       }
       

    },

    login: (req,res) => {
        return res.render('login')
    },

   // profile: (req,res) => {
     //   return res.render('profile');
    //}
}

module.exports = controller;