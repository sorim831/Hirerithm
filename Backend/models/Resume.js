const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resumeId: { // 고유 아이디
    type: String,
    required: true,
    unique: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  keyword: {
    type: [String],
    default: [],
  },
  createdAt: { type: Date, required: true },
});

const Resume = mongoose.model("Resume   ", resumeSchema);

module.exports = Resume;