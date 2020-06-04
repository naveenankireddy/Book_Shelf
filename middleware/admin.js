var User  = require("../models/user");

modules.exports = async (req,res,next) =>{
    try {
        if(req.loggedUser.isAdmin){
            return next();
        }else {
            res.send("not a valid admin");
            res.redirect("/users/login");
            next()
        }
    } catch (error) {
     next(error)   
    }
}
