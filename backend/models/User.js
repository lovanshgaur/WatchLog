const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    avatar:{
        type: String,
        default: 'avatar.jpg',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
