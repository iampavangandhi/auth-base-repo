const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Import Schema
const User = require("../models/User");

//Signup
exports.signup = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Email Already There" });
    } else {
      const newUser = new User(req.body);

      //Encrypt password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().catch((err) => console.log(err));
          res.clearCookie("token");
          res.redirect("/");
        });
      });
    }
  });
};

//Signin
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "User Not Found" });
      } else {
        res.clearCookie("token");
        //Compare passwords using bcrypt
        bcrypt
          .compare(password, user.password)
          .then((isSame) => {
            if (isSame) {
              //Use payload and create token for user
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
                  res.cookie("token", "Bearer " + token);
                  res.redirect("/dash");
                }
              );
            } else {
              return res.status(400).json({ msg: "Wrong Password" });
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

//Signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
