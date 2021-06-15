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
  bid: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("RequestBid", requestSchema);
