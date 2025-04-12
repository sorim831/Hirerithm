import React from "react";
import "./reportCandidatePage.css";

const ReportCandidatePage = ({ candidate }) => {
  if (!candidate) return null;

  const { rank, name, age, gender, score, keywords, career, summary } =
    candidate;

  return (
    <div className="report-candidate-page">
      <h2>
        {rank}. {name} 후보자
      </h2>

      <div className="candidate-info">
        <p>
          <strong>이름:</strong> {name}
        </p>
        <p>
          <strong>나이:</strong> {age}
        </p>
        <p>
          <strong>성별:</strong> {gender}
        </p>
        <p>
          <strong>점수:</strong> {score} / 500
        </p>
      </div>

      <div className="candidate-keywords">
        <h3>강점 키워드</h3>
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index}># {keyword}</li>
          ))}
        </ul>
      </div>

      <div className="candidate-career">
        <h3>주요 경력</h3>
        <ul>
          {career.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="candidate-summary">
        <h3>종합 평가</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default ReportCandidatePage;
