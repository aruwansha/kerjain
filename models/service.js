const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  freelancerId: {
    type: ObjectId,
    ref: "Freelancer",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
