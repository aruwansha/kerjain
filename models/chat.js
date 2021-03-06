const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema({
  serviceUserId: {
    type: ObjectId,
    ref: "User",
  },
  freelancerUserId: {
    type: ObjectId,
    ref: "User",
  },
  from: {
    type: ObjectId,
    ref: "User",
  },
  to: {
    type: ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  isReadFreelancer: {
    type: Boolean,
    default: false,
  },
  isReadServiceUser: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
