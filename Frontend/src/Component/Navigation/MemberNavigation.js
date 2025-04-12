import React from "react";
import HirerithmLogo from "../../Image/logo/HirerithmLogo.svg";
import "./navigation.css";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_info_id");

    // 메인 페이지로 이동
    navigate("/");
  };

  return (
    <nav className="navigation-wrapper">
      {/* 하이어리즘 로고 */}
      <div className="navigation-logo" onClick={() => navigate("/")}>
        <img src={HirerithmLogo} alt="하이어리즘 (Hire + Algorithm)" />
      </div>

      {/* 페이지이동 버튼들 */}
      <div className="navigation-buttons">
        <button onClick={() => navigate("/recommend_strength")}>추천</button>
        <button onClick={() => navigate("/full_view")}>DB열람</button>
        <button onClick={() => navigate("/my_page")}>마이페이지</button>
        {/* 로그아웃 버튼 */}
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </nav>
  );
};

export default Navigation;
