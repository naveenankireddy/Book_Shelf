var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Cart = require("../models/cart");
var session = require("express-session");
// var auth = require("../middleware/auth");



//register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  try {
    const admin = ["admin@gmail.com"];
    if (admin.includes(req.body.email)) {
      req.body.isAdmin = true;
      var user = await User.create(req.body);
      res.redirect("/users/login");
    }

    //users
    else {
      var user = await User.create(req.body);
    }

    res.redirect("/users/login");
  } catch (error) {
    next(error);
  }
});

//login
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;

  var user = await User.findOne({ email });
  if (!user && !user.verifyPassword(password)) {
    res.redirect("/users/login");
  }
  req.session.userId = user.id;

  // console.log("User", user);
  res.redirect("/books");
});

//GET user profile

router.get("/profile", async (req, res, next) => {
  var { userId } = req.session;
  console.log({ userId });
  var user = await User.findById(userId, (err, user) => {
    if (err) return next(err);
    return user;
  });
  res.render("userprofile", { user });
});

router.post("/profile", async (req, res, next) => {
  var { userId } = req.session;
  var updateValue = req.body;
  console.log("working", updateValue);
  let user = await User.findByIdAndUpdate(userId, updateValue, (err, user) => {
    if (err) return next(err);
    return user;
  });
  res.redirect("/books");
});

//logout
router.get("/logout", (req, res, next) => {
  console.log("logout");
  req.session.destroy();
  res.redirect("/users/login");
});

module.exports = router;
