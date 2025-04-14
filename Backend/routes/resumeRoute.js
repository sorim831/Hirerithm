const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// 이력서 업로드 엔드포인트
router.get("/upload", resumeController.uploadResume);

module.exports = router;
