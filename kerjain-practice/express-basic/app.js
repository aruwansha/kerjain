const express = require("express");
const app = express();
const port = 3000;

app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

app.get("/", (req, res) => {
  const buah = [{ name: "apel" }, { name: "mangga" }, { name: "jeruk" }];

  res.render("index", {
    name: "Ilham",
    umur: 21,
    alamat: "Kediri",
    buah: buah,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
