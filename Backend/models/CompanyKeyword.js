const mongoose = require("mongoose");

const companyKeywordSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  keyword: {
    type: [String],
    default: [],
  },
});

const CompanyKeyword = mongoose.model("CompanyKeyword", companyKeywordSchema);

module.exports = CompanyKeyword;