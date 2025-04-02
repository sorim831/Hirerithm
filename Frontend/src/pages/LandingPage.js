// src/pages/LandingPage.js
import React from 'react';
import './styles/LandingPage.css';
import Banner from '../Component/Banner'; // 로그인 전 배너

function LandingPage() {
  return (
    <div className="landing-container">
      

      <section className="landing-banner">
        <div className="circle-container">
          <div className="circle small">보고서 작성</div>
          <div className="circle medium">신속성</div>
          <div className="circle large">객관성</div>
        </div>
        <div className="text-box">
          <p className="desc">하이어리즘 서비스로</p>
          <p className="strong">손 쉽게 내 적성과 꼭 맞는 기업으로 이직하기 !</p>
          <p className="sub">→ 맞춤 기업 TEST<br />→ 일반 기업, 헤드헌터에게 나의 강점 키워드 노출</p>
        </div>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      <section className="action-buttons">
        <div className="action-box">
          <img src="/images/resume-icon.png" alt="이력서" />
          <p>이력서 등록하러 가기</p>
        </div>
        <div className="action-box">
          <img src="/images/search-icon.png" alt="검색" />
          <p>맞춤 기업 TEST</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
