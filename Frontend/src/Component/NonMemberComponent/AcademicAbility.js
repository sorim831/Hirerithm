import React, { useState } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const AcademicAbility = () => {
  const [educations, setEducations] = useState([
    { school: "", graduation: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([...educations, { school: "", graduation: "" }]);
  };

  const removeEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  return (
    <div className="resume-item-container">
      {educations.map((edu, index) => (
        <div className="resume-form-item">
          <input
            type="text"
            placeholder="출신교, 전공 입력"
            value={edu.school}
            onChange={(e) => handleChange(index, "school", e.target.value)}
          />
          /
          <input
            type="text"
            placeholder="졸업 여부"
            value={edu.graduation}
            onChange={(e) => handleChange(index, "graduation", e.target.value)}
          />
          <button onClick={() => removeEducation(index)} title="삭제" className="delete-button">
            <img src={DeleteIcon} alt="❌" />
          </button>
        </div>
      ))}
      <button onClick={addEducation} className="plus-button">
        학력 사항 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default AcademicAbility;
