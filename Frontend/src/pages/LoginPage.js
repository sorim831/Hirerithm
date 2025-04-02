// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FaUser, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'test@test.com' && password === '1234') {
      navigate('/main');
    } else {
      alert('로그인 정보가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="input-icon">
            <FaUser />
            <input
              type="email"
              placeholder="메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-icon">
            <FaKey />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit">로그인</button>
        </form>
        <div className="login-links">
          <Link to="/find-id">아이디 찾기</Link>
          <Link to="/find-password">비밀번호 찾기</Link>
          <Link to="/signup" className="join-link">회원가입</Link>
        
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
