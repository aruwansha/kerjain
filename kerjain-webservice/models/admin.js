const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
