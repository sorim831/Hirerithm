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
  const [workExperience, setWorkExperience] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
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
    <div className="resume-item">
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
            placeholder="8자리 생년월일 입력"
            className="birth-input"
            value={birth_date}
            onChange={(e) => setDate(e.target.value)}
            maxLength={8}
          />
        </div>

        <div className="resume-form-item">
          <label>
            성별<strong>*</strong>
          </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option disabled value="">
              클릭해 성별 선택
            </option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <option value="기타">기타</option>
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
              placeholder="주소 입력"
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

        {/* 연락처 입력 */}
        <div className="resume-form-item">
          <label>
            연락처<strong>*</strong>
          </label>
          <input
            type="text"
            onChange={handlePhoneChange}
            value={inputValue}
            placeholder="' - ' (하이픈) 제외 입력"
            maxLength={13}
          />
        </div>

        {/* 경력 여부 선택 */}
        <div className="resume-form-item">
          <label>
            경력 여부<strong>*</strong>
          </label>
          <select
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
          >
            <option disabled value="">
              클릭해 경력 여부 선택
            </option>
            <option value="신입">신입</option>
            <option value="경력">경력직</option>
          </select>
        </div>

        {/* 연봉정보 - 경력 선택 시에만 노출 */}
        {workExperience === "경력" && (
          <div className="resume-form-item">
            <label>
              연봉정보<strong>*</strong>
            </label>
            <div>
              <input
                type="number"
                placeholder="현재 연봉"
                value={currentSalary}
                onChange={(e) =>
                  setCurrentSalary(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              <span className="won">만원</span>
              /
              <input
                type="number"
                placeholder="희망 연봉"
                value={desiredSalary}
                onChange={(e) =>
                  setDesiredSalary(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              <span className="won">만원</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePersonalData;
