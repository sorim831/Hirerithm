import React from "react";
import "../candidatePage.css";

const Other = ({ candidates }) => {
  if (!candidates || candidates.length === 0) return null;

  const Other = candidates.other;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>기타</label>
        <ul className="image-recommend-license-list">
          {Other.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Other;
