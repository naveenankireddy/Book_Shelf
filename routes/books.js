var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var User = require("../models/user");
// var commentRouter = require("./comments");
// var Comment = require("../models/comment");

//get all books

router.get("/", async (req, res, next) => {
  var books = await Book.find({}, (err, books) => {
    if (err) return next(err);
    console.log(books);
    return books;
  });
  var {userId} = req.session;
  var user = await User.findById(userId, (err, user) => {
    if(err) return next(err);
    console.log(user);
    
    return user;
  })
  
  res.render("allBooks", { books, user });
});

//createBook
//get the books/createbook
    //render("createBook") in ejs
router.get("/createbook",(req,res) => {
    res.render("createBook");
});

router.post("/createbook",(req,res,next) => {
    console.log(req.body);
    
    Book.create(req.body, (err,book) => {
        if(err) return next(err);
        res.redirect("/books");
    })
})

//get single book

router.get("/:id",(req,res,next) => {
  var id = req.params.id;
  Book.findById(id)
  .populate("")
  .exec((err,book) => {
    if(err) return next(err);
    res.render("bookdetails",{book});
  })
})






module.exports = router;