const jwt = require("jsonwebtoken");

/**
 * Middleware to check if a user is signed-in or not
 *
 * @name Middleware - checkAuth middleware
 * @param {object} req - the request
 * @param {object} res - the response
 * @param {Function} next - next function
 */
exports.checkAuth = async (req, res, next) => {
  const { token } = req.cookies || req.header;

  if (process.env.NODE_ENV === "test") {
    next();
  } else if (token) {
    const extractedToken = token.split(" ")[1];
    await jwt.verify(extractedToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.errHandler(500, false, "Internal Server Error");
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.errHandler(403, false, "No Token Provided");
  }
};
