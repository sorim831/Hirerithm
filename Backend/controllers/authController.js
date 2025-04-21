require("dotenv").config(); // 환경변수 로드
const User = require("../models/Recruiter");
const VerificationCode = require("../models/verificationCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 회원가입
exports.register = async (req, res) => {
  try {
    // 인증번호 없이 받도록 수정
    const { name, email, password, phone, role, company_name } = req.body;

    if (!name || !email || !password || !phone || !role || !company_name) {
      return res
        .status(400)
        .json({ success: false, message: "모든 필드를 입력해주세요." });
    }

    // 인증번호 검증 제거
    /*
    const { verify_code } = req.body;
    const validCode = await VerificationCode.findOne({ phone, verify_code });
    if (!validCode) {
      return res.status(400).json({ success: false, message: "인증번호가 올바르지 않습니다." });
    }
    */

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password_hash: hashedPassword,
      phone,
      role,
      company_name,
    });

    await newUser.save();

    // 인증번호 삭제 제거
    // await VerificationCode.deleteOne({ phone });

    return res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다.",
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다(회원가입).",
    });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("로그인 요청 도착:", req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ error: "등록되지 않은 사용자입니다." });
    }
    if (!(await bcrypt.compare(password, user.password_hash))) {
      return res.status(400).json({ error: "비밀번호가 잘못되었습니다." });
    }

    const token = jwt.sign(
      { userEmail: user.email, userRole: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(token);
    res.status(200).json({ token, userEmail: user.email });
  } catch (error) {
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};

// 이메일 중복 체크
exports.checkIdAvailability = async (req, res) => {
  console.log("중복 확인 요청:", req.body); // 로그 확인용
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "이메일을 입력해주세요." });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(200).json({ available: true });
  }

  return res.status(200).json({ available: false });
};

// 인증번호 전송
exports.sendVerifynumber = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "전화번호를 입력해주세요." });
    }

    const verifyCode = "123456"; // 임시 인증번호

    await VerificationCode.deleteOne({ phone });

    const newCode = new VerificationCode({
      phone,
      code: verifyCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await newCode.save();

    return res
      .status(200)
      .json({ message: "인증번호가 전송되었습니다.", verifyCode });
  } catch (error) {
    console.error("인증번호 전송 오류:", error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 아이디 찾기
exports.findId = async (req, res) => {
  try {
    const { name, phone, verify_code } = req.body;

    const validCode = await VerificationCode.findOne({ phone, verify_code });
    if (!validCode) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 올바르지 않습니다." });
    }

    const user = await User.findOne({ name, phone });
    if (!user) {
      return res
        .status(404)
        .json({ message: "일치하는 사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("아이디 찾기 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 비밀번호 찾기
exports.findPassword = async (req, res) => {
  try {
    const { email, phone, verify_code } = req.body;

    const validCode = await VerificationCode.findOne({ phone, verify_code });
    if (!validCode) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 올바르지 않습니다." });
    }

    await VerificationCode.deleteOne({ phone });

    const user = await User.findOne({ email, phone });
    if (!user) {
      return res
        .status(404)
        .json({ message: "일치하는 사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "비밀번호 재설정 페이지로 이동.", email });
  } catch (error) {
    console.error("비밀번호 찾기 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 비밀번호 재설정
exports.resetPassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "해당 이메일의 사용자를 찾을 수 없습니다." });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("비밀번호 재설정 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 토큰 검증
exports.verifyToken = (req, res) => {
  console.log("verifyToken 실행됨, req.decoded:", req.decoded);
  res.status(200).json({ success: true, user: req.decoded });
};
