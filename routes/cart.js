var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Cart = require("../models/cart");
var Book = require("../models/book");

//Cart

router.get("/", async (req, res) => {
  let userId = req.session.userId;
  let cart = await Cart.findOne({ userId }).populate("products");
  res.render("cart", { cart });
});

// router.get("/:id", async (req, res, next) => {
//     var productId = req.params.id;
//     var book = await Book.findById(productId, (err, book) => {
//         if(err) next(err)
//         console.log("inside Book find");
//         return book;
//     })
//     console.log(book);

//     res.render('cart', {book})
//   })

router.post("/books/:bookId", async (req, res, next) => {
  try {
    let userId = req.session.userId;
    let bookId = req.params.bookId;

    var cartToFind = await Cart.findOne({ userId });

    if (!cartToFind) {
      Cart.create({
        userId,
        products: bookId,
      });

      res.rendirect("/cart");
    }
    await Cart.findOneAndUpdate(
      { userId },
      {
        $push: { products: bookId },
      },
      { new: true }
    );
    res.redirect("/cart");
  } catch (error) {
    next(error);
  }
});
//     var cartId = req.params.userId;

//     console.log(cartId, "Article ID in comments");

//     // req.body.cartId = req.params.userId;
//     // Cart.create(cartId, (err, addtocart) => {
//     //   if (err) return next(err);
//       Cart.findByIdAndUpdate(
//         cartId,
//         { $push: { comments: addtocart.id } },
//         (err, cart) => {
//           if (err) return next(err);
//           res.redirect(`/cart/${cart.id}`);
//         }
//       );
//     });
//   });

// router.post("/cart", async (req, res) => {
//   const { productId, quantity, name, price } = req.body;

//   const {userId} = req.session; //TODO: the logged in user id

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       //cart exists for user
//       let itemIndex = cart.products.findIndex(p => p.productId == productId);

//       if (itemIndex > -1) {
//         //product exists in the cart, update the quantity
//         let productItem = cart.products[itemIndex];
//         productItem.quantity = quantity;
//         cart.products[itemIndex] = productItem;
//       } else {
//         //product does not exists in cart, add new item
//         cart.products.push({ productId, quantity, name, price });
//       }
//       cart = await cart.save();
//       return res.status(201).send(cart);
//     } else {
//       //no cart for user, create new cart
//       const newCart = await Cart.create({
//         userId,
//         products: [{ productId, quantity, name, price }]
//       });

//       return res.status(201).send(newCart);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong");
//   }
// });

module.exports = router;
