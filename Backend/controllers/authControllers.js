require("dotenv").config(); // 환경변수 로드
const User = require("../models/Recruiter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("로그인 요청 도착:", req.body);
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "등록되지 않은 사용자입니다." });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "비밀번호가 잘못되었습니다." });
      }
      const token = jwt.sign(
        { userEmail: user.email, userRole: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.log(token);
      res.status(200).json({ token, userEmail: user.email });
    } catch (error) {
      res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  };