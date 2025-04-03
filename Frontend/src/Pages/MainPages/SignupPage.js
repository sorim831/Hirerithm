// localhost:3000/signup

import React, { useState } from "react";
import "./styles/SignupPage.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

const terms = [
  {
    title: "서비스 이용약관 동의",
    content: "이용약관에 대한 상세 내용이 여기에 표시됩니다.",
  },
  {
    title: "개인정보 수집 및 이용 동의",
    content: "개인정보 처리방침 내용이 여기에 표시됩니다.",
  },
  {
    title: "문자서비스 이용약관 동의",
    content: "문자 발송에 대한 동의 내용이 여기에 표시됩니다.",
  },
  {
    title: "광고성 정보 수신 동의",
    content: "광고성 정보에 대한 수신 동의 내용입니다.",
  },
];

function SignUpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTerm = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="signup_wrapper">
      {/* 네비게이션 */}
      <NotMemberNavigation />

      <form className="signup_form">
        <h2>약관동의*</h2>
        <div className="signup_terms-box">
          {terms.map((term, idx) => (
            <div key={idx} className="signup_term-section">
              <div
                className="signup_term-title"
                onClick={() => toggleTerm(idx)}
              >
                {term.title}
                <span className="signup_arrow">
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </div>
              {openIndex === idx && (
                <div className="signup_term-content">{term.content}</div>
              )}
            </div>
          ))}
        </div>

        <div className="signup_form-group">
          <label>이름*</label>
          <input type="text" placeholder="이름을 입력하세요" />
        </div>
        <div className="signup_form-group">
          <label>이메일*</label>
          <input type="email" placeholder="예: example@gmail.com" />
        </div>
        <div className="signup_form-group">
          <label>비밀번호*</label>
          <input type="password" placeholder="영문, 숫자, 특수문자 포함" />
        </div>
        <div className="signup_form-group">
          <label>비밀번호 확인*</label>
          <input type="password" placeholder="비밀번호 재입력" />
        </div>

        <div className="signup_form-group phone-group">
          <label>개인전화번호*</label>
          <input type="text" placeholder="000" maxLength={3} />
          <span>-</span>
          <input type="text" placeholder="0000" maxLength={4} />
          <span>-</span>
          <input type="text" placeholder="0000" maxLength={4} />
        </div>

        <div className="signup_form-group">
          <label>인증번호*</label>
          <input type="text" placeholder="인증번호 입력" />
        </div>
        <div className="signup_form-group">
          <label>회원 형식*</label>
          <select>
            <option>선택하세요</option>
            <option>개인</option>
            <option>기업회원</option>
            <option>헤드헌터</option>
          </select>
        </div>
        <div className="signup_form-group">
          <label>회사/점포명*</label>
          <input type="text" placeholder="oo테크, oo기업" />
        </div>

        <button className="signup_submit-btn">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
