import React, { useState } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";

const License = () => {
  const [license, setLicense] = useState([{ name: "", date: "", number: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...license];
    updated[index][field] = value;
    setLicense(updated);
  };

  const addLicense = () => {
    setLicense([...license, { name: "", date: "", number: "" }]);
  };

  const removeLicense = (index) => {
    const updated = license.filter((_, i) => i !== index);
    setLicense(updated);
  };

  return (
    <div className="resume-item-container">
      <label className="resume-title-label">자격증</label>
      <div className="resume-form-item">
        {license.map((item, index) => (
          <div key={index}>
            <div>
              <input
                id={`license-name-${index}`}
                type="text"
                placeholder="자격증 이름"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            /
            <div>
              <input
                id={`license-date-${index}`}
                type="date"
                value={item.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
              />
            </div>
            /
            <div>
              <input
                id={`license-number-${index}`}
                type="text"
                placeholder="자격번호 (예: 12345678901A)"
                value={item.number}
                onChange={(e) => handleChange(index, "number", e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => removeLicense(index)} title="삭제">
                <img src={DeleteIcon} alt="삭제" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addLicense}>
        자격증 추가 <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default License;
