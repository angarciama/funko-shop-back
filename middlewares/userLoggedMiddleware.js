//const User = require('../models/User');
const db = require('../database/models')
const User = db.User

const userLoggedMiddleware = async(req, res, next)=> {

    try {
    res.locals.isLogged = false;

    let id = req.cookies.id;
    let user= await User.findByPk({where:{id:id}});

    if(user) {
        req.session.userId = user.id;
        
    }

    if(req.session && req.session.userLogged ){    
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;

    }

        
    } catch (error) {
        
    }

    
    
    


    next();
}


module.exports = userLoggedMiddleware;