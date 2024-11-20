const dish = require("../models/dish");
const {
  VALIDATION_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

module.exports.getDishes = (req, res) => {
  dish
    .find({})
    .then((items) => res.send({ data: items }))
    .catch(() => {
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports.createNewDish = (req, res) => {
  const { name, recipe, type, imageUrl, drinkRec } = req.body;
  console.log(req.body);

  dish
    .create({ name, recipe, type, imageUrl, drinkRec })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.name });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

module.exports.clearDishes = (req, res) => {
  dish
    .deleteMany()
    .then(function () {
      // Success
      console.log("Data deleted");
    })
    .catch(function (error) {
      // Failure
      console.log(error);
    });
};
