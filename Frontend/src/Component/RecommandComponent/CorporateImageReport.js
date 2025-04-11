import React, { useState } from "react";
import "./corporateImageReport.css";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import CorporateImageCoverPage from "./CorporateImageCoverPage";
import ReportCandidatePage from "./ReportCandidatePage";

const CorporateImageReport = ({ onBack, resultsSummary, candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1 + candidates.length;

  const renderReportContent = () => {
    if (currentPage === 1) {
      return <CorporateImageCoverPage summary={resultsSummary[0]} />;
    } else {
      const candidate = candidates[currentPage - 2];
      return <ReportCandidatePage candidate={candidate} />;
    }
  };

  return (
    <div className="image-recommend-result_second-page">
      <header>
        <div className="image-recommend-result_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>추천 결과 기반 보고서</h2>
        </div>
      </header>

      <main>
        {/* 다운로드 버튼 */}
        <button className="image-recommend-result_download-button">
          <img src={DownloadIcon} className="download-icon" alt="다운로드" />
          <span className="download-text">다운로드 (pdf 형식)</span>
        </button>

        {/* 현재 페이지 렌더링 */}
        {renderReportContent()}

        {/* 페이지네이션 */}
        <div className="report-pagination-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            다음
          </button>
        </div>

        {/* 뒤로가기 */}
        <button className="report-back-button" onClick={onBack}>
          <img src={LeftArrow} alt="뒤로가기" className="back-icon" />
          <span className="back-text">기업 이미지 점수 화면</span>
        </button>
      </main>
    </div>
  );
};

export default CorporateImageReport;
