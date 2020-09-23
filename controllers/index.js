const path = require("path");

// Login Page (Index)
exports.index = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};
