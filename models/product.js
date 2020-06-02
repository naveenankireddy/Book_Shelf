const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
