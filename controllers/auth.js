const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmail, isAlpha } = require("validator");

// Import schema
const User = require("../models/User");

/**
 * Controller for signup route
 *
 * @module
 * @name Controller - signup route controller
 * @param {object} req request
 * @param {object} res response
 * @body {object} req.body name, email, password
 */
exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.errHandler(400, false, "Missing Inputs");
  } else if (isAlpha(name) && isEmail(email) && password.length >= 6) {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          res.errHandler(403, false, "Email Already Registered");
        } else {
          const newUser = new User(req.body);
          // Encrypt password using bcrypt
          bcrypt.genSalt(10, (err, salt) => {
            if (err) res.errHandler(500, false, "Internal Server Error");
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) res.errHandler(500, false, "Internal Server Error");
              newUser.password = hash;
              newUser.save();

              res.clearCookie("token");
              res.redirect("/");
            });
          });
        }
      })
      .catch((err) => {
        if (err) {
          res.errHandler(500, false, "Internal Server Error");
        }
      });
  } else {
    res.errHandler(400, false, "Required Inputs are wrong");
  }
};

/**
 * Controller for signin route
 *
 * @module
 * @name Controller -  signin route controller
 * @param {object} req request
 * @param {object} res response
 * @body {object} req.body email, password
 */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.errHandler(400, false, "Missing Inputs");
  } else if (isEmail(email) && password.length >= 6) {
    await User.findOne({ email })
      .then((user) => {
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
                  if (err) res.errHandler(500, false, "Internal Server Error");
                  // Disabling the httpOnly flag to test in localhost
                  // res.cookie("token", `Bearer ${token}`, { httpOnly: true });
                  res.cookie("token", `Bearer ${token}`);
                  res.status(304).redirect("/dashboard");
                }
              );
            } else {
              res.errHandler(400, false, "Wrong Password");
            }
          })
          .catch((err) => {
            if (err) res.errHandler(500, false, "Internal Server Error");
          });
      })
      .catch((err) => {
        if (err) res.errHandler(403, false, "User Not Found");
      });
  } else {
    res.errHandler(400, false, "Required Inputs are wrong");
  }
};

/**
 * Controller for signout route
 *
 * @module
 * @name Controller - signout route controller
 * @param {object} req request
 * @param {object} res response
 */
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).redirect("/");
};
