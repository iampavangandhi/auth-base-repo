const path = require("path");

/**
 * Controller for dashboard route
 *
 * @name Controller -  dashboard route controller
 * @param {object} req - the request
 * @param {object} res - the response
 */
exports.dash = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/dash.html"));
};
