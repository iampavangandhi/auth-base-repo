const path = require("path");

// Dashboard page
exports.dash = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/dash.html"));
};
