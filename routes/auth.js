const express = require("express");

const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth");

// @desc    Signup
// @route   POST /signup
router.post("/signup", signup);

// @desc    Signin
// @route   POST /signin
router.post("/signin", signin);

// @desc    Signout
// @route   GET /signout
router.get("/signout", signout);

module.exports = router;
