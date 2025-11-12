import express from "express";
import * as resumeController from "../controllers/resumeController";
const router = express.Router();

// 이력서 업로드 엔드포인트
router.post("/upload", resumeController.uploadResume);

// 이력서 키워드 추출
router.post("/:resume_id/keyword", resumeController.keywordResume);

// 이력서 저장
router.post("/download/:resume_id.pdf", resumeController.downloadResume);

router.get("/downloada/:resume_id", resumeController.serveResumePDF);

// 이력서 리스트 조회
router.get("/list", resumeController.listResume);

// 후보자 찜하기
router.post("/wishlist/:email/:resume_id", resumeController.wishlistResume);

// 찜한 후보자 조회
router.get("/wishlist/:email", resumeController.viewwishlistResume);

// 찜 해제
router.delete(
  "/wishlist/:email/:resume_id",
  resumeController.deletewishlistResume
);

// 인기순 정렬
router.get("/wishlist/sort/popular", resumeController.sortPopularResume);

// 최신순 정렬
router.get("/wishlist/sort/latest", resumeController.sortLatestResume);

// 이력서 상세 보기
router.post("/detail", resumeController.detailResume);

export default router;
