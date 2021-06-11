const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const freelancerSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  orderId: [
    {
      type: ObjectId,
      ref: "Order",
    },
  ],
  bankName: {
    type: String,
  },
  bankAccount: {
    type: String,
  },
  accountHolder: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  serviceId: [
    {
      _id: {
        type: ObjectId,
        ref: "Service",
      },
    },
  ],
  reviewId: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
});
module.exports = mongoose.model("Freelancer", freelancerSchema);
