const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signup, signin, reset, signout } = require("../controllers/auth");

//Import Schema
const User = require("../models/User");

// @desc    Signup
// @route   POST /signup
router.post("/signup", signup);

// @desc    Signin
// @route   POST /signin
router.post("/signin", signin);

// @desc    Forget/Reset
// @route   POST /reset
router.post("/reset", reset);

// @desc    Signout
// @route   GET /signout
router.get("/signout", signout);

module.exports = router;
