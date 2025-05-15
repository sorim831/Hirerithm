const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// 이력서 업로드 엔드포인트
router.post("/upload", resumeController.uploadResume);

// 이력서 키워드 엔드포인트
router.post("/:resume_id/keyword", resumeController.keywordResume);

// 이력서 다운 엔드포인트  ( 안쓸듯? )
router.get("/download/:filename", resumeController.downloadResume);

// 이력서 리스트 엔드포인트
router.get("/list", resumeController.listResume);

// 후보자 찜하기
router.post("/wishlist/:email/:resume_id", resumeController.wishlistResume);

// 찜한 후보자 조회
router.get("/wishlist/:email", resumeController.viewwishlistResume);

// 후보자 찜 해제
router.delete(
  "/wishlist/:email/:resume_id",
  resumeController.deletewishlistResume
);

// 이력서 상세 리스트 엔드포인트
//router.get("/list/:resume_id", resumeController.detaillistResume);

module.exports = router;
