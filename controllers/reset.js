const bcrypt = require("bcryptjs");
const path = require("path");

// Import schema
const User = require("../models/User");

/**
 * Controller for reset route
 *
 * @module
 * @name Controller -  reset route controller
 * @param {object} req request
 * @param {object} res response
 */
exports.reset = (req, res) => {
  const { token } = req.cookies;

  res
    .status(200)
    .set("token", token)
    .sendFile(path.join(__dirname, "../public/reset.html"));
};

/**
 * Controller for resetPass route
 *
 * @module
 * @name Controller -  resetPassword route controller
 * @param {object} req request
 * @param {object} res response
 * @body {object} req.body token, name, password1, password2
 */
exports.resetPassword = async (req, res, next) => {
  const { token, email, password1, password2 } = req.body;

  if (!token || !email || !password1 || !password2) {
    res.errHandler(400, false, "Missing Inputs");
  } else if (password1 === password2 && password1.length >= 6) {
    // Encrypt password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.errHandler(500, false, "Internal Server Error");
      bcrypt.hash(password1, salt, async (err, hash) => {
        if (err) res.errHandler(500, false, "Internal Server Error");
        await User.findOneAndUpdate(
          { email },
          {
            password: hash,
          }
        );
        return res.redirect("/dashboard");
      });
    });
  } else {
    res.errHandler(400, false, "Entered Inputs are Wrong");
  }
};
