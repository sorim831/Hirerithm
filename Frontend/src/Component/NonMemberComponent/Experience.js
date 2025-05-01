import React, { useState, useRef } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([
    { start: "", end: "", company: "", role: "", detail: "", isCurrent: true },
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

  const handleCurrentToggle = (index, isCurrent) => {
    const updated = [...experiences];
    updated[index].isCurrent = isCurrent;
    if (isCurrent) updated[index].end = "";
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        start: "",
        end: "",
        company: "",
        role: "",
        detail: "",
        isCurrent: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  return (
    <div className="resume-item-container">
      {experiences.map((exp, index) => (
        <div className="experience-form-item" key={index}>
          <div className="row-wrapper">
            <input
              id={`company-${index}`}
              type="text"
              placeholder="기업명"
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              className="row-wrapper-input"
            />
            /
            <input
              id={`role-${index}`}
              type="text"
              placeholder="직무내용(직급)"
              value={exp.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
              className="row-wrapper-input"
            />
            /
            <input
              type="text"
              placeholder="입사 (YYYY.MM)"
              className="date-input"
              value={exp.start}
              onChange={(e) => handleChange(index, "start", e.target.value)}
            />
            <span>-</span>
            {exp.isCurrent ? (
              <select
                className="date-select"
                value="재직 중"
                onChange={() => handleCurrentToggle(index, false)}
              >
                <option>재직중</option>
                <option value="">직접 입력</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder="퇴사 (YYYY.MM)"
                className="date-input"
                value={exp.end}
                onChange={(e) => handleChange(index, "end", e.target.value)}
                ref={(el) => (endRefs.current[index] = el)}
                onBlur={() => {
                  if (exp.end.trim() === "") handleCurrentToggle(index, true);
                }}
              />
            )}
          </div>

          <textarea
            type="text"
            placeholder="업무내용 상세 (예: 모바일 기기용 펌웨어 및 애플리케이션 개발. 주요 프로젝트로는..)"
            value={exp.detail}
            onChange={(e) => handleChange(index, "detail", e.target.value)}
            className="detail-input"
          />

          <button
            onClick={() => removeExperience(index)}
            title="삭제"
            className="delete-button"
          >
            <img src={DeleteIcon} alt="❌" />
          </button>
        </div>
      ))}

      <button onClick={addExperience} className="plus-button">
        경력 사항 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default Experience;
