// localhost:3000/recommend/corporateImage

import React, { useState } from "react";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./corporateImage.css";

const CorporateImage = () => {
  const [companyName, setCompanyName] = useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${companyName}`);
    // TODO: 검색 로직 추가
  };

  return (
    <div className="image-recommend_wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>기업 이미지 기반 추천</h2>
        </div>
        {/* 페이지 소개글 */}
        <p>
          기업 이미지 기반 후보자 추천 페이지입니다. 먼저, 기업명을
          입력해주세요! 각 카테고리별 기업 이미지 점수를 열람할 수 있어요!
        </p>
      </header>

      <main>
        {/* 추천페이지 아이콘 */}
        <img src={RecommendIcon} alt="기업 이미지 기반 후보자 추천" />

        {/* 입력창 */}
        <div className="image-recommend_corporate-name-input-wrapper">
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="이미지 키워드 점수를 낼 기업명을 입력하세요."
          />
          <button onClick={handleSearch}>
            <img src={SearchIcon} alt="기업 이름 검색하기" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default CorporateImage;
