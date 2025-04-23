import React from "react";
import "../candidatePage.css";

const AcademicAbility = ({ candidates }) => {
  if (!candidates || !candidates.education) return null;

  const educationList = candidates.education;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>학력</label>
        <ul>
          {educationList.map((edu, index) => (
            <li key={index}>
              {edu.school} / {edu.major} / {edu.year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AcademicAbility;
