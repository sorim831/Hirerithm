// src/Pages/MainPages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import { FaUser, FaKey } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NotMeneberNavigation from "../../Component/Navigation/NotMemberNavigation";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // 로그인 성공
      alert("로그인 성공!");
      navigate("/main"); // 메인 페이지로 이동

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "로그인 실패: 서버와의 통신에 문제가 있습니다."
      );
    }
  };

  return (
    <div className="login_wrapper">
      <NotMeneberNavigation />

      <div className="login_box">
        <form onSubmit={handleLogin} className="login_flex">
          <div className="login_input-group">
            <div className="login_input-icon">
              <FaUser />
              <input
                type="email"
                placeholder="메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
            </div>
            <div className="login_input-icon">
              <FaKey />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
            </div>
          </div>

          <div className="login_btn-wrapper">
            <button type="submit" className="login_submit-right">
              로그인
            </button>
          </div>
        </form>

        <div className="login_links">
          <Link to="/find_id">아이디 찾기</Link>
          <Link to="/find_password">비밀번호 찾기</Link>
          <Link to="/signup" className="join-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
