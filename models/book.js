var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//book
//title
//imageUrl
//author
//description
//price

var bookSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
  },
});

var Book = mongoose.model("Book", bookSchema);
module.exports = Book;
