// Resume.js 상위 컴포넌트

import React, { useReducer, useEffect } from "react";
import Resume from "./Resume";
import {
  resumeReducer,
  initialResumeState,
} from "../../reducers/resumeReducer";

const STORAGE_KEY = "resumeData";

const ResumePage = () => {
  const [resumeState, dispatch] = useReducer(
    resumeReducer,
    initialResumeState,
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialResumeState;
    }
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeState));
  }, [resumeState]);

  return <Resume resumeData={resumeState} dispatch={dispatch} />;
};

export default ResumePage;
