const express = require("express");
const authController = require("./../controllers/authControllers");
const auth = require("./../middleware/auth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);

router.get("/account", auth, authController.getUser);

module.exports = router;
