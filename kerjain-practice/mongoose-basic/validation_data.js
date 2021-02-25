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

const apple = new Fruit({
  name: "Apel",
  rating: 8,
  review: "Enak sekalo",
});

apple.save(function (error) {
  if (error) {
    console.log(error);
  } else {
    mongoose.connection.close();
    console.log("berhasil");
  }
});

// const anggur = new Fruit({
//   name: "Anggur",
//   rating: 7,
//   review: "Enak tapi mahal",
// });

// const melon = new Fruit({
//   name: "Melon",
//   rating: 8,
//   review: "Enak mantap",
// });

// Fruit.insertMany([anggur, melon], function (error) {
//   if (error) {
//     console.log(error);
//   } else {
//     mongoose.connection.close();
//     console.log("berhasil tambah buah");
//   }
// });
