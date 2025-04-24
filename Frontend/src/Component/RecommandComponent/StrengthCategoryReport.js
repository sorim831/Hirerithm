import React, { useState, useEffect, useRef } from "react";
import StrengthCoverPage from "./StrengthCoverPage";
import ReportCandidatePage from "./ReportCandidatePage";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./strengthCategoryReport.css";
import PageWrapper from "./PageWrapper";

const StrengthCategoryReport = ({ onBack, resultsSummary, candidates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false); // 다운로드 중 상태 관리

  const totalPages = 1 + candidates.length;

  const renderAllPages = () => {
    const allPages = [
      <PageWrapper key={0}>
        <StrengthCoverPage
          ref={(el) => (contentRef.current[0] = el)}
          summary={resultsSummary[0]}
          isGeneratingPdf={isGeneratingPdf}
        />
      </PageWrapper>,
      ...candidates.map((candidate, index) => (
        <PageWrapper key={index + 1}>
          <ReportCandidatePage
            ref={(el) => (contentRef.current[index + 1] = el)}
            candidate={candidate}
            isGeneratingPdf={isGeneratingPdf}
          />
        </PageWrapper>
      )),
    ];

    return allPages;
  };

  const renderPreview = () => {
    const allPages = renderAllPages();
    return allPages[currentPage - 1]; // 현재 페이지에 해당하는 페이지만 렌더링
  };

  // PDF로 저장
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);

    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < contentRef.current.length; i++) {
      const element = contentRef.current[i]?.getContent?.();
      if (!element) continue;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    const companyName = resultsSummary[0].company || "기업";
    pdf.save(`하이어리즘_${companyName}_강점기반추천결과.pdf`);

    setIsGeneratingPdf(false);
  };

  useEffect(() => {
    contentRef.current.length = 0; // 기존 배열을 유지하면서 비우기
  }, [candidates.length]);

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
        <div>{renderPreview()}</div>

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
