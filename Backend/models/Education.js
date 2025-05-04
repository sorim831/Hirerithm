const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  //start_year: { type: Number, required: true },
  //end_year: { type: Number, required: true },
  school_name: { type: String, required: true },
  major: { type: String, required: true },
  degree: { type: String, enum: ["학사", "석사", "박사", ""], default: "" },
  graduation_status: {
    type: String,
    enum: ["졸업", "재학", "휴학", "중퇴"],
    required: true,
  },
});

module.exports = mongoose.model("Education", educationSchema);
