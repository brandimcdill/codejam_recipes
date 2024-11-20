const router = require("express").Router();
const cors = require("cors");

const {
  getDishes,
  createNewDish,
  clearDishes,
} = require("../controllers/dishes");

router.use(cors());

router.get("/dishes", getDishes);

router.post("/dishes", createNewDish);

router.delete("/dishes", clearDishes);

module.exports = router;
