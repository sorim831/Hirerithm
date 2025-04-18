import React, { useState, useEffect } from "react";
import DaumPost from "./DaumPost";
import LocationIcon from "../../Image/Icon/LocationIcon.svg";
// import Calendar from "../../Component/NonMemberComponent/Calendar";
import "./resumeComponent.css";

const ResumePersonalData = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [age, setAge] = useState(null);

  // 출생일 입력하면 나이 계산
  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(
      birthDateString.slice(0, 4),
      birthDateString.slice(4, 6) - 1,
      birthDateString.slice(6, 8)
    );

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }

    return age;
  };

  const handleBirthChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
    setDate(rawValue);

    if (rawValue.length === 8) {
      setAge(calculateAge(rawValue));
    } else {
      setAge(null);
    }
  };

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

  // 연봉 '만원' 자동입력
  const formatSalary = (value) => {
    const onlyNums = value.replace(/[^0-9]/g, "");
    return onlyNums ? `${onlyNums}만원` : "";
  };

  const parseSalary = (formattedValue) => {
    return formattedValue.replace(/[^0-9]/g, "");
  };

  return (
    <div className="resume-item-container">
      <div className="resume-form-item">
        <label>
          성명<strong>*</strong>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 입력"
        />
      </div>

      <div className="resume-form-item">
        <label>
          출생<strong>*</strong>
        </label>
        <input
          type="text"
          placeholder="예: 20030219"
          className="birth-input"
          value={date}
          onChange={handleBirthChange}
          maxLength={8}
        />

        {age !== null && <p className="age-display">(만 {age}세)</p>}
      </div>

      <div className="resume-form-item">
        <label>
          성별<strong>*</strong>
        </label>
        <select>
          <option>남성</option>
          <option>여성</option>
        </select>
      </div>

      {/* 주소 검색 */}
      <div className="resume-form-item">
        <label>
          주소<strong>*</strong>
        </label>
        <div className="adress-input">
          <input
            value={address}
            onClick={() => setIsOpen(true)}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소 검색"
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

      <div className="resume-form-item">
        <label>
          연락처<strong>*</strong>
        </label>
        <input
          type="text"
          onChange={handlePhoneChange}
          value={inputValue}
          placeholder="개인 전화번호"
          maxLength={13}
        />
      </div>

      <div className="resume-form-item">
        <label>
          연봉정보<strong>*</strong>
        </label>
        <div>
          <input
            type="text"
            placeholder="현재 연봉 (만원)"
            value={formatSalary(currentSalary)}
            onChange={(e) => setCurrentSalary(parseSalary(e.target.value))}
          />
          /
          <input
            type="text"
            placeholder="희망 연봉 (만원)"
            value={formatSalary(desiredSalary)}
            onChange={(e) => setDesiredSalary(parseSalary(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumePersonalData;
