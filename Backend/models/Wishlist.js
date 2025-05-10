const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  recruiter_email: {
    type: String,
    required: true,
  },
  resume_id: {
    type: String,
    required: true,
  },
  resume_data: {
    resume_id: String,
    name: String,
    age: Number,
    gender: String,
    address: String,
    phone: String,
    current_salary: Number,
    desired_salary: Number,
    keyword: String,
    filePath: String,
    education: [
      {
        school_name: String,
        major: String,
        degree: String,
        graduation_status: String,
      },
    ],
    career: [
      {
        company_name: String,
        position: String,
        description: String,
        isCurrent: Boolean,
        start_year: String,
        end_year: String,
      },
    ],
    certificates: [
      {
        certificate_name: String,
        issued_date: String,
        certificate_number: String,
      },
    ],
    skills: [
      {
        skill_name: String,
      },
    ],
    otherInfo: [
      {
        content: String,
      },
    ],
    companyTest: {
      TeamCulture: Number,
      Evaluation: Number,
      PayLevel: Number,
      VisionDirection: Number,
      Welfare: Number,
      Workload: Number,
    },
  },
});
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
