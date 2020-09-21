require("dotenv").config({ path: "./config/config.env" });

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  });

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/dash"));

// PORT
const port = process.env.PORT || 3000;

// Starting a server
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
