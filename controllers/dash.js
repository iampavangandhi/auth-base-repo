const path = require("path");

/**
 * Controller for dashboard route
 *
 * @module
 * @name Controller -  dashboard route controller
 * @param {object} req request
 * @param {object} res response
 */
exports.dash = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/dash.html"));
};
