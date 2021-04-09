const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  freelancerId: [
    {
      type: ObjectId,
      ref: "Freelancer",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
