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
    <div>
      {/* 네비게이션바 */}
      <NotMemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>이력서 등록</h2>
        </div>
      </header>

      <main>
        {/* 이력서 입력 항목 */}
        <PersonalData />
        <AcademicAbility />
        <Experience />
        <License />
        <Skills />
        <Other />
        <TestResult />

        <div>
          <p>본 지원서의 내용은 사실이며 본인이 작성하였습니다.</p>
          <div>
            <label>작성자: </label>
            <input type="text" />
          </div>

          {/* 이력서 서명란 */}
          <div>
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
