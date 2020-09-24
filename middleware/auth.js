const jwt = require("jsonwebtoken");

/**
 * Middleware to check if a user is signed-in or not
 *
 * @name Middleware - checkAuth middleware
 * @param {object} req - the request
 * @param {object} res - the response
 * @param {Function} next - next function
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
