const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  company_name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  start_year: { type: Date, required: true },
  end_year: { type: Date, required: true },
});

module.exports = mongoose.model("Career", careerSchema);
