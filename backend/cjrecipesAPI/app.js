const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/codejamrecipes");

app.use(express.static(path.join(__dirname, "backend/cjrecipes")));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
