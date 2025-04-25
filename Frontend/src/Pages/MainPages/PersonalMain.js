// localhost:3000/user

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import ResumeRegistrationIcon from "../../Image/Icon/ResumeRegistrationIcon.svg";
import CustomCorporateTestIcon from "../../Image/Icon/CustomCorporateTestIcon.svg";

// 이미지 불러오기
import img1 from "../../Image/Mainbanner/배너이미지1.png";
import img2 from "../../Image/Mainbanner/배너이미지1.png";
import img3 from "../../Image/Mainbanner/배너이미지1.png";

const images = [img1, img2, img3];

function PersonalMain() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // 10초마다 이미지 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="personal-main_container">
      {/* 네비게이션바 */}
      <NotMemberNavigation />

      {/* 배너 이미지 */}
      <div className="banner">
        <img src={images[currentIndex]} alt={`배너 ${currentIndex + 1}`} />
        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
            ></span>
          ))}
        </div>
      </div>

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
        <div className="button-wrapper">
          <button
            className="test-button"
            onClick={() => navigate("/nonmember/companytest")}
          >
            <img src={CustomCorporateTestIcon} alt="🔎" />
            <p>맞춤 기업 TEST</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalMain;
