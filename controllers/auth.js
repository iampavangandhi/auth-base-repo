const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmail, isAlpha } = require("validator");

// Import Schema
const User = require("../models/User");

// Signup
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (isAlpha(name) && isEmail(email)) {
    User.findOne({ email }).then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, msg: "Email Already There" });
      } else {
        const newUser = new User(req.body);

        // Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().catch((err) => {
              return res.status(500).json({ success: false, msg: err });
            });
            res.clearCookie("token");
            res.redirect("/");
          });
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ success: false, msg: "Required Input fields are wrong" });
  }
};

// Signin
exports.signin = (req, res) => {
  const { email, password } = req.body;

  if (isEmail(email)) {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ success: false, msg: "User Not Found" });
        } else {
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
                    res.cookie("token", `Bearer ${token}`);
                    // Disabling the httpOnly flag to test in localhost
                    //res.cookie("token", `Bearer ${token}`, { httpOnly: true });
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
              return res.status(500).json({ success: false, msg: err });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({ success: false, msg: err });
      });
  } else {
    res.status(400).json({ success: false, msg: "Required Fields Missing" });
  }
};

// Signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
