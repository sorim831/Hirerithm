import React, { useState, useRef } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Career = ({ onChange }) => {
  const [experiences, setExperiences] = useState([
    {
      company_name: "",
      position: "",
      description: "",
      isCurrent: true,
      start_year: "",
      end_year: "",
    },
  ]);

  const endRefs = useRef([]);

  // 경험 데이터 업데이트 및 상위로 전달
  const updateExperiences = (updated) => {
    setExperiences(updated);
    if (onChange) onChange(updated);
  };

  // 입력값 핸들링
  const handleChange = (index, field, value) => {
    const updated = [...experiences];

    // 날짜 입력일 경우 숫자 + . 만 허용
    if (field === "start_year" || field === "end_year") {
      value = value.replace(/[^0-9.]/g, "").slice(0, 7);
    }

    updated[index][field] = value;

    // 재직중일 경우 end_year 강제 비우기
    if (updated[index].isCurrent) {
      updated[index].end_year = "";
    }

    updateExperiences(updated);

    // start_year 입력 완료 후 end_year로 포커스 이동
    if (field === "start_year" && /^\d{4}\.\d{1,2}$/.test(value)) {
      endRefs.current[index]?.focus();
    }
  };

  // 재직중 토글
  const handleCurrentToggle = (index, isCurrent) => {
    const updated = [...experiences];
    updated[index].isCurrent = isCurrent;

    // 재직중으로 변경 시 end_year 비우기
    if (isCurrent) {
      updated[index].end_year = "";
    }

    updateExperiences(updated);
  };

  // 경력 추가
  const addExperience = () => {
    const updated = [
      ...experiences,
      {
        company_name: "",
        position: "",
        description: "",
        isCurrent: false,
        start_year: "",
        end_year: "",
      },
    ];
    updateExperiences(updated);
  };

  // 경력 삭제 (ref도 같이 정리)
  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    endRefs.current.splice(index, 1);
    updateExperiences(updated);
  };

  return (
    <div className="resume-item-container">
      {experiences.map((exp, index) => (
        <div className="experience-form-item" key={index}>
          <div className="row-wrapper">
            <input
              id={`company_name-${index}`}
              type="text"
              placeholder="기업명"
              value={exp.company_name}
              onChange={(e) =>
                handleChange(index, "company_name", e.target.value)
              }
              className="row-wrapper-input"
            />
            /
            <input
              id={`position-${index}`}
              type="text"
              placeholder="직무내용(직급)"
              value={exp.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
              className="row-wrapper-input"
            />
            /
            <input
              type="text"
              placeholder="입사 (YYYY.MM)"
              className="date-input"
              value={exp.start_year}
              onChange={(e) =>
                handleChange(index, "start_year", e.target.value)
              }
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
                value={exp.end_year}
                onChange={(e) =>
                  handleChange(index, "end_year", e.target.value)
                }
                ref={(el) => (endRefs.current[index] = el)}
                onBlur={() => {
                  if (exp.end_year.trim() === "") {
                    handleCurrentToggle(index, true);
                  }
                }}
              />
            )}
          </div>

          <textarea
            type="text"
            placeholder="업무내용 상세 (예: 모바일 기기용 펌웨어 및 애플리케이션 개발. 주요 프로젝트로는..)"
            value={exp.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
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

export default Career;
