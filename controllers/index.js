const path = require("path");

/**
 * Controller for index route
 *
 * @module
 * @name Controller - index route controller
 * @param {object} req request
 * @param {object} res response
 */
exports.index = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};
