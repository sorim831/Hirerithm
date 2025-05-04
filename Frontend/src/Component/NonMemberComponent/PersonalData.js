import React, { useState, useEffect } from "react";
import DaumPost from "./DaumPost";
import LocationIcon from "../../Image/Icon/LocationIcon.svg";
// import Calendar from "../../Component/NonMemberComponent/Calendar";
import "./resumeComponent.css";

const ResumePersonalData = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [birth_date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");

  // 모든 데이터가 변경될 때마다 상위에 전달
  useEffect(() => {
    const newData = {
      name,
      birth_date,
      gender,
      address,
      phone: inputValue,
      current_salary: parseSalary(currentSalary),
      desired_salary: parseSalary(desiredSalary),
    };

    onChange(newData);
  }, [
    name,
    birth_date,
    gender,
    address,
    inputValue,
    currentSalary,
    desiredSalary,
  ]);

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
    let rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);

    let formattedValue = rawValue;
    if (rawValue.length > 4 && rawValue.length <= 6) {
      formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(4)}`;
    } else if (rawValue.length > 6) {
      formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(
        4,
        6
      )}-${rawValue.slice(6)}`;
    }

    setDate(formattedValue);

    // 나이 계산 (하이픈 없이 계산)
    if (rawValue.length === 8) {
      setAge(calculateAge(rawValue)); // YYYYMMDD로 전달
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
          placeholder="예: 2003-02-19"
          className="birth-input"
          value={birth_date}
          onChange={handleBirthChange}
          maxLength={10} // YYYY-MM-DD → 최대 10자
        />

        {age !== null && <p className="age-display">(만 {age}세)</p>}
      </div>

      <div className="resume-form-item">
        <label>
          성별<strong>*</strong>
        </label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">성별 선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
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
          placeholder="010-0000-0000 형식"
          maxLength={13}
        />
      </div>

      <div className="resume-form-item">
        <label>
          연봉정보<strong>*</strong>
        </label>
        <div>
          <input
            type="number"
            placeholder="현재 연봉 (만원)"
            value={currentSalary}
            onChange={(e) =>
              setCurrentSalary(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <span className="won">만원</span>
          /
          <input
            type="number"
            placeholder="희망 연봉 (만원)"
            value={desiredSalary}
            onChange={(e) =>
              setDesiredSalary(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <span className="won">만원</span>
        </div>
      </div>
    </div>
  );
};

export default ResumePersonalData;
