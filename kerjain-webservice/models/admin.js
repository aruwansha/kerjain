const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  birthdate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
