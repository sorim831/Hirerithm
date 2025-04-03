// localhost:3000/corporate_main

import React from "react";
import "./styles/CorporateMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

function CorporateMain() {
  return (
    <div className="corporate-main_container">
      {/* 네비게이션 */}
      <NotMemberNavigation />

      <section className="corporate-main_banner">
        <div className="corporate-main_circle-container">
          <div className="corporate-main_circle small">보고서 작성</div>
          <div className="corporate-main_circle medium">신속성</div>
          <div className="corporate-main_circle large">객관성</div>
        </div>
        <div c lassName="corporate-main_banner-text">
          <p className="corporate-main_highlight">하이어리즘 만의 강점?</p>
          <p className="corporate-main_quote">
            “ AI의 객관적이고 신속한 추천 ”
          </p>
        </div>
        <div className="corporate-main_dots">
          <span className="corporate-main_dot active"></span>
          <span className="corporate-main_dot"></span>
          <span className="corporate-main_dot"></span>
        </div>
      </section>
    </div>
  );
}

export default CorporateMain;
