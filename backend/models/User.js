const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
    joinTime: String,

    exitTime: String,

    duration: String,

    attendance: {
      type: Boolean,
      default: false,
    },

       otp: {
      type: String,
    },

    otpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);