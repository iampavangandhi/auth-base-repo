const express = require("express");

const router = express.Router();

const { index } = require("../controllers/index");

/**
 * Route for Login Landing Page
 *
 * @name Route - index route
 * @path {GET} /
 */
router.get("/", index);

module.exports = router;
