const path = require("path");

exports.index = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
};
