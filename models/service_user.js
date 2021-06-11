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
  imgUrl: {
    type: String,
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
