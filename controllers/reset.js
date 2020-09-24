const bcrypt = require("bcryptjs");
const path = require("path");

// Import schema
const User = require("../models/User");

/**
 * controller for reset route
 *
 * @name Controller -  reset route controller
 * @param {object} req - the request
 * @param {object} res - the response
 */
exports.reset = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/reset.html"));
};

/**
 * controller for resetPass route
 *
 * @name Controller -  resetPass route controller
 * @param {object} req - the request
 * @param {object} res - the response
 * @body {object} req.body token, name, password1, password2
 */
exports.resetPass = async (req, res) => {
  const { email, password1, password2 } = req.body;

  const token = req.body.token.split("%20")[1];

  if (password1 === password2 && token) {
    // Encrypt password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: `Internal Server Error: ${err}`,
        });
      }
      bcrypt.hash(password1, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            success: false,
            msg: `Internal Server Error: ${err}`,
          });
        }
        await User.findOneAndUpdate(
          { email },
          {
            password: hash,
          }
        );
        return res.redirect("/dash");
      });
    });
  } else {
    res.status(400).json({ success: false, msg: "Entered Inputs are wrong" });
  }
};
