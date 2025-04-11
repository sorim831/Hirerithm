// localhost:3000/recommend_strength/result

import React, { useState } from "react";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./strengthCategoryResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import RecommandReportCover from "../../Component/RecommandComponent/CorporateImageReportCover";
import { motion, AnimatePresence } from "framer-motion";

const StrengthCategoryResult = () => {
  const [showReport, setShowReport] = useState(false);

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
            <RecommandReportCover onBack={() => setShowReport(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrengthCategoryResult;
