import React from "react";
import HirerithmLogo from "../../Image/logo/HirerithmLogo.svg";
import "./navigation.css";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <nav className="navigation-wrapper">
      {/* 하이어리즘 로고 */}
      <div className="navigation-logo">
        <img src={HirerithmLogo} alt="하이어리즘 (Hire + Algorithm)" />
      </div>
      <div className="navigation-buttons">
        <button>개인</button>
        <button>기업회원</button>
        <button>헤드헌터</button>
        <button onClick={handleLogout}>로그인</button>
      </div>
    </nav>
  );
};

export default Navigation;
