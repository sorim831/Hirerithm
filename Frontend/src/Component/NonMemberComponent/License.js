import React, { useState, useEffect } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const License = ({ onChange }) => {
  const [license, setLicense] = useState([
    {
      issued_date: "",
      certificate_name: "",
      certificate_number: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...license];
    updated[index][field] = value;
    setLicense(updated);
  };

  const addLicense = () => {
    setLicense([
      ...license,
      {
        issued_date: "",
        certificate_name: "",
        certificate_number: "",
      },
    ]);
  };

  const removeLicense = (index) => {
    const updated = license.filter((_, i) => i !== index);
    setLicense(updated);
  };

  useEffect(() => {
    const filtered = license.filter(
      (item) =>
        item.issued_date ||
        item.certificate_name ||
        item.issuing_org ||
        item.certificate_number
    );

    onChange(filtered);
  }, [license]);

  return (
    <div className="resume-item-container">
      {license.map((item, index) => (
        <div className="resume-form-item" key={index}>
          <input
            type="text"
            placeholder="취득일 (예: 2025-04-17)"
            value={item.issued_date}
            onChange={(e) => handleChange(index, "issued_date", e.target.value)}
            className="date-input"
          />
          /
          <input
            type="text"
            placeholder="자격증 이름"
            value={item.certificate_name}
            onChange={(e) =>
              handleChange(index, "certificate_name", e.target.value)
            }
          />
          /
          <input
            type="text"
            placeholder="자격번호 (예: 20210520-12345)"
            value={item.certificate_number}
            onChange={(e) =>
              handleChange(index, "certificate_number", e.target.value)
            }
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
