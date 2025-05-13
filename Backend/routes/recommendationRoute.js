const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationyController");


// 후보차 추천 엔드포인트
router.get("/candidate", recommendationController.recommendCandidate);

module.exports = router;