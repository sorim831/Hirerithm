import React, { useState, useEffect } from "react";
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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (category, value) => {
    setManualScores((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // 문자열을 숫자로 변환하여 상위 컴포넌트로 전달
    const parsed = Object.fromEntries(
      Object.entries(manualScores).map(([key, value]) => [key, Number(value)])
    );
    onChange({ companyTest: JSON.stringify(parsed) });
  };

  useEffect(() => {
    if (scores) {
      onChange({ companyTest: JSON.stringify(scores) });
    }
  }, [scores, onChange]);

  const displayScores = scores || (submitted ? manualScores : null);

  return (
    <div className="resume-item-container">
      <button className="test-page-button" onClick={onStartTest}>
        맞춤기업 TEST 하러가기
      </button>

      {/* TEST 결과 or 수동 입력 */}
      {displayScores ? (
        <div className="resume-item-container">
          <h3 className="test-result-title">[TEST 결과]</h3>
          <p className="test-result-detail">
            * 점수가 높을수록 해당 특징을 가진 기업과 잘 맞을 확률이 높아요!
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
        <form className="resume-item-container" onSubmit={handleSubmit}>
          <h3 className="test-result-title">[직접 점수 입력]</h3>
          <p className="test-result-detail">
            각 항목별 점수를 1~100점 사이로 입력해주세요.
          </p>
          <div className="test-result-input-item">
            {Object.keys(categoryLabel).map((category) => (
              <div key={category} className="input-item">
                <label>{categoryLabel[category]}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={manualScores[category]}
                  onChange={(e) => handleChange(category, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className="plus-button">
            입력 완료
          </button>
        </form>
      )}
    </div>
  );
};

export default TestResult;
