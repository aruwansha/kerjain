const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  serviceUserId: {
    type: ObjectId,
    ref: "ServiceUser",
  },
  freelancerId: {
    type: ObjectId,
    ref: "Freelancer",
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
