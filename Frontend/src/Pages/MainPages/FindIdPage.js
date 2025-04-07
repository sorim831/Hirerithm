// localhost:3000/find_id

import React, { useState } from "react";
import "./styles/FindIdPage.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

function FindIdPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("sgsong***@gmail.com");
  const [date, setDate] = useState("2025.03.26");

  const handleNext = () => {
    // 실제 인증로직은 백엔드 연동 시 추가
    setStep(2);
  };

  return (
    <div className="find-id_container">
      {/* 네비게이션 */}
      <NotMemberNavigation />
      <div className="find-id_content">
      <div className="find-id_header-inline">
  <h2 className="find-id_title">가입된 메일 찾기</h2>
  <span className="find-id_desc-inline">
    회원정보에 등록된 개인전화번호로 본인인증을 해주세요!
  </span>
</div>
        {step === 1 ? (
          <>
            
            <div className="find-id_find-id-box">
            <div className="find-id_header-row">
        
      </div>
              <div className="find-id_form-group">
                <label>
                  이름<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="find-id_form-group">
                <label>
                  개인전화번호<span>*</span>
                </label>
                <div className="find-id_phone-input">
                  <input type="text" placeholder="000" maxLength="3" />
                  <span>-</span>
                  <input type="text" placeholder="0000" maxLength="4" />
                  <span>-</span>
                  <input type="text" placeholder="0000" maxLength="4" />
                  <button className="find-id_verify-btn">인증번호 전송</button>
                </div>
              </div>
              <div className="find-id_form-group">
                <label>
                  인증번호<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="인증번호를 입력하세요 (숫자6자리)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button className="find-id_next-btn" onClick={handleNext}>
                다음
              </button>
            </div>
          </>
        ) : (
          <>
            
            <div className="find-id_result">
              <span className="find-id_email">{email}</span>
              <span className="find-id_date">가입 날짜 : {date}</span>
            </div>
            <div className="find-id_btn-group">
              <button className="find-id_login-action">로그인하기</button>
              <button className="find-id_find-pw">비밀번호 찾기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FindIdPage;
