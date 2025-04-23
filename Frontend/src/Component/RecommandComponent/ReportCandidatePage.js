import React from "react";
import "./reportCandidatePage.css";
import CandidatePersonalData from "./CandidatePersonalData";

const ReportCandidatePage = ({ candidate }) => {
  return (
    <div className="report-candidate-page">
      <div className="image-recommend-result_report-summary">
        {candidate.name} 후보자
      </div>
      <CandidatePersonalData candidate={candidate} />
    </div>
  );
};

export default ReportCandidatePage;
