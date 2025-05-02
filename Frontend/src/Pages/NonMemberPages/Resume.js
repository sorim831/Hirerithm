// localhost:3000/user/resume
import React, { useState, useEffect } from "react";
import "./resume.css";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import PersonalData from "../../Component/NonMemberComponent/PersonalData";
import Education from "../../Component/NonMemberComponent/Education";
import Experience from "../../Component/NonMemberComponent/Experience";
import License from "../../Component/NonMemberComponent/License";
import Skills from "../../Component/NonMemberComponent/Skills";
import Other from "../../Component/NonMemberComponent/Other";
import TestResult from "../../Component/NonMemberComponent/TestResult";
import CompanyTest from "../../Component/NonMemberComponent/CompanyTest";
import { AnimatePresence, motion } from "framer-motion";

const Resume = () => {
  const [showCompanyTest, setShowCompanyTest] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [testScores, setTestScores] = useState(null);

  // 이력서 데이터
  const [resumeData, setResumeData] = useState({
    personalData: {},
    academic: {},
    experience: {},
    license: {},
    skills: {},
    other: {},
    testScores: null,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleStartTest = () => {
    window.scrollTo(0, 0); // 스크롤 맨 상단으로 이동
    setShowCompanyTest(true);
  };

  const handleBackToResume = (scores) => {
    if (scores) {
      setTestScores(scores); // 점수 저장
    }
    setShowCompanyTest(false); // Resume로 돌아가기
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
                <PersonalData
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, personalData: data }))
                  }
                />

                <label className="resume-title-label">학력</label>
                <Education
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, education: data }))
                  }
                />

                <div className="experience-label">
                  <label className="resume-title-label">경력</label>
                  <p>
                    직무명, 직무내용은 자세히 입력할수록 나와 잘 맞는 기업과
                    매칭될 확률이 올라갑니다!
                  </p>
                </div>
                <Experience
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, experience: data }))
                  }
                />

                <label className="resume-title-label">자격증</label>
                <License
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, license: data }))
                  }
                />

                <div className="skills-label">
                  <label className="resume-title-label">SKILLS</label>
                  <p>
                    Language / Web FE & BE / DB / DevOps & Cloud / Tool (협업)
                  </p>
                </div>
                <Skills
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, skills: data }))
                  }
                />

                <label className="resume-title-label">기타</label>
                <Other
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, otherinfo: data }))
                  }
                />

                <div className="test-result-label">
                  <label className="resume-title-label">맞춤기업 TEST</label>
                  <p>
                    맞춤기업 TEST를 통해 나와 잘 맞는 기업과 매칭될 확률을
                    올려보세요!
                  </p>
                </div>

                {/* 테스트 결과 표시 */}
                <TestResult
                  onStartTest={handleStartTest}
                  scores={testScores}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, testResult: data }))
                  }
                />

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
