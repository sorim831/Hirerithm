import React, { useState, useEffect } from "react";
import DaumPost from "./DaumPost";
import LocationIcon from "../../Image/Icon/LocationIcon.svg";
import CalendarIcon from "../../Image/Icon/CalendarIcon.svg";

const ResumePersonalData = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");

  // 전화번호 하이픈 자동 입력
  useEffect(() => {
    let rawValue = inputValue.replace(/[^0-9]/g, "");
    if (rawValue.length <= 3) {
      setInputValue(rawValue);
    } else if (rawValue.length <= 7) {
      setInputValue(`${rawValue.slice(0, 3)}-${rawValue.slice(3)}`);
    } else if (rawValue.length <= 11) {
      setInputValue(
        `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7)}`
      );
    }
  }, [inputValue]);

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length <= 11) {
      setInputValue(e.target.value);
    }
  };

  const handleAddressComplete = (data) => {
    if (data) {
      setAddress(data.address);
    }
    setIsOpen(false);
  };

  return (
    <div className="resume-item-container">
      <label className="resume-title-label">인적사항</label>
      <div className="resume-form-item">
        <div>
          <label>출생</label>
          <div>
            <input type="date" className="custom-date-input" />
            <img src={CalendarIcon} alt="달력" className="calendar-icon" />
          </div>
        </div>

        <div>
          <label>성별</label>
          <select>
            <option>남성</option>
            <option>여성</option>
          </select>
        </div>

        {/* 주소 검색 */}
        <div>
          <label>주소</label>
          <div>
            <input
              value={address}
              onClick={() => setIsOpen(true)}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력하거나 검색 버튼을 클릭하세요"
            />

            <button type="button" onClick={() => setIsOpen(true)}>
              <img src={LocationIcon} alt="위치검색" />
            </button>
          </div>
          {isOpen && (
            <DaumPost
              onComplete={handleAddressComplete}
              setAddress={setAddress}
            />
          )}
        </div>

        <div>
          <label>연락처</label>
          <input
            type="text"
            onChange={handlePhoneChange}
            value={inputValue}
            placeholder="010-1234-5678"
            maxLength={13}
          />
        </div>

        <div>
          <label>연봉정보</label>
          <div>
            <input
              type="text"
              placeholder="현재 연봉 (만원)"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
            />
            /
            <input
              type="text"
              placeholder="희망 연봉 (만원)"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePersonalData;
