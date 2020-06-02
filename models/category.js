var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    imageurl: {
      type: String,
    },
    name: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
