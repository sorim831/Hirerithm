// localhost:3000/resume_registration
import React, { useState, useEffect } from "react";
import "./resume.css";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import PersonalData from "../../Component/NonMemberComponent/PersonalData";
import AcademicAbility from "../../Component/NonMemberComponent/AcademicAbility";
import Experience from "../../Component/NonMemberComponent/Experience";
import License from "../../Component/NonMemberComponent/License";
import Skills from "../../Component/NonMemberComponent/Skills";
import Other from "../../Component/NonMemberComponent/Other ";
import TestResult from "../../Component/NonMemberComponent/TestResult";
import CompanyTest from "../../Component/NonMemberComponent/CompanyTest";
import { AnimatePresence, motion } from "framer-motion";

const Resume = () => {
  const [showCompanyTest, setShowCompanyTest] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleStartTest = () => {
    setShowCompanyTest(true);
  };

  const handleBackToResume = () => {
    setShowCompanyTest(false);
  };

  return (
    <div className="resume-container">
      {/* 네비게이션바 */}
      <NotMemberNavigation />

      <AnimatePresence mode="wait">
        {showCompanyTest ? (
          <motion.div
            key="company-test"
            {...(hasMounted && {
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 50 },
              transition: { duration: 0.4 },
            })}
          >
            <CompanyTest onBackToResume={handleBackToResume} />
          </motion.div>
        ) : (
          <motion.div
            key="resume"
            {...(hasMounted && {
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -50 },
              transition: { duration: 0.4 },
            })}
          >
            <div>
              <header>
                <div className="image-recommend_page-index-wrapper">
                  <img src={FileLogo} alt="-" />
                  <h2>이력서 등록</h2>
                </div>
                <p>
                  <strong>*</strong> 표시되어있는 항목은 필수 항목입니다!
                </p>
              </header>

              <main>
                <label className="resume-title-label">인적사항</label>
                <PersonalData />

                <label className="resume-title-label">학력</label>
                <AcademicAbility />

                <div className="experience-label">
                  <label className="resume-title-label">경력</label>
                  <p>
                    직무명, 직무내용은 자세히 입력할수록 나와 잘 맞는 기업과
                    매칭될 확률이 올라갑니다!
                  </p>
                </div>
                <Experience />

                <label className="resume-title-label">자격증</label>
                <License />

                <label className="resume-title-label">SKILLS</label>
                <Skills />

                <label className="resume-title-label">기타</label>
                <Other />

                <div className="test-result-label">
                  <label className="resume-title-label">
                    맞춤기업 TEST 결과 파일
                  </label>
                  <p>
                    맞춤기업 TEST 결과를 업로드하면 나와 잘 맞는 기업과 매칭될
                    확률이 올라갑니다!
                  </p>
                </div>

                <TestResult onStartTest={handleStartTest} />

                <div className="resume-signature-section">
                  <p>본 지원서의 내용은 사실이며 본인이 작성하였습니다.</p>

                  <div className="signature-author">
                    <label>
                      작성자<strong>*</strong>:{" "}
                    </label>
                    <input type="text" />
                  </div>

                  <div className="signature-buttons">
                    <button>제출</button>
                    <button>임시저장</button>
                    <button>취소</button>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resume;
