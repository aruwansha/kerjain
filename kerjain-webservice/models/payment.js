const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
  adminId: {
    type: ObjectId,
    ref: "Admin",
  },
  paymentName: {
    type: String,
    required: true,
  },
  paymentAccount: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
