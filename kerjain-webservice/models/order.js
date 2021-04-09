const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  serviceUserId: {
    type: ObjectId,
    ref: "ServiceUser",
  },
  serviceId: [
    {
      _id: {
        type: ObjectId,
        ref: "Service",
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  proofPayment: {
    type: String,
    required: true,
  },
  bankFrom: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
