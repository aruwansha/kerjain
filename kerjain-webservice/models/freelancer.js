const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
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
  profileImg: {
    type: String,
    required: true,
  },
  serviceCategory: {
    type: ObjectId,
    ref: "Category",
  },
  serviceTitle: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  serviceImg: {
    type: String,
    required: true,
  },
  serviceRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
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
});

module.exports = mongoose.model("Freelancer", freelancerSchema);
