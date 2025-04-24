const mongoose = require("mongoose");

const CompanyTestSchema = new mongoose.Schema({
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  scores: {
    TeamCulture: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    Evaluation: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    PayLevel: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    VisionDirection: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    Welfare: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    Workload: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
});

module.exports = mongoose.model("CompanyTest", CompanyTestSchema);
