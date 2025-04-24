import React, { forwardRef, useImperativeHandle } from "react";
import "./reportCandidatePage.css";
import CandidatePersonalData from "./CandidatePersonalData";

const ReportCandidatePage = forwardRef(
  ({ candidate, isGeneratingPdf }, ref) => {
    useImperativeHandle(ref, () => ({
      getContent: () => document.getElementById("report-candidate-page"),
    }));

    return (
      <div
        id="report-candidate-page"
        className={`report-candidate-page ${isGeneratingPdf ? "pdf-mode" : ""}`}
      >
        <div className="image-recommend-result_report-summary">
          {candidate.name} 후보자
        </div>
        <CandidatePersonalData candidate={candidate} />
      </div>
    );
  }
);

export default ReportCandidatePage;
