import React, { useState } from "react";
import HirerithmLogo from "../../Image/logo/HirerithmLogo.svg";
import "./navigation.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const [hoverMenu, setHoverMenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_info_id");
    navigate("/");
  };

  return (
    <nav className="navigation-wrapper">
      <div className="navigation-logo" onClick={() => navigate("/")}>
        <img src={HirerithmLogo} alt="하이어리즘 (Hire + Algorithm)" />
      </div>

      <div className="navigation-buttons">
        {/* 추천 */}
        <div
          className="nav-item"
          onMouseEnter={() => setHoverMenu("recommend")}
          onMouseLeave={() => setHoverMenu(null)}
        >
          <button className={isActive("/recommend_strength") ? "active" : ""}>
            추천
          </button>
          {hoverMenu === "recommend" && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => navigate("/recommend_strength")}
              >
                강점 기반 추천
              </div>
              <div
                className="dropdown-item"
                onClick={() => navigate("/recommend_company")}
              >
                기업 이미지 기반 추천
              </div>
            </div>
          )}
        </div>

        {/* DB열람 */}
        <div
          className="nav-item"
          onMouseEnter={() => setHoverMenu("full_view")}
          onMouseLeave={() => setHoverMenu(null)}
        >
          <button className={isActive("/full_view") ? "active" : ""}>
            DB열람
          </button>
          {hoverMenu === "full_view" && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => navigate("/full_view")}
              >
                메인
              </div>
            </div>
          )}
        </div>

        {/* 마이페이지 */}
        <div
          className="nav-item"
          onMouseEnter={() => setHoverMenu("mypage")}
          onMouseLeave={() => setHoverMenu(null)}
        >
          <button className={isActive("/my_page") ? "active" : ""}>
            마이페이지
          </button>
          {hoverMenu === "mypage" && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => navigate("/my_page")}
              >
                내 정보
              </div>
              <div
                className="dropdown-item"
                onClick={() => navigate("/my_page/favorites")}
              >
                찜 목록
              </div>
            </div>
          )}
        </div>

        {/* 로그아웃 */}
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </nav>
  );
};

export default Navigation;
