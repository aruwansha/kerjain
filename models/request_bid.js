const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema({
  requestId: {
    type: ObjectId,
    ref: "Request",
  },
  freelancerId: {
    type: ObjectId,
    ref: "Freelancer",
  },
  name: {
    type: String,
    required: true,
  },
  bid: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("RequestBid", requestSchema);
