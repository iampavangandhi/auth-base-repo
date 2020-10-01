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
  const { email, password1, password2 } = req.body;

  const token = req.body.token.split("%20")[1];

  if (password1 === password2 && password1.length >= 6 && token) {
    // Encrypt password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) next(err);
      bcrypt.hash(password1, salt, async (err, hash) => {
        if (err) next(err);
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
    res.status(400).json({ success: false, msg: "Entered Inputs are wrong" });
  }
};
