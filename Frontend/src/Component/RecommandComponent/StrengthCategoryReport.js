import React, { useState } from "react";
import StrengthCoverPage from "./StrengthCoverPage";
import ReportCandidatePage from "./ReportCandidatePage";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import "./strengthCategoryReport.css";

const RecommandReport = ({ onBack, resultsSummary, candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 추천된 후보자 수만큼 페이지 생성
  const totalPages = 1 + resultsSummary.length;

  const renderReportContent = () => {
    if (currentPage === 1) {
      return <StrengthCoverPage summary={resultsSummary[0]} />;
    } else {
      const candidate = candidates[currentPage - 2];
      return <ReportCandidatePage candidate={candidate} />;
    }
  };

  return (
    <div className="image-recommend-result_second-page">
      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend-result_page-index-wrapper">
          <img src={DownloadIcon} alt="-" />
          <h2>추천 결과 기반 보고서</h2>
        </div>
      </header>

      <main>
        {/* pdf 파일 다운로드 받기 버튼 */}
        <button className="image-recommend-result_download-button">
          <img src={DownloadIcon} alt="다운로드" />
          <span>다운로드 (pdf 형식)</span>
        </button>

        {/* 보고서 내용 */}
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

        {/* 뒤로가기 버튼 */}
        <button className="report-back-button" onClick={onBack}>
          <img src={LeftArrow} alt="뒤로가기" />
          <span>기업 이미지 점수 화면</span>
        </button>
      </main>
    </div>
  );
};

export default RecommandReport;
