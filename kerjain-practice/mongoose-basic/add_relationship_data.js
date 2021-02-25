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
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Data name kosong, tolong diisi!"],
  },
  age: {
    type: Number,
  },
  favoritFruit: fruitSchema,
});

const People = mongoose.model("People", peopleSchema);

const fruitDuku = new Fruit({
  name: "Duku",
  rating: 8,
  review: "Enak sekalo",
});

fruitDuku.save(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("berhasil menambah duku");
  }
});

const people = new People({
  name: "Ilham",
  age: 21,
  favoritFruit: fruitDuku,
});

people.save(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Berhasil membuat ilham dengan duku");
  }
});
