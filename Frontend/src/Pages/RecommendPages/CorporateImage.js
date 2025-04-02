import React, { useState, useEffect } from "react";
import HirerithmLogo from "../../Image/logo/HirerithmLogo.svg";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";

const CorporateImage = () => {
  return (
    <div className="recommend-wrapper">
      {/* 네비게이션 */}
      <nav>
        <div className="navigation-wrapper">
          {/* 하이어리즘 로고 */}
          <div className="navigation-logo">
            <img src={HirerithmLogo} alt="하이어리즘 (Hire + Algorithm)" />
          </div>

          <div className="navigation-buttons">
            <ul>
              <li>추천</li>
              <li>DB열람</li>
              <li>마이페이지</li>
              <li>
                {/* 로그아웃 버튼 */}
                <button>로그아웃</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header>
        {/* 페이지 인덱스 */}
        <div className="page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>기업 이미지 기반 추천</h2>
        </div>

        {/* 페이지 소개글 */}
        <p>
          기업 이미지 기반 후보자 추천 페이지 입니다. 먼저, 기업명을
          입력해주세요! 각 카테고리별 기업 이미지 점수를 열람할 수 있어요!
        </p>
      </header>

      <main>
        {/* 추천페이지 아이콘 */}
        <img src={RecommendIcon} alt="기업이미지 기반 후보자 추천" />
        {/* 입력창 */}
        <div className="corporate-name-input-wrapper">
          <input placeholder="이미지 키워드 점수를 낼 기업명을 입력하세요."></input>
          <img src={SearchIcon} alt="기업 이름 검색하기" />
        </div>
        {/* 추천 키워드 & 육각형 */}
      </main>
    </div>
  );
};

export default CorporateImage;
