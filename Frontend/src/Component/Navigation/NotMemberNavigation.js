import React from "react";
import HirerithmLogo from "../../Image/logo/HirerithmLogo.svg";
import "./navigation.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation-wrapper">
      {/* 하이어리즘 로고 */}
      <div className="navigation-logo" onClick={() => navigate("/")}>
        <img src={HirerithmLogo} alt="하이어리즘 (Hire + Algorithm)" />
      </div>

      {/* 페이지이동 버튼들 */}
      <div className="navigation-buttons">
        <button
          className={isActive("/user") ? "active" : ""}
          onClick={() => navigate("/user")}
        >
          개인
        </button>
        <button
          className={isActive("/") ? "active" : ""}
          onClick={() => navigate("/")}
        >
          기업회원
        </button>
        <button
          className={isActive("/headhunter") ? "active" : ""}
          onClick={() => navigate("/headhunter")}
        >
          헤드헌터
        </button>
        <button
          className={isActive("/login") ? "active" : ""}
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
