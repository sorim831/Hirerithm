import React, { useState, useRef } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";

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
      <label className="resume-title-label">경력</label>
      <p>
        직무명, 직무내용은 자세히 입력할수록 나와 잘 맞는 기업과 매칭될 확률이
        올라갑니다!
      </p>
      <div className="resume-form-item">
        {experiences.map((exp, index) => (
          <div key={index}>
            <div>
              <input
                id={`company-${index}`}
                type="text"
                placeholder="기업명"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
              />
            </div>

            <div>
              <input
                id={`role-${index}`}
                type="text"
                placeholder="직무내용 또는 직급"
                value={exp.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="입사 연월 (YYYY.M 형식)"
                value={exp.start}
                onChange={(e) => handleChange(index, "start", e.target.value)}
              />
              <span>-</span>
              <input
                type="text"
                placeholder="퇴사 연월 (YYYY.M 형식)"
                value={exp.end}
                onChange={(e) => handleChange(index, "end", e.target.value)}
                ref={(el) => (endRefs.current[index] = el)}
              />
            </div>

            <div>
              <button onClick={() => removeExperience(index)} title="삭제">
                <img src={DeleteIcon} alt="삭제" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addExperience}>
        경력 사항 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default Experience;
