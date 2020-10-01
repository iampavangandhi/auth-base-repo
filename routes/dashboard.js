const express = require("express");

const router = express.Router();

const { dashboard } = require("../controllers/dashboard");
const { checkAuth } = require("../middleware/auth");

/**
 * Route for the dashboard
 *
 * @name Route - dashboard route
 * @path {GET} /dash
 * @auth Authentication is required
 */

router.get("/dashboard", checkAuth, dashboard);

module.exports = router;
