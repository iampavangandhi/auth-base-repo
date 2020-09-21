const path = require("path");

exports.dash = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dash.html"));
};
