import React from "react";
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

const Resume = () => {
  return (
    <div className="resume-container">
      {/* 네비게이션바 */}
      <NotMemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>이력서 등록</h2>
        </div>
        <p>
          <strong>*</strong> 표시되어있는 항목은 필수 항목입니다!
        </p>
      </header>

      <main>
        {/* 이력서 입력 항목 */}
        <label className="resume-title-label">인적사항</label>
        <PersonalData />

        <label className="resume-title-label">학력</label>
        <AcademicAbility />

        <div className="experience-label">
          <label className="resume-title-label">경력</label>
          <p>
            직무명, 직무내용은 자세히 입력할수록 나와 잘 맞는 기업과 매칭될
            확률이 올라갑니다!
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
          <label className="resume-title-label">맞춤기업 TEST 결과 파일</label>
          <p>
            맞춤기업 TEST 결과를 업로드하면 나와 잘 맞는 기업과 매칭될 확률이
            올라갑니다!
          </p>
        </div>
        <TestResult />

        {/* 이력서 서명란 */}
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
  );
};

export default Resume;
