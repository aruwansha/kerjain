const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/db-mongoose", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Data name kosong, tolong diisi!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 7,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

Fruit.updateOne(
  { _id: "603288994c11c90fe060d63e" },
  { name: "Stroberi" },
  function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("berhasil merubah data");
    }
  }
);

Fruit.deleteOne({ _id: "603288994c11c90fe060d63e" }, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("berhasil delete data");
  }
});

Fruit.find(function (error, fruits) {
  if (error) {
    console.log(error);
  } else {
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});
