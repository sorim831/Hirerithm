const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resume_id: {
    // 고유 아이디
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
  birth_date: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["남성", "여성"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  current_salary: {
    type: Number,
    required: true,
  },
  desired_salary: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, required: true },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
