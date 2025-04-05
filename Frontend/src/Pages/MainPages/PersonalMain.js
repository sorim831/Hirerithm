// localhost:3000

import React from "react";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* 네비게이션 */}
      <NotMemberNavigation />

    </div>
  );
}

export default LandingPage;
