import React, { useState } from 'react';
import './styles/FindIdPage.css';
import Banner from "../Component/Banner";


function FindIdPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('sgsong***@gmail.com');
  const [date, setDate] = useState('2025.03.26');

  const handleNext = () => {
    // 실제 인증로직은 백엔드 연동 시 추가
    setStep(2);
  };

  return (
    <div className="find-id-container">
      <div className="find-id-content">
        {step === 1 ? (
          <>
            <h2>가입된 메일 찾기</h2>
            <p className="desc">회원정보에 등록된 개인전화번호로 본인인증을 해주세요!</p>
            <div className="find-id-box">
              <div className="form-group">
                <label>이름<span>*</span></label>
                <input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>개인전화번호<span>*</span></label>
                <div className="phone-input">
                  <input type="text" placeholder="000" maxLength="3" />
                  <span>-</span>
                  <input type="text" placeholder="0000" maxLength="4" />
                  <span>-</span>
                  <input type="text" placeholder="0000" maxLength="4" />
                  <button className="verify-btn">인증번호 전송</button>
                </div>
              </div>
              <div className="form-group">
                <label>인증번호<span>*</span></label>
                <input type="text" placeholder="인증번호를 입력하세요 (숫자6자리)" value={code} onChange={(e) => setCode(e.target.value)} />
              </div>
              <button className="next-btn" onClick={handleNext}>다음</button>
            </div>
          </>
        ) : (
          <>
            <h2>가입된 메일 찾기</h2>
            <p className="desc">회원 정보에 등록되어있는 메일을 찾았어요!</p>
            <div className="find-id-result">
              <span className="email">{email}</span>
              <span className="date">가입 날짜 : {date}</span>
            </div>
            <div className="btn-group">
              <button className="login-action">로그인하기</button>
              <button className="find-pw">비밀번호 찾기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FindIdPage;
