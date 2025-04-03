// localhost:3000

import React from "react";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* 네비게이션 */}
      <NotMemberNavigation />

      <section className="personal-main_banner">
        <div className="personal-main_circle-container">
          <div className="personal-main_circle small">보고서 작성</div>
          <div className="personal-main_circle medium">신속성</div>
          <div className="personal-main_circle large">객관성</div>
        </div>
        <div className="personal-main_text-box">
          <p className="personal-main_desc">하이어리즘 서비스로</p>
          <p className="personal-main_strong">
            손 쉽게 내 적성과 꼭 맞는 기업으로 이직하기 !
          </p>
          <p className="personal-main_sub">
            → 맞춤 기업 TEST
            <br />→ 일반 기업, 헤드헌터에게 나의 강점 키워드 노출
          </p>
        </div>
        <div className="personal-main_dots">
          <span className="personal-main_dot active"></span>
          <span className="personal-main_dot"></span>
          <span className="personal-main_dot"></span>
        </div>
      </section>

      <section className="personal-main_action-buttons">
        <div className="personal-main_action-box">
          <img src="/images/resume-icon.png" alt="이력서" />
          <p>이력서 등록하러 가기</p>
        </div>
        <div className="personal-main_action-box">
          <img src="/images/search-icon.png" alt="검색" />
          <p>맞춤 기업 TEST</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
