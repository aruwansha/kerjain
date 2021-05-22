const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bankSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  }
});

module.exports = mongoose.model("Bank", bankSchema);
