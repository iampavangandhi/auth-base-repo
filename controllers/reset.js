const bcrypt = require("bcryptjs");
const path = require("path");

// Import Schema
const User = require("../models/User");

// Reset
exports.reset = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/reset.html"));
};

// Reset
exports.resetPass = async (req, res) => {
  const { email, password1, password2 } = req.body;

  const token = req.body.token.split("%20")[1];

  if (password1 === password2 && token) {
    // Encrypt password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      if (!err) {
        bcrypt.hash(password1, salt, async (err, hash) => {
          if (!err) {
            await User.findOneAndUpdate(
              { email },
              {
                password: hash,
              }
            );
            return res.redirect("/dash");
          } else {
            return res.status(500).json({ success: false, msg: err });
          }
        });
      } else {
        return res.status(500).json({ success: false, msg: err });
      }
    });
  } else {
    res.status(400).json({ success: false, msg: "Entered Inputs are wrong" });
  }
};
