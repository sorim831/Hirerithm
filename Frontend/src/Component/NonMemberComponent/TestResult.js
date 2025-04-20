import React from "react";
import "./resumeComponent.css";

const TestResult = ({ onStartTest }) => {
  return (
    <div className="resume-item-container">
      <button className="test-page-button" onClick={onStartTest}>
        맞춤기업 TEST 하러가기
      </button>

      {/* TEST 하면 아래 부분 화면에 표시 */}
      <h3>[TEST 결과]</h3>
      <div className="test-result-item">
        <ul>
          <li>
            <span className="test-category"></span>
            <label>TeamCulture</label>
            <span>90/100</span>
          </li>
          <li>
            <span className="test-category"></span>
            <label>PayLevel</label>
            <span>80/100</span>
          </li>
          <li>
            <span className="test-category"></span>
            <label>VisionDirection</label>
            <span>70/100</span>
          </li>
          <li>
            <span className="test-category"></span>
            <label>Evaluation</label>
            <span>65/100</span>
          </li>
          <li>
            <span className="test-category"></span>
            <label>Welfare</label>
            <span>50/100</span>
          </li>
          <li>
            <span className="test-category"></span>
            <label>Workload</label>
            <span>50/100</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestResult;
