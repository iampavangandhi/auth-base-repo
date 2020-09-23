const express = require("express");

const router = express.Router();

const { index } = require("../controllers/index");

// @desc    Login/Landing page
// @route   GET /
router.get("/", index);

module.exports = router;
