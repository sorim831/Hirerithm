// localhost:3000/recommend_strength/result

import React, { useState } from "react";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./strengthCategoryResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import RecommandReport from "../../Component/RecommandComponent/StrengthCategoryReport";
import { motion, AnimatePresence } from "framer-motion";

const StrengthCategoryResult = () => {
  const [showReport, setShowReport] = useState(false);

  // 추천 결과 요약 데이터
  const resultsSummary = [
    {
      title: "마케팅 팀장 직무 추천 결과",
      author: "유니코서치 대리 김가연",
      keywords: "[ 경력 ] [ 현장 경험 ] [ 매출 성장 기여 ]",
      candidates: [
        { rank: 1, info: "김철수 (29), 남", score: "470 / 500" },
        { rank: 2, info: "김민지 (27), 여", score: "450 / 500" },
        { rank: 3, info: "박희망 (30), 남", score: "400 / 500" },
        { rank: 4, info: "박찬희 (30), 남", score: "390 / 500" },
        { rank: 5, info: "최민서 (30), 여", score: "385 / 500" },
      ],
    },
  ];

  // 후보자 개인 데이터
  const candidateList = [
    {
      rank: "1",
      name: "김철수",
      age: 29,
      gender: "남",
      score: 470,
      keywords: ["경력", "리더십", "해외 마케팅"],
      career: [
        "삼성전자 해외영업팀 근무 (2020-2024)",
        "유럽 시장 매출 30% 증가 주도",
        "마케팅 전략 프로젝트 리드",
      ],
      summary: "글로벌 역량과 실무 경험이 뛰어난 인재.",
    },
    // ... 추가 후보자들
  ];

  return (
    <div className="strength-category-result_wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <AnimatePresence mode="wait">
        {!showReport ? (
          <motion.div
            key="firstPage"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <header>
              <div className="strength-category-result_page-index-wrapper">
                <img src={FileLogo} alt="-" />
                <h2>[ ooo ] 추출된 강점 키워드 / 강점 점수 기반 후보자 추천</h2>
              </div>
            </header>

            <div className="strength-category-result_first-page">
              <main>
                <h3 className="strength-category-result_strength-box-header">
                  추출된 강점 키워드
                </h3>

                <div className="strength-category-result_strength-box">
                  <p>입력하신 글에서 추출된 강점 키워드들이에요!</p>
                  <span></span>
                  <div className="strength-category-result_keyword">
                    <span>경력</span>
                    <span>국제 경험</span>
                    <span>매출 성장 기여</span>
                  </div>
                </div>

                <div className="strength-category-result_score-header">
                  <h3>전체 점수표</h3>
                  <div>
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>점수 높음-보통-낮음 순</p>
                  </div>
                </div>

                <table className="strength-category-result_score-table">
                  <tbody>
                    <tr>
                      <td>홍길동</td>
                      <td>100/100</td>
                      <td>
                        <span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>80/100</td>
                      <td>
                        <span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>78/100</td>
                      <td>
                        <span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>70/100</td>
                      <td>
                        <span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>66/100</td>
                      <td>
                        <span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>50/100</td>
                      <td>
                        <span></span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button
                  className="image-recommend-result_job-seeker-button"
                  onClick={() => setShowReport(true)}
                >
                  <img src={ArrowIcon} alt="➜" />
                  <span>추천 결과 보고서 열람</span>
                </button>
              </main>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reportPage"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <RecommandReport
              onBack={() => setShowReport(false)}
              candidates={candidateList}
              resultsSummary={resultsSummary}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrengthCategoryResult;
