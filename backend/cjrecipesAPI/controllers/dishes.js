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
  console.log(req.user._id);
  const { name, recipe, type, imageUrl } = req.body;
  console.log(req.body);

  dish
    .create({ name, recipe, type, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occurred on the server." });
      }
    });
};
