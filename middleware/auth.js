const jwt = require("jsonwebtoken");

/**
 * checkAuth Middleware
 */
exports.checkAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const extractedToken = token.split(" ")[1];
    jwt.verify(extractedToken, process.env.SECRET, (err, decoded) => {
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
