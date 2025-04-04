import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalMain from "./Pages/MainPages/PersonalMain";
import CorporateMain from "./Pages/MainPages/CorporateMain";
import LoginPage from "./Pages/MainPages/LoginPage";
import SignupPage from "./Pages/MainPages/SignupPage";
import FindIdPage from "./Pages/MainPages/FindIdPage";
import FindPasswordPage from "./Pages/MainPages/FindPasswordPage";
import CorporateImage from "./Pages/RecommendPages/CorporateImage";
import CorporateImageResult from "./Pages/RecommendPages/CorporateImageResult";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalMain />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find_id" element={<FindIdPage />} />
        <Route path="/find_password" element={<FindPasswordPage />} />
        <Route path="/corporate_main" element={<CorporateMain />} />
        <Route path="/recommend/corporateImage" element={<CorporateImage />} />
        <Route
          path="/recommend/corporateImageResult"
          element={<CorporateImageResult />}
        />
      </Routes>
    </Router>
  );
}

export default App;
