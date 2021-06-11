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
    unique: true,
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
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

module.exports = mongoose.model("User", usersSchema);
