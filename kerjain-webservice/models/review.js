const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  freelancerId: {
    type: ObjectId,
    ref: "Freelancer",
  },
  serviceUserId: {
    type: ObjectId,
    ref: "ServiceUser",
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
