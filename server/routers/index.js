const express = require("express");
const router = express.Router();
// const authController = require("../controllers/authController");
// const mainController = require("../controllers/mainController");
// const { authentication, authorization } = require("../middlewares/authHandler");
// const errorHandlers = require("../middlewares/errorhandler");

// ==== Endpoint Users ====
router.post("/users");
router.get("/users");
router.patch("/users/score/userId");

// ==== Endpoint messages ====
router.post("/messages");
router.get("/messages");

// ==== Endpoint rooms ====
router.get("/rooms");
router.get("/userrooms");
router.post("/userrooms");

// router.use(errorHandlers);

module.exports = router;
