const express = require("express");

const router = express.Router();

const { dash } = require("../controllers/dash");
const { checkAuth } = require("../middleware/auth");

/**
 * Route for the dashboard
 *
 * @name Route - dashboard route
 * @path {GET} /dash
 * @auth Authentication is required
 */
router.get("/dash", checkAuth, dash);

module.exports = router;
