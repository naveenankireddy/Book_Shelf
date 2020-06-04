var User = require("../models/user");

exports.loggedUserDetails = async (req,res,next) =>{
    try {
       if(req.session && req.session.userId) {
           var userId = req.session.userId;
           var user = await User.findById(userId);
           req.loggedUser = user;
           req.locals.loggedUser = user;
           next()
       } 
       else{
           req.loggedUser = null;
           req.locals.loggedUser = null;
           res.redirect('/users/login')
           next();
       }
    } catch (error) {
        next(error)
    }
} 