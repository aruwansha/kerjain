const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema({
  serviceUserId: {
    type: ObjectId,
    ref: "ServiceUser",
  },
  requestSubject: {
    type: String,
    required: true,
  },
  requestDescription: {
    type: String,
    required: true,
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Request", requestSchema);
