var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Cart = require("../models/cart");
var Book = require("../models/book");
var Product = require("../models/product");

//Cart

router.get("/", async (req, res) => {
  let userId = req.session.userId;
  console.log(userId, "here is the user ID ---------------- ok ok");
  let cart = await Cart.findOne({ userId }).populate({
    path: "products",
    populate: {
      path: "bookId",
    },
  });
  console.log(cart, "inside cart router");
  res.render("cart", { cart });
});

router.post("/books/:bookId", async (req, res, next) => {
  try {
    let userId = req.session.userId;
    let bookId = req.params.bookId;
    //find cart of the user
    var cartToFind = await Cart.findOne({ userId }).populate("products");

    //if cart not found
    if (!cartToFind) {
      var product = await Product.create({ bookId, userId });
      await Cart.create({
        userId,
        products: product.id,
      });
    } else if (cartToFind) {
      var isAvailable = cartToFind.products.find(
        (product) => product.bookId == bookId
      );
      if (isAvailable && isAvailable.id) {
        await Product.findByIdAndUpdate(
          isAvailable.id,
          {
            $inc: { quantity: 1 },
          },
          { new: true }
        );
      } else {
        var product = await Product.create({ bookId, userId });
        await Cart.findOneAndUpdate(
          { userId },
          {
            $push: { products: product.id },
          },
          { new: true }
        );
      }
    }
    res.redirect("/cart");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
