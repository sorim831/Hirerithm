import React, { useState } from "react";
import "./resumeComponent.css";

const categoryLabel = {
  TeamCulture: "조직문화 (TeamCulture)",
  Evaluation: "공정한 평가, 성장지원 (Evaluation)",
  PayLevel: "보상수준 (PayLevel)",
  VisionDirection: "비전 및 방향성 (VisionDirection)",
  Welfare: "복지 (Welfare)",
  Workload: "워라벨 (Workload)",
};

const TestResult = ({ onStartTest, scores, onChange }) => {
  const [manualScores, setManualScores] = useState({
    TeamCulture: "",
    Evaluation: "",
    PayLevel: "",
    VisionDirection: "",
    Welfare: "",
    Workload: "",
  });

  const handleChange = (category, value) => {
    setManualScores((prev) => {
      const updated = {
        ...prev,
        [category]: value,
      };

      // 모든 입력값을 숫자로 변환
      const parsedScores = {};
      let allValid = true;

      for (const [cat, val] of Object.entries(updated)) {
        const numberValue = parseFloat(val);
        // 비어있으면 skip (완전히 입력되기 전)
        if (val === "") continue;

        if (isNaN(numberValue) || numberValue < 1 || numberValue > 5) {
          allValid = false;
          break;
        }
        parsedScores[cat] = numberValue;
      }

      // 모든 값이 유효할 때만 onChange 호출
      if (
        allValid &&
        Object.keys(parsedScores).length === Object.keys(categoryLabel).length
      ) {
        const companyTestString = JSON.stringify(parsedScores);
        onChange({ companyTest: companyTestString });
      }

      return updated;
    });
  };

  const displayScores = scores;

  return (
    <div className="resume-item-container">
      <button className="test-page-button" onClick={onStartTest}>
        맞춤기업 TEST 하러가기
      </button>

      {/* TEST 결과 또는 수동 입력 */}
      {displayScores ? (
        <div className="resume-item-container">
          <h3 className="test-result-title">[TEST 결과]</h3>
          <p className="test-result-detail">
            * 점수가 높을 수록 해당 특징을 가진 기업과 잘 맞을 확률이 높아요!
          </p>
          <div className="test-result-item">
            <ul>
              {Object.entries(displayScores)
                .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
                .map(([category, score]) => (
                  <li key={category}>
                    <span className="test-category"></span>
                    <label>{categoryLabel[category]}</label>
                    <span className="result-score">
                      {parseFloat(score).toFixed(2)}점
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="resume-item-container">
          <h3 className="test-result-title">[직접 점수 입력]</h3>
          <p className="test-result-detail">
            각 항목별 점수를 1~5점 사이로 입력해주세요. 소수점 한 자리까지 입력
            (ex. 1.4, 4.6)
          </p>
          <div className="test-result-input-item">
            {Object.keys(categoryLabel).map((category) => (
              <div key={category} className="input-item">
                <label>{categoryLabel[category]}</label>
                <input
                  type="text"
                  value={manualScores[category]}
                  onChange={(e) => handleChange(category, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResult;
