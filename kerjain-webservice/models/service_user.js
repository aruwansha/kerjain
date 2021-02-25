const mongoose = require("mongoose");

const serviceUserSchema = new mongoose.Schema({
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
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
  interest: {
    type: ObjectId,
    ref: "Category",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  profileImg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ServiceUser", serviceUserSchema);
