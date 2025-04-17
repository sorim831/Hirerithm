import React, { useState } from "react";
import "./resumeComponent.css";

const TestResult = () => {
  const [testFile, setTestFile] = useState([{ file: null, note: "" }]);

  const handleFileChange = (index, file) => {
    const updated = [...testFile];
    updated[index].file = file;
    setTestFile(updated);
  };

  return (
    <div className="resume-item-container">
      <div className="resume-form-item">
        {testFile.map((item, index) => (
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(index, e.target.files[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default TestResult;
