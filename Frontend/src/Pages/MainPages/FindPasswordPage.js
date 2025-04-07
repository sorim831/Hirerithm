// src/Pages/MainPages/FindPasswordPage.jsx

import React, { useState } from "react";
import "./styles/FindPasswordPage.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

function FindPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleNext = () => {
    setStep(2);
  };

  return (
    <>
      <NotMemberNavigation />
      <div className="find-password_container">
        <div className="find-password_content">
          {step === 1 ? (
            <>
              <div className="find-password_header">
                <h2 className="find-password_title">
                  비밀번호 찾기&nbsp;
                  <span className="find-password_desc">
                    회원정보에 등록된 개인전화번호로 인증해주세요.
                  </span>
                </h2>
              </div>

              <div className="find-password_box">
                <div className="find-password_inline-field">
                  <label className="find-password_label">
                    메일<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="이메일 입력하세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="find-password_inline-field">
                  <label className="find-password_label">
                    개인전화번호<span className="required">*</span>
                  </label>
                  <div className="find-password_phone-row">
                    <input type="text" placeholder="000" maxLength={3} />
                    <span>-</span>
                    <input type="text" placeholder="0000" maxLength={4} />
                    <span>-</span>
                    <input type="text" placeholder="0000" maxLength={4} />
                    <button className="verify-btn">인증번호 전송</button>
                  </div>
                </div>

                <div className="find-password_inline-field">
                  <label className="find-password_label">
                    인증번호<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="숫자6자리"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <button className="next-btn" onClick={handleNext}>
                  다음
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="find-password_title">비밀번호 재설정</h2>
              <p className="find-password_desc">
                회원정보에 등록된 개인전화번호로 인증되었습니다.
              </p>

              <div className="find-password_box">
              <div className="find-password_inline-field">
                  <label className="find-password_label">
                    메일<span className="required">*</span>
                  </label>
                  <input type="password" placeholder="이메일" />
                </div>

                <div className="find-password_inline-field">
                  <label className="find-password_label">
                    새 비밀번호<span className="required">*</span>
                  </label>
                  <input type="password" placeholder="영문, 숫자, 특수문자 포함" />
                </div>

                <div className="find-password_inline-field">
                  <label className="find-password_label">
                    새 비밀번호 확인<span className="required">*</span>
                  </label>
                  <input type="password" placeholder="영문, 숫자, 특수문자 포함" />
                </div>

                <button className="next-btn">확인</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FindPasswordPage;
