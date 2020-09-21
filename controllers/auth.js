const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Import Schema
const User = require("../models/User");

//Signup
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "email already there" });
    } else {
      const newUser = new User(req.body);

      //Encrypt password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });

      // res.redirect("/");
    }
  });
};

//Signin
exports.signin = (req, res) => {
  const { email, password } = req.body;
  res.redirect("/dash");
};

//Reset
exports.reset = (req, res) => {
  const { token, email, password1, password2 } = req.body;
  res.redirect("/");
};

//Signout
exports.signout = (req, res) => {
  res.redirect("/");
};
