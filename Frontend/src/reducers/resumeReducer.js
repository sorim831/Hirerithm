// 상태 초기값
export const initialResumeState = {
  personalData: {},
  education: [],
  career: [],
  certificates: [],
  skills: [],
  otherinfo: {},
  companyTest: null,
};

// 리듀서 함수
export function resumeReducer(state, action) {
  switch (action.type) {
    case "SET_PERSONAL":
      return { ...state, personalData: action.payload };
    case "SET_EDUCATION":
      return { ...state, education: action.payload };
    case "SET_CAREER":
      return { ...state, career: action.payload };
    case "SET_CERTIFICATES":
      return { ...state, certificates: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_OTHERINFO":
      return { ...state, otherinfo: action.payload };
    case "SET_COMPANYTEST":
      return { ...state, companyTest: action.payload };
    default:
      return state;
  }
}
