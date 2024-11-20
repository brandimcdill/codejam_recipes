const mongoose = require("mongoose");

const validator = require("validator");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  recipe: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  type: {
    type: String,
    required: true,
    enum: ["mainDishes", "appetizers", "desserts"],
  },
  imageUrl: {
    type: String,
    required: true,

    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  drinkRec: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("dish", dishSchema);
