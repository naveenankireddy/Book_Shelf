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
    return books;
  });
  var { userId } = req.session;
  var user = await User.findById(userId, (err, user) => {
    if (err) return next(err);
    return user;
  });

  res.render("allBooks", { books, user });
});

//createBook
//get the books/createbook
//render("createBook") in ejs
router.get("/createbook", (req, res) => {
  res.render("createBook");
});

router.post("/createbook", (req, res, next) => {
  // console.log(req.body);

  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

//get single book

router.get("/:id", async (req, res, next) => {
  var id = req.params.id;

  try {
    let book = await Book.findById(id);
    var user = await User.findById(req.session.userId);

    res.render("bookdetails", { book, user });
  } catch (error) {
    next(err);
  }
});

//edit book form
router.get("/:id/edit", async (req, res, next) => {
  try {
    let bookId = req.params.id;
    let book = await Book.findById(bookId);
    res.render("updateBook", { book });
  } catch (error) {
    next(err);
  }
});

//edit book
router.post("/:id/edit", async (req, res, next) => {
  try {
    let bookId = req.params.id;
    await Book.findByIdAndUpdate(bookId, req.body);
    res.redirect(`/books/${bookId}`);
  } catch (error) {
    next(err);
  }
});

//delete book
router.get("/:id/delete", async (req, res, next) => {
  try {
    let bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.redirect("/books");
  } catch (error) {
    next(err);
  }
});

//get books by categories

router.get("/category/:category", async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    let books = await Book.find({ category: req.params.category });
    res.render("allBooks", { books, user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
