import React, { useState, useRef } from "react";
import StrengthCoverPage from "./StrengthCoverPage";
import ReportCandidatePage from "./ReportCandidatePage";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./strengthCategoryReport.css";

const StrengthCategoryReport = ({ onBack, resultsSummary, candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef(); // 캡처 대상 ref
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false); // 다운로드 중 상태 관리

  // 추천된 후보자 수만큼 페이지 생성
  const totalPages = 1 + resultsSummary.length;

  // 선택한 페이지에 따라 적절한 컴포넌트 렌더링
  const renderReportContent = () => {
    if (currentPage === 1) {
      return (
        <div ref={contentRef}>
          <StrengthCoverPage
            summary={resultsSummary[0]}
            isGeneratingPdf={isGeneratingPdf}
          />
        </div>
      );
    } else {
      const candidate = candidates[currentPage - 2]; // -2 because: page 1 is CoverPage
      return (
        <div ref={contentRef}>
          <ReportCandidatePage candidate={candidate} />
        </div>
      );
    }
  };
  

  // PDF로 저장
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "pt", "a4");

    // 페이지 수만큼 반복
    for (let i = 0; i < totalPages; i++) {
      const element = contentRef.current.getContent(); // ref로 DOM 가져옴
      await html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // PDF 페이지 추가
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      });
    }

    const companyName = resultsSummary[0].company || "기업";
    pdf.save(`하이어리즘_${companyName}_강점기반추천결과.pdf`);
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
        {/* PDF 다운로드 버튼 */}
        <button
          className="image-recommend-result_download-button"
          onClick={handleDownloadPDF}
        >
          <img src={DownloadIcon} alt="다운로드" />
          <span>다운로드 (pdf 형식)</span>
        </button>

        {/* 보고서 내용 */}
        <div ref={contentRef}>{renderReportContent()}</div>

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

export default StrengthCategoryReport;
