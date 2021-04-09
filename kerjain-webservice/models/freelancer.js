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
  bankName: {
    type: String,
  },
  bankAccount: {
    type: String,
  },
  accountHolder: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  isBanned: {
    type: Boolean,
    default: false,
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
      type: ObjectId,
      ref: "Service",
    },
  ],
  reviewId: [{
    type: ObjectId,
    ref: "Review",
  }],
});
module.exports = mongoose.model("Freelancer", freelancerSchema);
