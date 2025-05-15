// localhost:3000/recommend_strength

import React, { useState } from "react";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import AiIcon from "../../Image/Icon/AiIcon.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./strengthRecommend.css";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../Image/Icon/CheckIcon.svg";

const StrengthRecommend = () => {
  const navigate = useNavigate();

  return (
    <div className="strength-category_wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="strength-category_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>강점 기반 추천</h2>
        </div>

        {/* 페이지 소개글 */}
        <p>
          강점 기반 후보자 추천 페이지입니다. 필수조건과 우대사항을 자유로운
          형식으로 작성하고, 원하는 인재를 찾아보세요!
        </p>
      </header>

      <main>
        {/* 추천페이지 아이콘 */}
        <img
          src={RecommendIcon}
          className="recommend-icon"
          alt="강점 기반 후보자 추천"
        />

        {/* 입력창 */}
        <div className="strength-category_textarea-wrapper">
          <li>
            <label>
              <img src={CheckIcon} alt="✔" /> SKILLS
            </label>
            <input placeholder="예) React, Node.js, MongoDB, Docker, AWS" />
          </li>
          <li>
            <label>
              <img src={CheckIcon} alt="✔" /> 필수조건
            </label>
            <textarea
              placeholder="예) - React, Node.js 등 웹 개발 프레임워크 활용 경험
              - Git 등 형상 관리 도구 사용 가능
              - RESTful API 설계 및 연동 경험
              - 기본적인 DB 설계 및 쿼리 작성 능력"
              rows="4"
              cols="50"
            ></textarea>
          </li>
          <li>
            <label>
              <img src={CheckIcon} alt="✔" /> 우대사항
            </label>
            <textarea
              placeholder="예) - TypeScript 사용 경험
              - 클라우드(AWS, GCP 등) 환경에서의 개발 경험
              - CI/CD 파이프라인 구축 경험
              - 오픈소스 프로젝트 참여 경험"
              rows="5"
              cols="50"
            ></textarea>{" "}
          </li>
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

export default StrengthRecommend;
