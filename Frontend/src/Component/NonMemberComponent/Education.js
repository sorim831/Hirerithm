import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Education = ({ onChange }) => {
  const [educations, setEducations] = useState([
    { school_name: "", major: "", graduation_status: "", degree: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { school_name: "", major: "", graduation_status: "", degree: "" },
    ]);
  };

  const removeEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  useEffect(() => {
    onChange(educations);
  }, [educations, onChange]);

  return (
    <div className="resume-item-container">
      {educations.map((edu, index) => (
        <div className="resume-form-item" key={index}>
          <input
            type="text"
            placeholder="출신교 입력"
            value={edu.school_name}
            onChange={(e) => handleChange(index, "school_name", e.target.value)}
          />
          {edu.school_name.includes("대학교") && (
            <input
              type="text"
              placeholder="전공 입력"
              value={edu.major}
              onChange={(e) => handleChange(index, "major", e.target.value)}
            />
          )}
          {edu.school_name.includes("대학교") && (
            <select
              value={edu.degree || ""}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
            >
              <option disabled value="">
                학위 선택
              </option>
              <option value="학사">학사</option>
              <option value="석사">석사</option>
              <option value="박사">박사</option>
            </select>
          )}
          <select
            value={edu.graduation_status}
            onChange={(e) =>
              handleChange(index, "graduation_status", e.target.value)
            }
          >
            <option disabled value="">
              졸업 여부 선택
            </option>
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="중퇴">중퇴</option>
            <option value="수료">수료</option>
            <option value="졸업">졸업</option>
          </select>
          <button
            onClick={() => removeEducation(index)}
            title="삭제"
            className="delete-button"
          >
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

export default Education;
