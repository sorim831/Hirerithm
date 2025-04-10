// localhost:3000/nonmember/companytest

import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import axios from "axios";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import NonMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import "./CompanyTest.css";

const questions = [
  {
    text: "새로운 프로젝트를 시작할 때, 나는 세부적인 계획을 철저히 세우고 진행한다.",
    type: "E", // 점수 누적용 키
  },
  {
    text: "중요한 결정을 내릴 때, 나는 직감과 경험을 믿고 빠르게 판단한다.",
    type: "N",
  },
  {
    text: "팀 프로젝트를 할 때, 나는 개인적으로 맡은 일을 독립적으로 해결하는 것이 편하다.",
    type: "T",
  },
  // 여기에 문항 더 추가
];

const CompanyTest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  //const navigate = useNavigate();
  //const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const handleSelect = (questionIndex, score) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = score;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const isAllAnswered = answers.every((a) => a !== null);
    if (!isAllAnswered) {
      alert("모든 문항에 답해주세요!");
      return;
    }
    // TODO : 점수 계산 로직 구현
  };

  return (
    <div className="image-recommend_wrapper">
      <NonMemberNavigation />

      <header>
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>맞춤기업 TEST</h2>
        </div>
        <p></p>
      </header>

      <main className="company-test_main">
        {/* 질문 리스트 */}
        {questions.map((q, idx) => (
          <div key={idx} className="company-test_question-block">
            <p className="company-test_question">
              Q{idx + 1}. {q.text}
            </p>

            <div className="company-test_choices">
              {[1, 2, 3, 4, 5, 6, 7].map((score) => {
                const sizeClass = [
                  "size-xs",
                  "size-sm",
                  "size-md",
                  "size-lg",
                  "size-md",
                  "size-sm",
                  "size-xs",
                ][score - 1];

                const labelText = {
                  1: "매우 그렇지 않다",
                  4: "보통이다",
                  7: "매우 그렇다",
                }[score];

                return (
                  <div
                    key={score}
                    className={`company-test_choice ${sizeClass}`}
                    onClick={() => handleSelect(idx, score)}
                  >
                    <input
                      type="radio"
                      name={`q${idx}`}
                      id={`q${idx}_opt${score}`}
                      checked={answers[idx] === score}
                      onChange={() => handleSelect(idx, score)}
                    />
                    <label htmlFor={`q${idx}_opt${score}`}>
                      {labelText && (
                        <span span className="label-text">
                          {labelText}
                        </span>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit} className="company-test_submit-btn">
          내 테스트 결과보기
        </button>
      </main>
    </div>
  );
};

export default CompanyTest;
