// localhost:3000/full_view

import React from "react";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import RefreshIcon from "../../Image/Icon/RefreshIcon.svg";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";

const FullViewMainPage = () => {
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
        <div>
          <button className="filter-btn">전체보기</button>
          <button className="filter-btn">경력</button>
          <button className="filter-btn">SKILLS</button>
          <button className="filter-btn">학력 및 전공</button>
          <button className="filter-btn">주요 경험</button>
          <button className="filter-btn">맞춤기업 TEST 결과 유형</button>
        </div>

        {/* 스크롤바 */}
        <div>
          <button></button> {/* 왼쪽으로 이동 */}
          <span></span> {/* 스크롤바 */}
          <button></button> {/* 오른른쪽으로 이동 */}
        </div>
      </div>

      <div>
        {/* 검색 바 */}
        <div></div>
        <SearchIcon />

        {/* 최신순 / 인기순 필터링 버튼, 새로고침 버튼 */}
        <div>
          <button>최신순</button>
          <button>인기순</button>
          <button>
            <RefreshIcon />
          </button>
        </div>
      </div>

      <div>
        <div className="db-item">
          <div>
            <ProfileIcon />
            <p>김철수 (29), 남</p>
          </div>

          <div>
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div>
            <ProfileIcon />
            <p>김철수 (29), 남</p>
          </div>

          <div>
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div>
            <ProfileIcon />
            <p>김철수 (29), 남</p>
          </div>

          <div>
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div>
            <ProfileIcon />
            <p>김철수 (29), 남</p>
          </div>

          <div>
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>
        <div className="db-item">
          <div>
            <ProfileIcon />
            <p>김철수 (29), 남</p>
          </div>

          <div>
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
