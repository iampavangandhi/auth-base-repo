const express = require("express");

const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth");

/**
 * Route for user signup
 *
 * @name Route - signup route
 * @path {POST} /signup
 */
router.post("/signup", signup);

/**
 * Route for user signin
 *
 * @name Route - signin route
 * @path {POST} /signin
 */
router.post("/signin", signin);

/**
 * Route for signout
 *
 * @name Route - signout route
 * @path {GET} /signout
 */
router.get("/signout", signout);

module.exports = router;
