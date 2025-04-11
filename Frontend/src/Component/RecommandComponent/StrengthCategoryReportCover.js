import React from "react";
import "./strengthCategoryReportCover.css";
import DownloadIcon from "../../Image/Icon/DownloadIcon.svg";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import LeftArrow from "../../Image/Icon/LeftArrow.svg";

const RecommandReport = ({ onBack }) => {
  return (
    <div className="image-recommend-result_second-page">
      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend-result_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>추천 결과 기반 보고서</h2>
        </div>
      </header>

      <main>
        {/* pdf 파일 다운로드 받기 버튼 */}
        <button className="image-recommend-result_download-button">
          <img src={DownloadIcon} className="download-icon" alt="다운로드" />
          <span className="download-text">다운로드 (pdf 형식)</span>
        </button>

        {/* 보고서 내용 */}
        <div className="image-recommend-result_report-content">
          <div className="image-recommend-result_report-summary">
            하이어리즘 /{" "}
            <input
              className="company-name-input"
              placeholder="기업명 입력"
              value={"oo 기업"}
            />
            추천 결과
          </div>
          <h3>
            강점 키워드 기반 [ oo 기업 마케팅 팀장 직무 ] 후보자 추천 결과
          </h3>
          <input
            className="image-recommend-result_report-author-input"
            placeholder="보고서 작성자 정보를 입력하세요."
            value={"유니코서치 대리 김가연"}
          />

          <div className="image-recommend-result_recommand-result-summary">
            <h4>[ 경력 ] [ 현장 경험 ] [ 매출 성장 기여 ] 강점 키워드</h4>
            <table className="report-candidate-table">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>기본 인적사항</th>
                  <th>점수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>김철수 (29), 남</td>
                  <td>470 / 500</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>김민지 (27), 여</td>
                  <td>450 / 500</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>박희망 (30), 남</td>
                  <td>400 / 500</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>박찬희 (30), 남</td>
                  <td>390 / 500</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>최민서 (30), 여</td>
                  <td>385 / 500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>자세한 후보자 이력서는 뒷장에 첨부.</p>
        </div>

        {/* 뒤로가기 버튼 */}
        <button className="report-back-button" onClick={onBack}>
          <img src={LeftArrow} alt="뒤로가기" className="back-icon" />
          <span className="back-text">기업 이미지 점수 화면</span>
        </button>
      </main>
    </div>
  );
};

export default RecommandReport;
