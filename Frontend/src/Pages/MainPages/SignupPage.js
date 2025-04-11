import React, { useState } from "react";
import "./styles/SignupPage.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import axios from "axios";

const terms = [
  { required: true, title: "서비스 이용약관 동의", content: "서비스 이용 약관 내용입니다." },
  { required: true, title: "개인정보 수집 및 이용 동의", content: "개인정보 처리방침 내용입니다." },
  { required: true, title: "문자서비스 이용약관 동의", content: "문자서비스 약관 내용입니다." },
  { required: false, title: "개인정보보호 및 이용 동의", content: "개인정보 보호 상세 내용입니다." },
  { required: false, title: "광고성 정보 수신 동의", content: "광고성 정보 수신 내용입니다." }
];

function SignUpPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone1: "",
    phone2: "",
    phone3: "",
    verify_code: "",
    role: "",
    company_name: "",
  });

  const toggleTerm = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. 필수 필드 검사
    const { name, email, password, passwordConfirm, phone1, phone2, phone3, role, company_name } = formData;
    if (!name || !email || !password || !passwordConfirm || !phone1 || !phone2 || !phone3 || !role || !company_name) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 2. 비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const phone = `${phone1}-${phone2}-${phone3}`;

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password,
        phone,
        role,
        company_name,
      });

      alert("회원가입 성공!");
    } catch (err) {
      alert("회원가입 실패: " + (err.response?.data?.message || "서버 오류"));
    }
  };

  return (
    <div className="signup_wrapper">
      <NotMemberNavigation />
      <form className="signup_form" onSubmit={handleSignup}>
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
                <input type="checkbox" id={`term-${idx}`} className="signup_checkbox" />
                <label htmlFor={`term-${idx}`} className="term-title-text">
                  <span className={term.required ? "green-star" : ""}>
                    {term.required ? "＊" : ""}
                  </span>
                  {term.title}
                </label>
                <span className="signup_arrow" onClick={() => toggleTerm(idx)}>
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </div>
              {openIndex === idx && (
                <div className="signup_term-content">{term.content}</div>
              )}
              {term.title === "문자서비스 이용약관 동의" && (
                <hr className="signup_divider" />
              )}
            </div>
          ))}
        </div>

        {/* 이름 */}
        <div className="signup_form-group">
          <label>이름<span className="required">*</span></label>
          <input type="text" name="name" placeholder="이름을 입력하세요." onChange={handleChange} />
        </div>

        {/* 이메일 */}
        <div className="signup_form-group horizontal">
          <label>이메일<span className="required">*</span></label>
          <div className="signup_input-with-btn">
            <input type="email" name="email" placeholder="예: example@gmail.com" onChange={handleChange} />
            <button type="button" className="signup_btn-secondary">중복 확인</button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="signup_form-group">
          <label>비밀번호<span className="required">*</span></label>
          <input type="password" name="password" placeholder="비밀번호 입력" onChange={handleChange} />
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup_form-group">
          <label>비밀번호 확인<span className="required">*</span></label>
          <input type="password" name="passwordConfirm" placeholder="비밀번호 재입력" onChange={handleChange} />
        </div>

        {/* 전화번호 */}
        <div className="signup_form-group horizontal">
          <label>개인전화번호<span className="required">*</span></label>
          <div className="signup_phone-wrapper">
            <input type="text" name="phone1" maxLength={3} onChange={handleChange} />
            <span>-</span>
            <input type="text" name="phone2" maxLength={4} onChange={handleChange} />
            <span>-</span>
            <input type="text" name="phone3" maxLength={4} onChange={handleChange} />
            <button type="button" className="signup_btn-secondary">인증번호 전송</button>
          </div>
        </div>

        {/* 인증번호 */}
        <div className="signup_form-group">
          <label>인증번호<span className="required">*</span></label>
          <input type="text" name="verify_code" onChange={handleChange} />
        </div>

        {/* 회원 형식 */}
        <div className="signup_form-group">
          <label>회원 형식<span className="required">*</span></label>
          <select name="role" onChange={handleChange}>
            <option value="">회원 형식을 선택하세요</option>
            <option value="personal">개인</option>
            <option value="company">기업회원</option>
            <option value="headhunter">헤드헌터</option>
          </select>
        </div>

        {/* 회사명 */}
        <div className="signup_form-group">
          <label>회사/점포명<span className="required">*</span></label>
          <input type="text" name="company_name" placeholder="회사/점포명을 입력해주세요." onChange={handleChange} />
        </div>

        <button type="submit" className="signup_submit-btn" onChange={handleSignup}>가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
