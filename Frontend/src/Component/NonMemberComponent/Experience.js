import React, { useState, useRef } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([
    { start: "", end: "", company: "", role: "" },
  ]);
  const endRefs = useRef([]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    if (field === "start" || field === "end") {
      value = value.replace(/[^0-9.]/g, "").slice(0, 7);
    }
    updated[index][field] = value;
    setExperiences(updated);

    if (field === "start" && /^\d{4}\.\d{1,2}$/.test(value)) {
      endRefs.current[index]?.focus();
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { start: "", end: "", company: "", role: "" },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  return (
    <div className="resume-item-container">
      {experiences.map((exp, index) => (
        <div className="resume-form-item">
          <input
            id={`company-${index}`}
            type="text"
            placeholder="기업명"
            value={exp.company}
            onChange={(e) => handleChange(index, "company", e.target.value)}
          />
          /
          <input
            id={`role-${index}`}
            type="text"
            placeholder="직무내용(직급)"
            value={exp.role}
            onChange={(e) => handleChange(index, "role", e.target.value)}
          />
          /
          <input
            type="text"
            placeholder="입사 (YYYY.M)"
            className="date-input"
            value={exp.start}
            onChange={(e) => handleChange(index, "start", e.target.value)}
          />
          <span>-</span>
          <input
            type="text"
            placeholder="퇴사 (YYYY.M)"
            className="date-input"
            value={exp.end}
            onChange={(e) => handleChange(index, "end", e.target.value)}
            ref={(el) => (endRefs.current[index] = el)}
          />
          <div>
            <button
              onClick={() => removeExperience(index)}
              title="삭제"
              className="delete-button"
            >
              <img src={DeleteIcon} alt="❌" />
            </button>
          </div>
        </div>
      ))}

      <button onClick={addExperience} className="plus-button">
        경력 사항 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default Experience;
