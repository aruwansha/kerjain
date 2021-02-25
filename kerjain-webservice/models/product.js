const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  freelancerId: [
    {
      type: ObjectId,
      ref: "Freelancer",
    },
  ],
  title: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
