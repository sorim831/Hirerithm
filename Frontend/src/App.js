import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // 추가된 LandingPage
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FindIdPage from './pages/FindIdPage';
import FindPasswordPage from './pages/FindPasswordPage';
import Layout from './layout/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <SignupPage />
            </Layout>
          }
        />
        <Route
          path="/find-id"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <FindIdPage />
            </Layout>
          }
        />
        <Route
          path="/find-password"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <FindPasswordPage />
            </Layout>
          }
        />
        <Route
          path="/main"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <MainPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
