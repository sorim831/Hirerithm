// src/Pages/MainPages/PersonalMain.jsx

import React, { useState, useEffect } from "react";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

// 이미지 불러오기
import img1 from "../../Image/Mainbanner/배너이미지1.png";
import img2 from "../../Image/Mainbanner/배너이미지1.png";
import img3 from "../../Image/Mainbanner/배너이미지1.png";

const images = [img1, img2, img3];

function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="landing-container">
      <NotMemberNavigation />

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
    </div>
  );
}

export default LandingPage;
