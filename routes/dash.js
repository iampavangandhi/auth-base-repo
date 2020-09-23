const express = require("express");

const router = express.Router();

const { dash } = require("../controllers/dash");
const { checkAuth } = require("../middleware/auth");

// @desc    Dashboard
// @route   GET /dash
router.get("/dash", checkAuth, dash);

module.exports = router;
