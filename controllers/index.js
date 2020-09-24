const path = require("path");

/**
 * controller for index route
 *
 * @name Controller - index route controller
 * @param {object} req - the request
 * @param {object} res - the response
 */
exports.index = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};
