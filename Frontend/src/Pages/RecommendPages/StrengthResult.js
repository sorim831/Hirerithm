import { useState, useEffect } from "react";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./strengthResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import StrengthCategoryReport from "../../Component/RecommandComponent/StrengthCategoryReport";
import { motion, AnimatePresence } from "framer-motion";

const StrengthCategoryResult = ({ result }) => {
  const [showReport, setShowReport] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!result || !Array.isArray(result.recommendations)) {
    return <p>결과 데이터가 없습니다.</p>;
  }

  const recommendations = result.recommendations;

  const keywordsSet = new Set();
  recommendations.forEach((rec) => {
    if (Array.isArray(rec.keyword)) {
      rec.keyword.forEach((k) => keywordsSet.add(k));
    }
  });
  const keywords = Array.from(keywordsSet);

  const resultsSummary = [
    {
      company: "oo 기업",
      title: "추천 결과",
      author: "유니코서치 대리 김가연",
      keywords: keywords.map((k) => `[ ${k} ]`).join(" "),
      candidates: recommendations.map((rec, index) => ({
        rank: index + 1,
        info: `이름 비공개`,
        score: `${(rec.score || 0).toFixed(1)} / 5.0`,
      })),
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
                      {keywords.map((keyword, idx) => (
                        <div className="keyword-detail" key={idx}>
                          <span className="keyword">{keyword}</span>{" "}
                          {/* 입력한 글에서 추출된 키워드로 수정해야함 */}
                          <p>강점 설명이 여기에 들어갑니다.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="strength-category-result_score-header">
                  <h3>
                    추출된 강점 키워드 기반 추천 인재 Top{" "}
                    {recommendations.length}
                  </h3>
                </div>

                <ol className="strength-category-result_score-list">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="score-list-item">
                      <strong>
                        후보자 {index + 1} ({(rec.score || 0).toFixed(1)}/5.0
                        점)
                      </strong>
                      <ul>
                        <li>
                          {rec.keyword.map((k, i) => (
                            <span key={i}>{k}</span>
                          ))}
                        </li>
                        <li>{rec.reason}</li>
                      </ul>
                    </li>
                  ))}
                </ol>

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
              candidates={recommendations}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrengthCategoryResult;
