import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

const Banner = ({ isLoggedIn }) => { // 로그인 여부를 prop으로 받기
  const navigate = useNavigate(); // navigate 함수 선언

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleLogoutClick = () => {
    navigate('/'); // 로그아웃 후 홈페이지로 이동 (로그인 안 한 상태로 돌아가기)
  };

  return (
    <header className="header">
      <div className="logo">
        하이어리즘 <span className="sub-logo">Hire + Algorithm</span>
      </div>
      <nav className="nav">
        <a href="#">추천</a>
        <a href="#">DB 열람</a>
        <a href="#">마이페이지</a>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogoutClick}>
            로그아웃
          </button>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>
            로그인
          </button>
        )}
      </nav>
    </header>
  );
};

export default Banner;
