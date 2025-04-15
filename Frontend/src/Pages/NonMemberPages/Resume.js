import React from "react";
import "./resume.css";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import ResumePersonalData from "../../Component/NonMemberComponent/ResumePersonalData";
import AcademicAbility from "../../Component/NonMemberComponent/AcademicAbility";

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

      {/* 이력서 입력 항목 */}
      <main>
        <ResumePersonalData />
        <AcademicAbility />
      </main>
    </div>
  );
};

export default Resume;
