// src/pages/MainPage.js
import React from 'react';
import '../App.css';

function MainPage() {
  return (
    <div className="main-container">
      <section className="banner">
        <div className="circle-container">
          <div className="circle small">보고서 작성</div>
          <div className="circle medium">신속성</div>
          <div className="circle large">객관성</div>
        </div>
        <div className="banner-text">
          <p className="highlight">하이어리즘 만의 강점?</p>
          <p className="main-quote">“ AI의 객관적이고 신속한 추천 ”</p>
        </div>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
