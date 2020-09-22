const bcrypt = require("bcryptjs");
const path = require("path");

//Import Schema
const User = require("../models/User");

//Reset
exports.reset = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/reset.html"));
};

//Reset
exports.resetPass = async (req, res) => {
  let { token, email, password1, password2 } = req.body;
  token = token.split("%20")[1];

  if (password1 === password2) {
    //Encrypt password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password1, salt, async (err, hash) => {
        if (err) throw err;
        await User.findOneAndUpdate(
          { email },
          {
            password: hash,
          }
        ).catch((err) => console.log(err));
        return res.redirect("/dash");
      });
    });
  } else {
    res
      .status(400)
      .send({ success: false, message: "Passwords are not matching" });
  }
};
