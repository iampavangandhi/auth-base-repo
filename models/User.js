const mongoose = require("mongoose");

/**
 * User Model
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      trim: true,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Please enter a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
