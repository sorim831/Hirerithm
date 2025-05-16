// localhost:3000/recommend_company

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import AiIcon from "../../Image/Icon/AiIcon.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./corporateImage.css";
import CheckIcon from "../../Image/Icon/CheckIcon.svg";

const CorporateImage = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;
  // REACT_APP_BACKEND_ADDRESS=http://localhost:5000 << .env 파일에 추가

  const handleSearch = async () => {
    console.log(`Searching for: ${companyName}`);
    // TODO: 검색 로직 추가
    try {
      const res = await axios.get(`${address}/company/${companyName}/keyword`);
      // 결과 페이지로 데이터 넘기기  navigate("/recommend/corporateImageResult"
      navigate("/recommend_company/result_copy", {
        state: { companyName, data: res.data },
      });
    } catch (err) {
      alert("기업 정보를 찾을 수 없습니다.");
      console.error(err);
    }
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
          기업 이미지 기반 후보자 추천 페이지입니다. 기업명을 입력해주세요! 각
          카테고리별 기업 이미지 점수를 열람할 수 있어요!
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
        <div className="image-recommend_corporate-name-input-wrapper">
          <label>
            <img src={CheckIcon} alt="✔" /> 기업명
          </label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="예) 네이버, 카카오, 토스"
          />
        </div>

        <button
          className="image-recommend_result-button"
          onClick={() => navigate("/recommend_company/result")}
        >
          <img src={AiIcon} className="ai-icon" alt="-" />
          <span>AI의 추천 결과 확인하기</span>
        </button>
      </main>
    </div>
  );
};

export default CorporateImage;
