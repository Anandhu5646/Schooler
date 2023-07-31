const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
  },
  facultyId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const timeTableModel = mongoose.model("timeTable", timeTableSchema);

module.exports = timeTableModel;
