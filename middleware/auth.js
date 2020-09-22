const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  let token = req.cookies.token;

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send({
          success: false,
          message: "Failed to authenticate user.",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "No Token Provided." });
  }
};
