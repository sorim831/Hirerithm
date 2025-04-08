// localhost:3000/nonmember/companytest

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendIcon from "../../Image/Icon/RecommendIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import NonMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import "./CompanyTest.css";


const CompanyTest = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;
  // REACT_APP_BACKEND_ADDRESS=http://localhost:5000 << .env 파일에 추가
  

  const handleSearch = async () => {
    console.log(`Searching for: ${companyName}`);
    // TODO: 검색 로직 추가
    try {
      const res = await axios.get(
        `${address}}/company/${companyName}/keyword`
      );
      // 결과 페이지로 데이터 넘기기
      navigate("/recommend/corporateImageResult", {
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
      <NonMemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>맞춤기업 TEST</h2>
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

export default CompanyTest;
