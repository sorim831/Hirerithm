import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalMain from "./Pages/MainPages/PersonalMain";
import CorporateMain from "./Pages/MainPages/CorporateMain";
import LoginPage from "./Pages/MainPages/LoginPage";
import SignupPage from "./Pages/MainPages/SignupPage";
import FindIdPage from "./Pages/MainPages/FindIdPage";
import FindPasswordPage from "./Pages/MainPages/FindPasswordPage";
import CorporateImage from "./Pages/RecommendPages/CorporateImage";
import CorporateImageResult from "./Pages/RecommendPages/CorporateImageResult";
import CompanyTest from "./Pages/NonMemberPages/CompanyTest";
import CompanyTestResult from "./Pages/NonMemberPages/CompanyTestResult";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalMain />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find_id" element={<FindIdPage />} />
        <Route path="/find_password" element={<FindPasswordPage />} />
        <Route path="/corporate_main" element={<CorporateMain />} />
        <Route path="/recommend-corporateImage" element={<CorporateImage />} />
        <Route
          path="/recommend-corporateImage/result"
          element={<CorporateImageResult />}
        />
        <Route path="/nonmember/companytest" element={<CompanyTest />} />
        <Route
          path="/nonmember/companytest/result"
          element={<CompanyTestResult />}
        />
      </Routes>
    </Router>
  );
}

export default App;
