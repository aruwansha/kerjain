const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  freelancerId: {
    type: ObjectId,
    ref: "Freelancer",
  },
  serviceUserId: {
    type: ObjectId,
    ref: "ServiceUser",
  },
  invoice: {
    type: String,
    required: true,
  },
  serviceId: {
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
  total: {
    type: Number,
  },
  detailNote: {
    type: String,
    required: true,
  },
  payments: {
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
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
