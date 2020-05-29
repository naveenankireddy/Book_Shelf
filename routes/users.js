var express = require("express");
var router = express.Router();
var User = require("../models/user");
// var session = require("express-session");

/* GET users listing. */

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect("login");
  });
});

//login
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;

  var user = await User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user || !user.verifyPassword(password)) {
        res.redirect("/users/login");
        }
    req.session.userId = user.id;

    console.log("User", user);
    return user;
  });
  res.redirect("/books");
});

// router.post("/login",(req,res,next) => {
//   var{email, password} = req.body;
//   User.findOne({email},(err,user) =>{
//     if(err) return next(err);
//     req.session.userId = user.id;
//     res.render("userprofile");
//   })
// })



//GET user profile

// router.get("/")



module.exports = router;
