import React, { useState, useRef } from "react";
import "./corporateImageReport.css";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";
import CorporateImageCoverPage from "./CorporateImageCoverPage";
import PageWrapper from "./PageWrapper";

const CorporateImageReport = ({
  onBack,
  resultsSummary = [],
  companySummary = [],
  candidates = [],
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsGeneratingPdf(true);

    // --- 1️⃣ 표지 생성 (html2canvas + jsPDF)
    const pdf = new jsPDF("p", "pt", "a4");
    const element = contentRef.current.getContent?.() || contentRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const coverBlob = pdf.output("blob");
    const coverPdfBytes = await coverBlob.arrayBuffer();

    // --- 2️⃣ 병합 시작 (pdf-lib)
    const mergedPdf = await PDFDocument.create();
    const coverDoc = await PDFDocument.load(coverPdfBytes);
    const coverPages = await mergedPdf.copyPages(
      coverDoc,
      coverDoc.getPageIndices()
    );
    coverPages.forEach((p) => mergedPdf.addPage(p));

    // --- 3️⃣ 각 후보자의 PDF 병합
    for (const candidate of candidates) {
      const resumeId = candidate.resume_id;
      if (!resumeId) continue;

      try {
        // 이미 "addPage 처리된 완성 PDF"가 /pdf 폴더에 존재한다고 가정
        const response = await fetch(`/pdf/${resumeId}.pdf`);
        if (!response.ok) {
          console.warn(`⚠️ ${resumeId}.pdf 불러오기 실패`);
          continue;
        }

        const resumePdfBytes = await response.arrayBuffer();
        const resumeDoc = await PDFDocument.load(resumePdfBytes);
        const resumePages = await mergedPdf.copyPages(
          resumeDoc,
          resumeDoc.getPageIndices()
        );
        resumePages.forEach((p) => mergedPdf.addPage(p));
      } catch (err) {
        console.warn(`⚠️ ${resumeId}.pdf 병합 중 오류:`, err);
      }
    }

    // --- 4️⃣ 병합 완료 후 다운로드
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

    const companyName = resultsSummary[0]?.company || "기업";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `하이어리즘_${companyName}_강점기반추천결과.pdf`;
    link.click();

    setIsGeneratingPdf(false);
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
        {/* PDF 다운로드 버튼 */}
        <button
          className="image-recommend-result_download-button"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPdf}
        >
          <img src={DownloadIcon} alt="다운로드" />
          <span>{isGeneratingPdf ? "생성 중..." : "다운로드 (pdf 형식)"}</span>
        </button>

        {/* 표지 */}
        <PageWrapper>
          <CorporateImageCoverPage
            ref={contentRef}
            resultsSummary={resultsSummary[0]}
            isGeneratingPdf={false}
            companySummary={companySummary}
          />
        </PageWrapper>

        {/* 뒤로가기 버튼 */}
        <button className="report-back-button" onClick={onBack}>
          <img src={LeftArrow} alt="뒤로가기" className="back-icon" />
          <span className="back-text">기업 이미지 점수 화면</span>
        </button>
      </main>
    </div>
  );
};

export default CorporateImageReport;
