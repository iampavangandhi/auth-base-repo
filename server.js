/**
 * @file server.js is the root file for this app
 * @see {@link https://github.com/iampavangandhi/auth-base-repo/tree/auth-setup}
 */

// Config
require("dotenv").config({ path: "./config/config.env" });

// Includes
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

let databaseUri = process.env.DATABASE;

const app = express();

// Logging
app.use(morgan("dev"));

// Method override
const methodOverrideFunc = (req) => {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
};

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride(methodOverrideFunc));

// Switching to TEST DB
if (process.env.NODE_ENV === "test") {
  databaseUri = process.env.DATABASETEST;
}

// DB Connection
mongoose
  .connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info("Database Connected Successfully");
  });

// error handler middleware
app.use((req, res, next) => {
  res.errHandler = (statusCode, success, message) => {
    return res.status(statusCode).json({ success, message });
  };
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/reset"));

// PORT
const port = process.env.PORT || 3000;

// Starting a server
module.exports = app.listen(port, () => {
  console.info(`Server is running in ${process.env.NODE_ENV} at ${port}`);
});
