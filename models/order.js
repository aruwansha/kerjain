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
    type: ObjectId,
    ref: "Service",
  },
  requestId: {
    type: ObjectId,
    ref: "Request",
  },
  total: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
      default: "unpaid",
    },
  },
  work: {
    type: String,
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
  proofSalary: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
