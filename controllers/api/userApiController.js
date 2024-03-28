const bcrypt = require("bcryptjs")
const {User} = require('../../database/models');
const { Op, JSON } = require("sequelize");
const userApiController = {

    userList : async (req,res) =>{
        try {
        const user = await User.findAll()
       
        const data = {
            "count":user.length,
            "users": user.map(users =>{
                return{
                    id:users.id,
                    name:users.user_name,
                    email:users.email,
                    url:"http://localhost:4000/api/user/" + users.id
                    
                }
            })
        
    }
        res.json(data)
            
        } catch (error) {
            res.json("Algo salió mal");
        }
        

    },
    detailUser:async(req,res) =>{
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);
            const data = {
                "id":id,
                "full_name":user.full_name,
                "user_name":user.user_name,
                "email":user.email,
                "image-link":"http://localhost:4000/img/profilePictures/" + user.profile_picture
            }

            res.json(data);
            
        } catch (error) {
            res.json("Algo salió mal");
        }

    }
        
    }
    
    module.exports = userApiController;