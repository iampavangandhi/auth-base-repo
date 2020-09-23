const express = require("express");

const router = express.Router();

const { reset, resetPass } = require("../controllers/reset");
const { checkAuth } = require("../middleware/auth");

// @desc    Reset Password
// @route   POST /reset
router.get("/reset", checkAuth, reset);

// @desc    Reset Password
// @route   PUT /reset
router.put("/reset", checkAuth, resetPass);

module.exports = router;
