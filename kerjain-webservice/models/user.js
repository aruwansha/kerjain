const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerifiedAt: {
    type: new Timestamp(),
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["user", "freelancer", "service_user"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
