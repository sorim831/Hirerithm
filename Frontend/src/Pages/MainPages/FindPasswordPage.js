// localhost:3000/find_password

import React, { useState } from "react";
import "./styles/FindPasswordPage.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const handleVerify = () => {
    // 인증 코드 검증 후 다음 단계로 전환
    setStep(2);
  };

  return (
    <div className="find-password_wrapper">
      {/* 네비게이션 */}
      <NotMemberNavigation />

      <h2 className="find-password_title">비밀번호 찾기</h2>
      <p className="find-password_desc">
        회원정보에 등록된 개인전화번호로 인증해주세요.
      </p>

      <div className="find-password_form-box">
        {step === 1 ? (
          <>
            <label>
              메일<span className="find-password_required">*</span>
            </label>
            <input
              type="email"
              placeholder="이메일 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>
              개인전화번호<span className="find-password_required">*</span>
            </label>
            <div className="find-password_phone-input">
              <input type="text" placeholder="000" maxLength={3} />
              <span>-</span>
              <input type="text" placeholder="0000" maxLength={4} />
              <span>-</span>
              <input type="text" placeholder="0000" maxLength={4} />
              <button className="find-password_btn-send-code">
                인증번호 전송
              </button>
            </div>

            <label>
              인증번호<span className="find-password_required">*</span>
            </label>
            <input
              type="text"
              placeholder="숫자6자리"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              className="find-password_btn-confirm"
              onClick={handleVerify}
            >
              다음
            </button>
          </>
        ) : (
          <>
            <h3 className="find-password_title">비밀번호 재설정</h3>
            <p className="find-password_desc">
              회원정보에 등록된 개인전화번호로 인증되었습니다.
            </p>

            <label className="find-password_label">
              메일<span className="find-password_required">*</span>
            </label>

            <div className="find-password_email-readonly">
              {email || "sgsong831@gmail.com"}
            </div>

            <label className="find-password_label">
              새 비밀번호<span className="find-password_required">*</span>
            </label>

            <input type="password" placeholder="영문, 숫자, 특수문자 포함" />

            <label className="find-password_label">
              새 비밀번호 확인<span className="find-password_required">*</span>
            </label>

            <input type="password" placeholder="영문, 숫자, 특수문자 포함" />

            <button className="find-password_btn-confirm">확인</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FindPasswordPage;
