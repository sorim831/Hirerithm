// localhost:3000/full_view

import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import RefreshIcon from "../../Image/Icon/RefreshIcon.svg";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./fullViewMainPage.css";
import ProfileDetail from "../../Component/FullViewComponent/ProfileDetail";

const FullViewMainPage = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [sortType, setSortType] = useState("latest");
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const toggleDetailModal = () => setDetailModalOpen((prev) => !prev);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringRefresh, setIsHoveringRefresh] = useState(false);

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
            {/* 필터링 버튼들 */}
            <select className="filter-btn">
              <option>경력 (무관)</option>
              <option>신입</option>
              <option>1-5년</option>
              <option>6-10년</option>
              <option>11-15년</option>
              <option>16-19년</option>
              <option>20년 이상</option>
            </select>
            <select className="filter-btn">
              <option>학력 (무관)</option>
              <option>초등학교 졸업 이상</option>
              <option>중학교 졸업 이상</option>
              <option>고등학교 졸업 이상</option>
              <option>학사 학위 이상</option>
              <option>석사 학위 이상</option>
              <option>박사 학위 이상</option>
            </select>
            <select className="filter-btn">
              <option>맞춤기업 TEST 결과 유형 (무관)</option>
              <option>평가 및 성장 가능성 강점 기업 인재</option>
              <option>높은 보상 강점 기업 인재</option>
              <option>비전 및 방향성 강점 기업 인재</option>
              <option>복지 강점 기업 인재</option>
              <option>업무 강도 강점 기업 인재</option>
            </select>
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
        ) : (
          candidateData.map((candidate, index) => (
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
