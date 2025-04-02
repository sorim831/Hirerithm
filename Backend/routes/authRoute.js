const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Recruiter");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// 회원가입 엔드포인트
router.post("/signup", authController.register);

// 로그인 엔드포인트
router.post("/login", authController.login);

// 아이디 중복 체크 엔드포인트
router.get("/check-id", authController.checkIdAvailability);

// 인증번호 전송 엔드포인트
router.get("/send-verification", authController.sendVerifynumber);

// 토큰 검증
router.get("/verify", authMiddleware, authController.verifyToken);

module.exports = router;
