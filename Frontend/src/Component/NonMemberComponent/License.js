import React, { useState } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const License = () => {
  const [license, setLicense] = useState([{ date: "", name: "", number: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...license];
    updated[index][field] = value;
    setLicense(updated);
  };

  const addLicense = () => {
    setLicense([...license, { date: "", name: "", number: "" }]);
  };

  const removeLicense = (index) => {
    const updated = license.filter((_, i) => i !== index);
    setLicense(updated);
  };

  return (
    <div className="resume-item-container">
      {license.map((item, index) => (
        <div className="resume-form-item">
          <input
            id={`license-date-${index}`}
            type="text"
            placeholder="취득일 (예: 20250417)"
            value={item.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
            className="date-input"
          />
          /
          <input
            id={`license-name-${index}`}
            type="text"
            placeholder="자격증 이름"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          /
          <input
            id={`license-number-${index}`}
            type="text"
            placeholder="자격번호 (예: 12345678901A)"
            value={item.number}
            onChange={(e) => handleChange(index, "number", e.target.value)}
          />
          <div>
            <button
              onClick={() => removeLicense(index)}
              title="삭제"
              className="delete-button"
            >
              <img src={DeleteIcon} alt="❌" />
            </button>
          </div>
        </div>
      ))}

      <button onClick={addLicense} className="plus-button">
        자격증 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default License;
