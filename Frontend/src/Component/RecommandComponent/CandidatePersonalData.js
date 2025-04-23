import React from "react";
import "./candidatePage.css";
import AcademicAbility from "./ResumeSections/AcademicAbility";
import Experience from "./ResumeSections/Experience";
import License from "./ResumeSections/License";
import Other from "./ResumeSections/Other";
import PersonalInfo from "./ResumeSections/PersonalInfo";
import Skiils from "./ResumeSections/Skills";

const CandidatePersonalData = ({ candidates }) => {
  return (
    <div>
      <PersonalInfo candidates={candidates} />

      <AcademicAbility candidates={candidates} />

      <Experience candidates={candidates} />

      <License candidates={candidates} />

      <Skiils candidates={candidates} />

      <Other candidates={candidates} />
    </div>
  );
};

export default CandidatePersonalData;
