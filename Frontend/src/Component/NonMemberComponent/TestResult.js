import React, { useState } from "react";

const TestResult = () => {
  const [testFile, setTestFile] = useState([{ file: null, note: "" }]);

  const handleFileChange = (index, file) => {
    const updated = [...testFile];
    updated[index].file = file;
    setTestFile(updated);
  };

  return (
    <div className="resume-item-container">
      <label className="resume-title-label">맞춤기업 TEST 결과 파일</label>
      <p>
        맞춤기업 TEST 결과를 업로드하면 나와 잘 맞는 기업과 매칭될 확률이
        올라갑니다!
      </p>
      <div className="resume-form-item">
        {testFile.map((item, index) => (
          <div key={index} className="mb-2 flex items-center gap-2">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResult;
