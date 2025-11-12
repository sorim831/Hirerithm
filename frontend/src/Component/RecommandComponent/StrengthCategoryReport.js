import React, { useState, useRef } from "react";
import StrengthCoverPage from "./StrengthCoverPage";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./strengthCategoryReport.css";
import PageWrapper from "./PageWrapper";

const StrengthCategoryReport = ({ onBack, resultsSummary }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef(null);

  // PDF로 저장
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsGeneratingPdf(true);

    const pdf = new jsPDF("p", "pt", "a4");

    const element = contentRef.current.getContent?.() || contentRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const companyName = resultsSummary?.[0]?.company || "기업";
    pdf.save(`하이어리즘_${companyName}_강점기반추천결과.pdf`);

    setIsGeneratingPdf(false);
  };

  return (
    <div className="image-recommend-result_second-page">
      <header>
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
          disabled={isGeneratingPdf}
        >
          <img src={DownloadIcon} alt="다운로드" />
          <span>{isGeneratingPdf ? "생성 중..." : "다운로드 (pdf 형식)"}</span>
        </button>

        {/* 표지 페이지만 렌더링 */}
        <PageWrapper>
          <StrengthCoverPage
            ref={contentRef}
            summary={resultsSummary?.[0]}
            isGeneratingPdf={false}
          />
        </PageWrapper>

        {/* 뒤로가기 버튼 */}
        <button className="report-back-button" onClick={onBack}>
          <img src={LeftArrow} alt="뒤로가기" />
          <span className="back-text">기업 이미지 점수 화면</span>
        </button>
      </main>
    </div>
  );
};

export default StrengthCategoryReport;
