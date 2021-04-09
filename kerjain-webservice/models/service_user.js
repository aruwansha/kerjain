const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceUserSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
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
