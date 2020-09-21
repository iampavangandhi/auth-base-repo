const express = require("express");
const router = express.Router();

const { dash } = require("../controllers/dash");

// @desc    Dash
// @route   GET /dash
router.get("/dash", dash);

module.exports = router;
