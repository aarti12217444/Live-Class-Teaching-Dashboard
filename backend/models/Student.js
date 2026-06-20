const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,

  status: {
    type: String,
    default: "online",
  },

  handRaised: {
    type: Boolean,
    default: false,
  },

  attendance: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "Student",
  studentSchema
);