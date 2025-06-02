import { useState, useEffect } from "react";
import axios from "axios";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import RefreshIcon from "../../Image/Icon/RefreshIcon.svg";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./fullViewMainPage.css";
import ProfileDetail from "../../Component/FullViewComponent/ProfileDetail";
import CareerFilterBar from "../../Component/FullViewComponent/CareerFilterBar";
import EducationFilterBar from "../../Component/FullViewComponent/EducationFilterBar";
import CompanyTypeFilterBar from "../../Component/FullViewComponent/CompanyTypeFilterBar";

const FullViewMainPage = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [sortType, setSortType] = useState("latest");
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const toggleDetailModal = () => setDetailModalOpen((prev) => !prev);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringRefresh, setIsHoveringRefresh] = useState(false);

  // 필터링바 관련 상태 관리
  const [selectedCareer, setSelectedCareer] = useState("무관");
  const [selectedEducation, setSelectedEducation] = useState("무관");
  const [selectedCompanyType, setSelectedCompanyType] = useState("무관");

  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    getCandidateList();
  }, []);

  // 후보자 데이터 받아오기
  const getCandidateList = () => {
    setIsLoading(true);
    axios
      .get(`${BACK_URL}/resume/list`)
      .then((res) => {
        setCandidateData(res.data);
        console.log("후보자 0번:", res.data[0]); // 개발용 데이터 예시
        console.log("후보자 1번:", res.data[1]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("후보자 데이터 가져오기 에러:", err.message);
        setIsLoading(false);
      });
  };

  // 클릭 시 선택된 후보 모달 열기
  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setDetailModalOpen(true);
  };

  // 경력 계산 함수 (start_year~end_year 기준)
  const calculateExperienceYears = (careerList) => {
    if (!careerList || careerList.length === 0) return 0;
    const totalMonths = careerList.reduce((sum, item) => {
      const start = new Date(item.start_year);
      const end = new Date(item.end_year || new Date());
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      return sum + (months > 0 ? months : 0);
    }, 0);
    return Math.floor(totalMonths / 12);
  };

  // 학력 필터링 함수
  const passesEducationFilter = (educationList) => {
    const degreeOrder = {
      초등학교: 1,
      중학교: 2,
      고등학교: 3,
      학사: 4,
      석사: 5,
      박사: 6,
    };

    const required = {
      무관: 0,
      "초등학교 졸업 이상": 1,
      "중학교 졸업 이상": 2,
      "고등학교 졸업 이상": 3,
      "학사 학위 이상": 4,
      "석사 학위 이상": 5,
      "박사 학위 이상": 6,
    }[selectedEducation];

    if (!educationList || educationList.length === 0) return false;

    const maxDegree = Math.max(
      ...educationList.map((e) => degreeOrder[e.degree] || 0)
    );

    return maxDegree >= required;
  };

  // 맞춤기업 TEST 결과 유형 필터링
  const passesCompanyTypeFilter = (companyTest) => {
    if (!companyTest || !companyTest.scores) return false;
    if (selectedCompanyType === "무관") return true;

    const scoreMap = {
      "평가 및 성장 가능성 강점 기업 인재": companyTest.scores.Evaluation,
      "높은 보상 강점 기업 인재": companyTest.scores.PayLevel,
      "비전 및 방향성 강점 기업 인재": companyTest.scores.VisionDirection,
      "복지 강점 기업 인재": companyTest.scores.Welfare,
      "업무 강도 강점 기업 인재": companyTest.scores.Workload,
    };

    const highestType = Object.entries(scoreMap).reduce((max, cur) => {
      return cur[1] > max[1] ? cur : max;
    })[0];

    return selectedCompanyType === highestType;
  };

  // 후보자 필터링 함수
  const filteredCandidates = candidateData.filter((candidate) => {
    const years = calculateExperienceYears(candidate.career);
    const educationOk = passesEducationFilter(candidate.education);
    const companyTypeOk = passesCompanyTypeFilter(candidate.companyTest);

    const careerPass = (() => {
      switch (selectedCareer) {
        case "신입":
          return years === 0;
        case "1-5년":
          return years >= 1 && years <= 5;
        case "6-10년":
          return years >= 6 && years <= 10;
        case "11-15년":
          return years >= 11 && years <= 15;
        case "16-19년":
          return years >= 16 && years <= 19;
        case "20년 이상":
          return years >= 20;
        default:
          return true;
      }
    })();

    return careerPass && educationOk && companyTypeOk;
  });

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000); // 짧은 지연 후 로딩 해제
      return () => clearTimeout(timeout);
    }
  }, [filteredCandidates]); // 결과가 바뀌면 실행

  return (
    <div className="full-view-main-wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />
      <header>
        {/* 페이지 인덱스 */}
        <div className="full-view-main-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>전체 DB 열람</h2>
        </div>

        {/* 페이지 소개글 */}
        <p>
          하이어리즘에서 열람 가능한 후보자 전체 DB 입니다. 더 자세한 필터링을
          원하시면 '추천' 서비스를 이용해보세요!
        </p>
      </header>

      <div className="filter-search-section">
        <div className="filter-controls">
          <div className="filter-wrapper">
            {/* 경력 필터링바 */}
            <CareerFilterBar
              selectedCareer={selectedCareer}
              onChange={(e) => {
                setSelectedCareer(e.target.value);
                setIsLoading(true);
              }}
            />
            {/* 학력 필터링바 */}
            <EducationFilterBar
              selectedEducation={selectedEducation}
              onChange={(e) => {
                setSelectedEducation(e.target.value);
                setIsLoading(true);
              }}
            />
            {/* 맞춤기업 TEST 결과 유형 필터링바 */}
            <CompanyTypeFilterBar
              selectedCompanyType={selectedCompanyType}
              onChange={(e) => {
                setSelectedCompanyType(e.target.value);
                setIsLoading(true);
              }}
            />
          </div>

          {/* 검색 바 */}
          <div className="search-bar">
            <img src={SearchIcon} alt="검색" className="search-icon" />
            <input type="text" placeholder="후보자명 / SKILLS / 전공명 검색" />
          </div>
        </div>

        <div className="search-and-buttons-wrapper">
          {/* 최신순 / 인기순 필터링 버튼, 새로고침 버튼*/}
          <div className="sort-refresh-btns">
            <button
              className={`sort-filter-btn ${
                sortType === "latest" ? "selected" : ""
              }`}
              onClick={() => setSortType("latest")}
            >
              최신순
            </button>
            <button
              className={`sort-filter-btn ${
                sortType === "popular" ? "selected" : ""
              }`}
              onClick={() => setSortType("popular")}
            >
              인기순
            </button>
            <div
              className="refresh-btn-wrapper"
              onMouseEnter={() => setIsHoveringRefresh(true)}
              onMouseLeave={() => setIsHoveringRefresh(false)}
            >
              <button className="refresh-btns" onClick={getCandidateList}>
                <img src={RefreshIcon} alt="새로고침" />
              </button>
              {isHoveringRefresh && (
                <div className="refresh-hover-label">새로고침</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="db-list-wrapper">
        {isLoading ? (
          <div className="loading-wrapper">
            <div className="loading-spinner"></div>
            <span className="loading-text">
              후보자 정보를 불러오는 중입니다...
            </span>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="no-result-wrapper">
            <span className="no-result-text">
              조건에 맞는 후보자가 없습니다.
            </span>
          </div>
        ) : (
          filteredCandidates.map((candidate, index) => (
            <div
              className="db-item"
              onClick={() => handleCandidateClick(candidate)}
              key={index}
            >
              <div className="db-item-profile">
                <img src={ProfileIcon} alt="프로필" />
                <p>
                  {candidate.name} ({candidate.age}), {candidate.gender}
                </p>
              </div>
              <div className="db-item-detail">
                <ul>
                  {candidate.keyword?.map((keyword, idx) => (
                    <li key={idx}># {keyword}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
      {/* 후보자 상세보기 모달 */}
      {isDetailModalOpen && selectedCandidate && (
        <ProfileDetail
          onClose={toggleDetailModal}
          name={selectedCandidate.name}
          birth_date={selectedCandidate.birth_date}
          keyword={selectedCandidate.keyword}
          age={selectedCandidate.age}
        />
      )}
    </div>
  );
};

export default FullViewMainPage;
