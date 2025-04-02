const express = require("express");
const router = express.Router();
const Company = require("../models/CompanyKeyword");
const companyController = require("../controllers/companyController");


// 기업 키워드 조회 엔드포인트
router.get("/:name/keyword", companyController.getCompanyKeywords);

module.exports = router;