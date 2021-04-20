const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceUserSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  rating: {
    type: Number,
    max: 5,
    default: 0,
  },
  imgUrl: {
    type: String,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  orderId: [{
    type: ObjectId,
    ref: "Order",
  }],
  reviewId: [{
    type: ObjectId,
    ref: "Review",
  }],
});

module.exports = mongoose.model("ServiceUser", serviceUserSchema);
