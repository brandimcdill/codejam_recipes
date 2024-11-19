const router = require("express").Router();

const { getDishes, createNewDish } = require("../controllers/dishes");

const auth = require("../middleware/auth");

router.get("/dishes", getDishes);

router.post("/dishes", auth, createNewDish);

module.exports = router;
