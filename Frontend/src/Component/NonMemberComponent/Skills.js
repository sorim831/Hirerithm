import React, { useState } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";

const Skills = () => {
  const [skills, setSkills] = useState([{ skill: "" }]);

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index].skill = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { skill: "" }]);
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  return (
    <div className="resume-item-container">
      <label className="resume-title-label">SKILLS</label>
      <div className="resume-form-item">
        {skills.map((item, index) => (
          <div key={index}>
            <input
              id={`skill-${index}`}
              type="text"
              placeholder="사용 가능한 기술스택 입력"
              value={item.skill}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <button onClick={() => removeSkill(index)} title="삭제">
              <img src={DeleteIcon} alt="❌" />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addSkill}>
        SKILLS 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default Skills;
