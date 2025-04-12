// localhost:3000/nonmember/companytest/result

import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import axios from "axios";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import DownloadIcon from "../../Image/Icon/download.svg";
import NonMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import "./CompanyTestResult.css";

const CompanyTestResult = () => {
  //const navigate = useNavigate();
  //const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const handleDownload = async () => {
    // TODO : pdf 다운
    alert("ㅎㅇ");
  };

  return (
    <div className="image-recommend_wrapper">
      <NonMemberNavigation />

      <header>
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>맞춤기업 TEST 결과</h2>
        </div>
        <p>
          : 결과 pdf 파일을 이력서에 포함시키면, 나와 잘 맞는 기업과 매칭될
          확률이 올라가요 !{" "}
        </p>
      </header>
      <main className="company-test-result_main">
        <button className="download-btn" onClick={handleDownload}>
          다운로드 (pdf 형식)
          <img src={DownloadIcon} className="download-icon" alt="-" />
        </button>

        <div className="pdf-preview">
          <div className="pdf-preview-header">
            <span>맞춤기업 TEST 결과 문서</span>
          </div>
          <div className="pdf-preview-content">
            <h3>나의 맞춤기업 TEST 검사 결과</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyTestResult;
