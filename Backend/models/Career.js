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
  start_year: { type: String, required: true },
  isCurrent: { type: Boolean, required: true },
  end_year: {
    type: String,
    //required: true,
    validate: {
      validator: function (value) {
        return !value || /^\d{4}\.\d{1,2}$/.test(value);
      },
    },
  },
});

module.exports = mongoose.model("Career", careerSchema);
