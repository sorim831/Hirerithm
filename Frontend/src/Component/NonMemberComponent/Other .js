import React, { useState } from "react";
import ResumePlusIcon from "../../Image/Icon/ResumePlusIcon.svg";
import DeleteIcon from "../../Image/Icon/DeleteIcon.svg";
import "./resumeComponent.css";

const Other = () => {
  const [otherItems, setOtherItems] = useState([{ note: "" }]);

  const handleChange = (index, value) => {
    const updated = [...otherItems];
    updated[index].note = value;
    setOtherItems(updated);
  };

  const addOther = () => {
    setOtherItems([...otherItems, { note: "" }]);
  };

  const removeOther = (index) => {
    const updated = otherItems.filter((_, i) => i !== index);
    setOtherItems(updated);
  };

  return (
    <div className="resume-item-container">
      {otherItems.map((item, index) => (
        <div className="resume-form-item">
          <input
            id={`other-${index}`}
            type="text"
            placeholder="기타사항 입력 (예: 병역사항, 건강상태 등)"
            value={item.note}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button
            onClick={() => removeOther(index)}
            title="삭제"
            className="delete-button"
          >
            <img src={DeleteIcon} alt="❌" />
          </button>
        </div>
      ))}

      <button onClick={addOther} className="plus-button">
        기타 사항 추가
        <img src={ResumePlusIcon} alt="➕" />
      </button>
    </div>
  );
};

export default Other;
