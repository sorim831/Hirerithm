import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalMain from "./Pages/MainPages/PersonalMain";
import CorporateMain from "./Pages/MainPages/CorporateMain";
import LoginPage from "./Pages/MainPages/LoginPage";
import SignupPage from "./Pages/MainPages/SignupPage";
import FindIdPage from "./Pages/MainPages/FindIdPage";
import FindPasswordPage from "./Pages/MainPages/FindPasswordPage";
import CorporateImage from "./Pages/RecommendPages/CorporateImage";
import CorporateImageResult from "./Pages/RecommendPages/CorporateImageResult";
import StrengthRecommend from "./Pages/RecommendPages/StrengthRecommend";
import StrengthResult from "./Pages/RecommendPages/StrengthResult";
import Resume from "./Pages/NonMemberPages/Resume";
import FullViewMainPage from "./Pages/FullViewPages/FullViewMainPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 에인페이지 */}
        <Route path="/user" element={<PersonalMain />} />
        <Route path="/" element={<CorporateMain />} />
        <Route path="/headhunter" element={<CorporateMain />} />

        {/* 로그인 & 회원가입 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find_id" element={<FindIdPage />} />
        <Route path="/find_password" element={<FindPasswordPage />} />

        {/* 추천 페이지 */}
        <Route path="/recommend_corporateImage" element={<CorporateImage />} />
        <Route path="/recommend_strength" element={<StrengthRecommend />} />

        {/* 추천 결과 페이지 */}
        <Route
          path="/recommend_corporateImage/result"
          element={<CorporateImageResult />}
        />
        <Route path="/recommend_strength/result" element={<StrengthResult />} />

        {/* NonMember(구직자) 이력서 등록 페이지 */}
        <Route path="/resume_registration" element={<Resume />} />

        {/* DB 전체 열람 페이지 */}
        <Route path="/full_view" element={<FullViewMainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
