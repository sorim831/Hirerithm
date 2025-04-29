// localhost:3000/user

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import ResumeRegistrationIcon from "../../Image/Icon/ResumeRegistrationIcon.svg";
import BannerImage from "../../Image/Mainbanner/BannerImage.png";

function PersonalMain() {
  const navigate = useNavigate();

  return (
    <div className="personal-main_container">
      {/* 네비게이션바 */}
      <NotMemberNavigation />

      {/* 배너 이미지 */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>

      {/* 이력서 등록 / 맞춤기업 테스트 이동 버튼 */}
      <div className="button-section">
        <div className="button-wrapper">
          <button
            className="resume-button"
            onClick={() => {
              console.log("이력서 버튼 클릭됨");
              navigate("/resume_registration");
            }}
          >
            <img src={ResumeRegistrationIcon} alt="📄" />
            <p>이력서 등록하러 가기</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalMain;
