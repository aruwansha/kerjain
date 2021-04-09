const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 16,
  },
  level: {
    type: String,
    enum: ["admin", "freelancer", "service_user"],
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

module.exports = mongoose.model("User", usersSchema);
