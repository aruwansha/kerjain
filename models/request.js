const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema({
  requestDate: {
    type: Date,
    default: Date.now(),
  },
  serviceUserId: {
    type: ObjectId,
    ref: "ServiceUser",
  },
  requestSubject: {
    type: String,
    required: true,
  },
  requestDescription: {
    type: String,
    required: true,
  },
  requestBudget: {
    type: String,
    required: true,
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  freelancerId: {
    type: ObjectId,
    ref: "FreelancerId",
  },
});

module.exports = mongoose.model("Request", requestSchema);
