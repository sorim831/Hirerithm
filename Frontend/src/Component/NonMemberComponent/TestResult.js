import React from "react";
import "./resumeComponent.css";

const categoryLabel = {
  TeamCulture: "조직문화",
  Evaluation: "평가 및 성장",
  PayLevel: "보상 수준",
  VisionDirection: "비전 및 방향성",
  Welfare: "복지",
  Workload: "업무 강도",
};

const TestResult = ({ onStartTest, scores }) => {
  return (
    <div className="resume-item-container">
      <button className="test-page-button" onClick={onStartTest}>
        맞춤기업 TEST 하러가기
      </button>

      {/* TEST 하면 아래 부분 화면에 표시 */}

      {scores && (
        <div className="resume-item-container">
          <h3 className="test-result-title">[TEST 결과]</h3>
          <p className="test-result-detail">
            * 점수가 높을 수록 해당 특징을 가진 기업과 잘 맞을 확률이 높아요!
          </p>
          <div className="test-result-item">
            <ul>
              {Object.entries(scores)
                .sort((a, b) => b[1] - a[1])
                .map(([category, score]) => (
                  <li key={category}>
                    <span className="test-category"></span>
                    <label>{categoryLabel[category]}</label>
                    {score.toFixed(2)}점
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResult;
