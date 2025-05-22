// localhost:3000/recommend_strength/result

import React, { useState, useEffect } from "react";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./strengthResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import StrengthCategoryReport from "../../Component/RecommandComponent/StrengthCategoryReport";
import { motion, AnimatePresence } from "framer-motion";
import dummyCandidates from "../../data/dummyCandidate"; // 후보자 이력서 데이터

const StrengthCategoryResult = () => {
  const [showReport, setShowReport] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 추천 결과 요약 데이터
  const resultsSummary = [
    {
      company: "oo 기업",
      title: "마케팅 팀장 직무 추천 결과",
      author: "유니코서치 대리 김가연",
      keywords: "[ 경력 ] [ 현장 경험 ] [ 매출 성장 기여 ]",
      candidates: [
        { rank: 1, info: "김철수 (29), 남", score: "4.9 / 5.0" },
        { rank: 2, info: "김민지 (27), 여", score: "4.6 / 5.0" },
        { rank: 3, info: "박희망 (30), 남", score: "4.0 / 5.0" },
        { rank: 4, info: "박찬희 (30), 남", score: "3.7 / 5.0" },
        { rank: 5, info: "최민서 (30), 여", score: "3.0 / 5.0" },
      ],
    },
  ];

  return (
    <div className="strength-category-result_wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <AnimatePresence mode="wait">
        {!showReport ? (
          <motion.div
            key="firstPage"
            {...(hasMounted && {
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -50 },
              transition: { duration: 0.4 },
            })}
          >
            <header>
              <div className="strength-category-result_page-index-wrapper">
                <img src={FileLogo} alt="-" />
                <h2>[ ooo ] 추출된 강점 키워드 / 강점 기반 후보자 추천</h2>
              </div>
            </header>

            <div className="strength-category-result_first-page">
              <main>
                <h3 className="strength-category-result_strength-box-header">
                  추출된 강점 키워드
                </h3>

                <div className="strength-category-result_wrapper2">
                  <div className="strength-category-result_keyword-wrapper">
                    <div className="keyword-result-title">
                      입력하신 글에서 추출된 강점 키워드들이에요!
                    </div>

                    <div className="strength-category-result__keyword">
                      <div className="keyword-detail">
                        <span className="keyword">경력</span>
                        <p>
                          다양한 직무 경험과 지속적인 업무 수행을 통해 쌓은
                          전문성이 돋보여요.
                        </p>
                      </div>
                      <div className="keyword-detail">
                        <span className="keyword">국제 경험</span>
                        <p>
                          해외 업무 또는 다문화 환경에서의 경험이 글로벌
                          역량으로 나타나요.
                        </p>
                      </div>
                      <div className="keyword-detail">
                        <span className="keyword">매출 성장 기여</span>
                        <p>
                          성과 중심의 업무 수행으로 실질적인 매출 증가에 기여한
                          점이 강점이에요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="strength-category-result_score-header">
                  <h3>해당 키워드를 가진 인재 Top 5</h3>
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
                    {[4.9, 4.6, 4.0, 3.7, 3.0].map((score, idx) => {
                      let levelClass = "";

                      if (score >= 4.0) {
                        levelClass = "high-score";
                      } else if (score >= 2.5) {
                        levelClass = "middle-score";
                      } else {
                        levelClass = "low-score";
                      }

                      return (
                        <tr key={idx}>
                          <td>홍길동</td>
                          <td>{score} / 5.0</td>
                          <td>
                            <span className={levelClass}></span>
                          </td>
                        </tr>
                      );
                    })}
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
            {...(hasMounted && {
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 50 },
              transition: { duration: 0.4 },
            })}
          >
            <StrengthCategoryReport
              onBack={() => setShowReport(false)}
              resultsSummary={resultsSummary}
              candidates={dummyCandidates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrengthCategoryResult;
