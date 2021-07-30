const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAge: {
      type: Number,
      min: 1,
      required: true,
    },
    runDistance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
