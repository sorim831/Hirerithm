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
                <h2> 추출된 강점 키워드 / 강점 기반 후보자 추천</h2>
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
                        <span className="keyword">DevOps 엔지니어</span>
                        <p>
                          DevOps 엔지니어로서의 업무 경험과 지식이 풍부합니다.
                        </p>
                      </div>
                      <div className="keyword-detail">
                        <span className="keyword">Node.js</span>
                        <p>
                          Node.js를 활용한 서버 개발 경험이 풍부하며 웹
                          애플리케이션 개발에 기여한 경력이 있습니다.
                        </p>
                      </div>
                      <div className="keyword-detail">
                        <span className="keyword">CI/CD 파이프라인</span>
                        <p>
                          CI/CD 파이프라인 구축 및 운영에 대한 높은 이해와
                          경험이 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="strength-category-result_score-header">
                  <h3>추출된 강점 키워드 기반 추천 인재 Top 6</h3>
                </div>

                <ol className="strength-category-result_score-list">
                  <li className="score-list-item">
                    <strong>강도현 (4.8/5.0 점)</strong>
                    <ul>
                      <li>
                        <span>웹 프레임워크 활용</span>{" "}
                        <span>프론트·백엔드 협업 경험</span>{" "}
                        <span>REST API 설계 및 구현</span>
                      </li>
                      <li>
                        React와 Node.js를 사용한 프로젝트 경험이 풍부하며,
                        RESTful API 설계 및 구현 경험이 있어 요구사항에
                        부합합니다.
                      </li>
                    </ul>
                  </li>

                  <li className="score-list-item">
                    <strong>이서준 (4.5/5.0 점)</strong>
                    <ul>
                      <li>
                        <span>AWS 운영 경험</span>{" "}
                        <span>CI/CD 파이프라인 구축</span>{" "}
                        <span>클라우드 인프라 이해도</span>
                      </li>
                      <li>
                        DevOps 엔지니어로서의 경력과 AWS 환경에서의 경험이
                        있으며, CI/CD 파이프라인 구축 경험이 있어 요구사항에
                        부합합니다.
                      </li>
                    </ul>
                  </li>

                  <li className="score-list-item">
                    <strong>김예진 (4.3/5.0 점)</strong>
                    <ul>
                      <li>
                        <span>Python 자격증</span> <span>DB 운영 경험</span>{" "}
                        <span>서버 안정성 모니터링</span>
                      </li>
                      <li>
                        DevOps 엔지니어로서의 경력과 Python & MySQL 자격증을
                        보유하고 있으며, 서버 모니터링에 대한 경험이 있어
                        요구사항에 부합합니다.
                      </li>
                    </ul>
                  </li>

                  <li className="score-list-item">
                    <strong>정하늘 (4.0/5.0 점)</strong>
                    <ul>
                      <li>
                        <span>인프라 자동화</span> <span>CI/CD 운영</span>{" "}
                        <span>DevOps 툴 사용 능력</span>
                      </li>
                      <li>
                        DevOps 엔지니어로서의 경력과 인프라 자동화, CI/CD에 대한
                        경험이 있어 요구사항에 부합합니다.
                      </li>
                    </ul>
                  </li>

                  <li className="score-list-item">
                    <strong>박세민 (3.8/5.0 점)</strong>
                    <ul>
                      <li>
                        <span>AWS 자격증</span>{" "}
                        <span>클라우드 인프라 설계</span>{" "}
                        <span>시스템 운영 경험</span>
                      </li>
                      <li>
                        DevOps 엔지니어로서의 경력과 AWS 솔루션스 아키텍트
                        자격증을 보유하고 있으며, 인프라 자동화에 대한 경험이
                        있어 요구사항에 부합합니다.
                      </li>
                    </ul>
                  </li>

                  <li className="score-list-item">
                    <strong>최지우 (3.5/5.0 점)</strong>
                    <ul>
                      <li>
                        <span>Azure DevOps</span>{" "}
                        <span>Kubernetes 클러스터 관리</span>{" "}
                        <span>클라우드 아키텍처 설계</span>
                      </li>
                      <li>
                        Azure DevOps 엔지니어로서의 경력과 클라우드 솔루션
                        설계·운영, Kubernetes 클러스터 관리에 대한 경험이 있어
                        요구사항에 부합합니다.
                      </li>
                    </ul>
                  </li>
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
              candidates={dummyCandidates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrengthCategoryResult;
