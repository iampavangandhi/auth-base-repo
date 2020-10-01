const path = require("path");

/**
 * Controller for dashboard route
 *
 * @module
 * @name Controller - dashboard route controller
 * @param {object} req request
 * @param {object} res response
 */
exports.dashboard = (req, res) => {
  const { token } = req.cookies;

  res
    .status(200)
    .set("token", token)
    .sendFile(path.join(__dirname, "../public/dashboard.html"));
};
