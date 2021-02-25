const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: [
    {
      _id: {
        type: ObjectId,
        ref: "Product",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  serviceUserId: [
    {
      type: ObjectId,
      ref: "ServiceUser",
    },
  ],
  bankId: [
    {
      type: ObjectId,
      ref: "Bank",
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
