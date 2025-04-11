// localhost:3000/recommend_strength

import React, { useState } from "react";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import AiIcon from "../../Image/Icon/AiIcon.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./strengthCategory.css";
import { useNavigate } from "react-router-dom";

const StrengthCategory = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${companyName}`);
    // TODO: 검색 로직 추가
  };

  return (
    <div className="strength-category_wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="strength-category_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>강점 카테고리 기반 추천</h2>
        </div>
        {/* 페이지 소개글 */}
        <p>
          강점 카테고리 기반 후보자 추천 페이지입니다. 원하는 후보자의 강점을
          줄글로 적어주세요! 줄글을 바탕으로 강점 키워드가 추출되고, 강점에 맞는
          후보자를 추천받을 수 있어요!
        </p>
      </header>

      <main>
        {/* 추천페이지 아이콘 */}
        <img
          src={RecommendIcon}
          className="recommend-icon"
          alt="기업 이미지 기반 후보자 추천"
        />

        {/* 입력창 */}
        <div className="strength-category_input-wrapper">
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="보고서에 들어갈 기업명을 입력하세요."
          />
        </div>

        <div className="strength-category_textarea-wrapper">
          <textarea
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="원하는 후보자 강점을 줄글로 작성하세요."
          />
        </div>

        <button
          className="strength-category_result-button"
          onClick={() => navigate("/recommend_strength/result")}
        >
          <img src={AiIcon} className="ai-icon" alt="-" />
          <span>추출된 강점 키워드 확인하기</span>
        </button>
      </main>
    </div>
  );
};

export default StrengthCategory;
