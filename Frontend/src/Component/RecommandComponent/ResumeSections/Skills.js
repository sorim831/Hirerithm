import React from "react";
import "../candidatePage.css";

const Skills = ({ candidates }) => {
  if (!candidates || candidates.length === 0) return null;

  const Skills = candidates.Skills;

  return (
    <div className="image-recommend-result_item-container">
      <div className="image-recommend-result_item">
        <label>SKILLS</label>
        <ul className="image-recommend-license-list">
          {Skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
