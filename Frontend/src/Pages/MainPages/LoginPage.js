// localhost:3000/login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import { FaUser, FaKey } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NotMeneberNavigation from "../../Component/Navigation/NotMemberNavigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@test.com" && password === "1234") {
      navigate("/main");
    } else {
      alert("로그인 정보가 일치하지 않습니다.");
    }
  };

  return (
    <div className="login_wrapper">
      {/* 네비게이션 */}
      <NotMeneberNavigation />

      <div className="login_box">
        <form onSubmit={handleLogin}>
          <div className="login_input-icon">
            <FaUser />
            <input
              type="email"
              placeholder="메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
            />
          </div>
          <button type="submit" className="login_submit">
            로그인
          </button>
        </form>
        <div className="login_links">
          <Link to="/find-id">아이디 찾기</Link>
          <Link to="/find-password">비밀번호 찾기</Link>
          <Link to="/signup" className="login_join-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
