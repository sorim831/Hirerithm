const CompanyKeyword = require("../models/CompanyKeyword");

exports.getCompanyKeywords = async (req, res) => {
  try {
    const { name } = req.params;

    const keywords = await CompanyKeyword.findOne({ company_name: name }).select("keyword -_id");


    if (!keywords.length) {
      return res.status(404).json({ message: "해당 회사의 키워드를 찾을 수 없습니다." });
    }

    res.status(200).json({ keywords });
  } catch (error) {
    console.error("기업 키워드 조회 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};