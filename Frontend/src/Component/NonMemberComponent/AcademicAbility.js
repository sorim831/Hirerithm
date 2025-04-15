import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";

const AcademicAbility = () => {
  return (
    <div className="resume-item-container">
      <label className="resume-title-label">학력</label>
      <div className="resume-form-item">
        <input type="text" placeholder="출신교, 전공 입력" /> /
        <input type="text" placeholder="졸업여부" />
      </div>
      <button>
        학력 사항 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default AcademicAbility;
