// localhost:3000/full_view

import React, { useState } from "react";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import RefreshIcon from "../../Image/Icon/RefreshIcon.svg";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./fullViewMainPage.css";

const FullViewMainPage = () => {
  const [sortType, setSortType] = useState("latest"); // 최신순, 인기순 버튼 상태

  return (
    <div className="full-view-main-wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>전체 DB 열람</h2>
        </div>
      </header>

      {/* 필터링 버튼들 */}
      <div>
        <div className="filter-wrapper">
          <select className="filter-btn">
            <option>경력 (무관)</option>
            <option>신입</option>
            <option>1-5년</option>
            <option>6-10년</option>
            <option>11-15년</option>
            <option>16-20년</option>
            <option>21-25년</option>
            <option>30-35년</option>
            <option>35~39년</option>
            <option>40년 이상</option>
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
      </div>

      <div className="search-and-buttons-wrapper">
        {/* 검색 바 */}
        <div className="search-bar">
          <img src={SearchIcon} alt="검색" className="search-icon" />
          <input type="text" placeholder="후보자명 / SKILLS / 전공명 검색" />
        </div>

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

          <button className="refresh-btns">
            <img src={RefreshIcon} alt="새로고침" />
          </button>
        </div>
      </div>

      <div className="db-list-wrapper">
        <div className="db-item">
          <div className="db-item-profile">
            <img src={ProfileIcon} alt="-" />
            <p>김철수 (29), 남</p>
          </div>

          <div className="db-item-detail">
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div className="db-item-profile">
            <img src={ProfileIcon} alt="-" />
            <p>김철수 (29), 남</p>
          </div>

          <div className="db-item-detail">
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div className="db-item-profile">
            <img src={ProfileIcon} alt="-" />
            <p>김철수 (29), 남</p>
          </div>

          <div className="db-item-detail">
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div className="db-item-profile">
            <img src={ProfileIcon} alt="-" />
            <p>김철수 (29), 남</p>
          </div>

          <div className="db-item-detail">
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div className="db-item-profile">
            <img src={ProfileIcon} alt="-" />
            <p>김철수 (29), 남</p>
          </div>

          <div className="db-item-detail">
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullViewMainPage;
