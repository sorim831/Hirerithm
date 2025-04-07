import React, { useState } from "react";
import "./styles/SignupPage.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

// 약관 배열
const terms = [
  { required: true, title: "서비스 이용약관 동의", content: "서비스 이용 약관 내용입니다." },
  { required: true, title: "개인정보 수집 및 이용 동의", content: "개인정보 처리방침 내용입니다." },
  { required: true, title: "문자서비스 이용약관 동의", content: "문자서비스 약관 내용입니다." },
  { required: false, title: "개인정보보호 및 이용 동의", content: "개인정보 보호 상세 내용입니다." },
  { required: false, title: "광고성 정보 수신 동의", content: "광고성 정보 수신 내용입니다." }
];

function SignUpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTerm = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="signup_wrapper">
      <NotMemberNavigation />

      <form className="signup_form">
        {/* 약관동의 */}
        <h2 className="signup_section-title">
          약관동의<span className="required">*</span>
        </h2>
        <div className="signup_terms-box">
        <div className="signup_term-all">
  <input type="checkbox" id="all-agree" className="signup_checkbox" />
  <label htmlFor="all-agree">전체동의</label>
</div>
<p className="signup_term-all-sub">
  선택항목 포함 모든 약관에 동의합니다.
</p>
  <hr className="signup_divider" />

  {terms.map((term, idx) => (
  <div key={idx} className="signup_term-section">
    <div className="signup_term-title">
      <input
        type="checkbox"
        id={`term-${idx}`}
        className="signup_checkbox"
      />
      <label htmlFor={`term-${idx}`} className="term-title-text">
        <span className={term.required ? "green-star" : ""}>
          {term.required ? "＊" : ""}
        </span>
        {term.title}
      </label>
      <span
        className="signup_arrow"
        onClick={() => toggleTerm(idx)}
      >
        {openIndex === idx ? "▲" : "▼"}
      </span>
    </div>

    {/* 열기 토글 조건부 렌더링 */}
    {openIndex === idx && (
      <div className="signup_term-content">{term.content}</div>
    )}

    {/* 구분선 조건 */}
    {term.title === "문자서비스 이용약관 동의" && (
      <hr className="signup_divider" />
    )}
  </div>
))}


</div>



        {/* 이름 */}
        <div className="signup_form-group">
          <label>
            이름<span className="required">*</span>
          </label>
          <input type="text" placeholder="이름을 입력하세요." />
        </div>

        {/* 이메일 */}
        <div className="signup_form-group horizontal">
          <label>
            이메일<span className="required">*</span>
          </label>
          <div className="signup_input-with-btn">
            <input
              type="email"
              placeholder="이메일을 입력하세요. (예: example@gmail.com)"
            />
            <button className="signup_btn-secondary">중복 확인</button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="signup_form-group">
          <label>
            비밀번호<span className="required">*</span>
          </label>
          <input type="password" placeholder="비밀번호 입력 (영문, 숫자, 특수문자 포함)" />
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup_form-group">
          <label>
            비밀번호 확인<span className="required">*</span>
          </label>
          <input type="password" placeholder="비밀번호 입력 (영문, 숫자, 특수문자 포함)" />
        </div>

        {/* 전화번호 */}
        <div className="signup_form-group horizontal">
          <label>
            개인전화번호<span className="required">*</span>
          </label>
          <div className="signup_phone-wrapper">
            <input type="text" placeholder="000" maxLength={3} />
            <span>-</span>
            <input type="text" placeholder="0000" maxLength={4} />
            <span>-</span>
            <input type="text" placeholder="0000" maxLength={4} />
            <button className="signup_btn-secondary">인증번호 전송</button>
          </div>
        </div>

        {/* 인증번호 */}
        <div className="signup_form-group">
          <label>
            인증번호<span className="required">*</span>
          </label>
          <input type="text" placeholder="숫자6자리" />
        </div>

        {/* 회원형식 */}
        <div className="signup_form-group">
          <label>
            회원 형식<span className="required">*</span>
          </label>
          <select>
            <option>회원 형식을 선택하세요.</option>
            <option>개인</option>
            <option>기업회원</option>
            <option>헤드헌터</option>
          </select>
        </div>

        {/* 회사/점포명 */}
        <div className="signup_form-group">
          <label>
            회사/점포명<span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="회사/점포명을 입력해주세요. (ex. oo테크, oo기업)"
          />
        </div>

        <button className="signup_submit-btn">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
