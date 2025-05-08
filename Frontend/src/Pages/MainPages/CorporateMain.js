import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import ResumeRegistrationIcon from "../../Image/Icon/ResumeRegistrationIcon.svg";
import UpAnimation from "../../Image/Icon/UpAnimation.svg";
import DownAnimation from "../../Image/Icon/DownAnimation.svg";
import DownAnimation2 from "../../Image/Icon/DownAnimation2.svg";
import BannerImage1 from "../../Image/Image/005.jpg";
import BannerImage2 from "../../Image/Image/006.jpg";
import BannerImage3 from "../../Image/Image/007.jpg";
import BannerImage4 from "../../Image/Image/008.jpg";
import BannerImage5 from "../../Image/Image/011.jpg";

const bannerData = [
  { image: BannerImage1, downIcon: DownAnimation },
  { image: BannerImage2, downIcon: DownAnimation2 },
  { image: BannerImage3, downIcon: DownAnimation2 },
  { image: BannerImage4, downIcon: DownAnimation2 },
  { image: BannerImage5, downIcon: null }, // 마지막 슬라이드는 up 버튼만
];

function CorporateMain() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const maxPage = bannerData.length - 1;

  const goNext = () => setPage((p) => Math.min(p + 1, maxPage));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div className="personal-main_container">
      <NotMemberNavigation />
      <motion.div
        className="slides-wrapper"
        animate={{ y: `-${page * 100}vh` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {bannerData.map((banner, index) => (
          <section
            key={index}
            className="banner"
            style={{
              backgroundColor: index === 0 ? "#f2fff7" : "#E6EFEB",
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              aspectRatio: "16 / 9",
            }}
          >
            {/* ↑ 이전으로 버튼 (첫 페이지 제외) */}
            {index !== 0 && (
              <div className="banner-top-button-wrapper">
                <button className="up-scroll-button" onClick={goPrev}>
                  <motion.img src={UpAnimation} alt="↑ 이전으로" />
                </button>
              </div>
            )}

            <div className="banner-button-wrapper">
              {/* ↓ 다음으로 버튼 (마지막 제외) */}
              {index !== maxPage && (
                <button className="down-scroll-button" onClick={goNext}>
                  <motion.img
                    src={banner.downIcon}
                    alt="↓ 다음으로"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </button>
              )}

              {/* 마지막 배너 → 이력서 등록 + ↑ 버튼 */}
              {index === maxPage && (
                <>
                  <button
                    className="resume-button"
                    onClick={() => navigate("/user/resume")}
                  >
                    <img src={ResumeRegistrationIcon} alt="📄" />
                    <p>이력서 등록하러 가기</p>
                  </button>
                </>
              )}
            </div>
          </section>
        ))}
      </motion.div>
    </div>
  );
}

export default CorporateMain;
