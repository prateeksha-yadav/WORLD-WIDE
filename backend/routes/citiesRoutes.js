const express = require("express");

const citiesController = require("./../controllers/citiesControllers");
const auth = require("./../middleware/auth");

const router = express.Router();

router.get("/", auth, citiesController.getCities);
router.get("/:id", auth, citiesController.getCity);
router.post("/", auth, citiesController.createCity);
router.patch("/:id", auth, citiesController.updateCity);
router.delete("/:id", auth, citiesController.deleteCity);

module.exports = router;
