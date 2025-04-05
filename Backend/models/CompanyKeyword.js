const mongoose = require("mongoose");

const companyKeywordSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  atmosphere_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  promotion_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  growth_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  salary_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  vision_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  welfare_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  workload_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});

const CompanyKeyword = mongoose.model("CompanyKeyword", companyKeywordSchema);

module.exports = CompanyKeyword;
