const express = require("express");

const router = express.Router();

const { reset, resetPass } = require("../controllers/reset");
const { checkAuth } = require("../middleware/auth");

/**
 * Route for reset password page
 *
 * @name Route - reset route
 * @path {GET} /reset
 * @auth Authentication is required
 */
router.get("/reset", checkAuth, reset);

/**
 * Route for resetting password
 *
 * @name Route - resetPass route
 * @path {PUT} /reset
 * @auth Authentication is required
 */
router.put("/reset", checkAuth, resetPass);

module.exports = router;
