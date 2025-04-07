const mongoose = require("mongoose");

const companyKeywordSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "atmosphere",
      "promotion",
      "growth",
      "salary",
      "vision",
      "welfare",
      "workload",
    ],
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const CompanyKeyword = mongoose.model("CompanyKeyword", companyKeywordSchema);

module.exports = CompanyKeyword;
