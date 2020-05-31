const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
        }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
