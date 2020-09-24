const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmail, isAlpha } = require("validator");

// Import schema
const User = require("../models/User");

/**
 * Controller for signup route
 *
 * @name Controller - signup route controller
 * @param {object} req - the request
 * @param {object} res - the response
 * @body {object} req.body name, email, password
 */
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (isAlpha(name) && isEmail(email)) {
    User.findOne({ email }).then((user) => {
      if (user) {
        return res
          .status(403)
          .json({ success: false, msg: "Email Already There" });
      }
      const newUser = new User(req.body);

      // Encrypt password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({
            success: false,
            msg: `Internal Server Error: ${err}`,
          });
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({
              success: false,
              msg: `Internal Server Error: ${err}`,
            });
          }
          newUser.password = hash;
          newUser.save().catch((err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                msg: `Internal Server Error: ${err}`,
              });
            }
          });
          res.clearCookie("token");
          res.redirect("/");
        });
      });
    });
  } else {
    res
      .status(400)
      .json({ success: false, msg: "Required Input fields are wrong" });
  }
};

/**
 * Controller for signin route
 *
 * @name Controller -  signin route controller
 * @param {object} req - the request
 * @param {object} res - the response
 * @body {object} req.body email, password
 */
exports.signin = (req, res) => {
  const { email, password } = req.body;

  if (isEmail(email)) {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(403)
            .json({ success: false, msg: "User Not Found" });
        }
        res.clearCookie("token");

        // Compare passwords using bcrypt
        bcrypt
          .compare(password, user.password)
          .then((isSame) => {
            if (isSame) {
              // Use payload and create token for user
              const payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
              };

              jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  // Disabling the httpOnly flag to test in localhost
                  // res.cookie("token", `Bearer ${token}`, { httpOnly: true });
                  res.cookie("token", `Bearer ${token}`);
                  res.redirect("/dash");
                }
              );
            } else {
              return res
                .status(400)
                .json({ success: false, msg: "Wrong Password" });
            }
          })
          .catch((err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                msg: `Internal Server Error: ${err}`,
              });
            }
          });
      })
      .catch((err) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, msg: `Internal Server Error: ${err}` });
        }
      });
  } else {
    res.status(400).json({ success: false, msg: "Required Fields Missing" });
  }
};

/**
 * Controller for signout route
 *
 * @name Controller -  signout route controller
 * @param {object} req - the request
 * @param {object} res - the response
 */
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).redirect("/");
};
