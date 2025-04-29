// localhost:3000/user

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import ResumeRegistrationIcon from "../../Image/Icon/ResumeRegistrationIcon.svg";
import BannerImage from "../../Image/Mainbanner/BannerImage.png";
import UpAnimation from "../../Image/Icon/UpAnimation.svg";
import DownAnimation from "../../Image/Icon/DownAnimation.svg";

function PersonalMain() {
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const buttonSectionRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isTop, setIsTop] = useState(true);
  const downButtonRef = useRef(null);
  const upButtonRef = useRef(null);

  const triggerClickAnimation = (ref) => {
    if (!ref.current) return;
    ref.current.classList.add("clicked-animation");
    setTimeout(() => {
      ref.current.classList.remove("clicked-animation");
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      const bannerTop = bannerRef.current?.getBoundingClientRect().top ?? 0;
      const buttonTop =
        buttonSectionRef.current?.getBoundingClientRect().top ?? 0;

      setIsTop(window.scrollY < 50);

      // ↓ 버튼 애니메이션
      if (buttonTop < window.innerHeight / 2 && buttonTop > -200) {
        triggerClickAnimation(downButtonRef);
      }

      // ↑ 버튼 애니메이션
      if (bannerTop < window.innerHeight / 2 && bannerTop > -200) {
        triggerClickAnimation(upButtonRef);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="personal-main_container">
      {/* 네비게이션 바 */}
      <NotMemberNavigation />

      {/* 배너 이미지 */}
      <motion.div
        ref={bannerRef}
        className="banner"
        style={{ backgroundImage: `url(${BannerImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={`banner-button-wrapper ${isTop ? "tight" : ""}`}>
          <button
            ref={downButtonRef}
            className="scroll-button"
            onClick={() => scrollToSection(buttonSectionRef)}
          >
            <motion.img
              src={DownAnimation}
              alt="↓ 이력서 등록하러 가기"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </button>
        </div>
      </motion.div>

      {/* 이력서 등록 버튼 화면 */}
      <div ref={buttonSectionRef} className="button-section">
        <div className="section-top-button-wrapper">
          <button
            ref={upButtonRef}
            className="scroll-button"
            onClick={() => scrollToSection(bannerRef)}
          >
            <motion.img
              src={UpAnimation}
              alt="↑ 배너로 돌아가기"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className="resume-button"
            onClick={() => {
              console.log("이력서 버튼 클릭됨");
              navigate("/user/resume");
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
