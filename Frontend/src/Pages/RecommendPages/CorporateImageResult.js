// localhost:3000/recommend/corporateImageResult

import React from "react";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./corporateImage.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const CorporateImageResult = () => {
  const data = [
    { subject: "사내분위기", value: 80 },
    { subject: "ESG", value: 60 },
    { subject: "근무환경", value: 70 },
    { subject: "높은매출", value: 50 },
    { subject: "ESG", value: 40 },
    { subject: "성장률", value: 55 },
  ];

  return (
    <div className="image-recommend-result_wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="image-recommend-result_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2> [ ooo ] 기업 이미지 기반 추천</h2>
        </div>
      </header>

      <main>
        {/* 이미지 카테고리별 점수 */}
        <h3 className="image-recommend-result_graph-header">
          이미지 카테고리별 점수
        </h3>

        <div className="image-recommend-result_graph">
          {/* 레이더 차트 */}
          <RadarChart
            cx={200}
            cy={150}
            outerRadius={100}
            width={400}
            height={300}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#4CAF50"
              fill="#4CAF50"
              fillOpacity={0.6}
            />
          </RadarChart>

          {/* 키워드 Top 2 */}
          <div className="image-recommend-result_top2">
            <p>ooo 기업 이미지 키워드 Top 2를 뽑았어요 !</p>
            <span></span>
            <div className="image-recommend-result_ketword">
              <span>ESG</span>
              <span>높은 매출</span>
            </div>
          </div>
        </div>

        {/* 전체 점수표 */}
        <div className="image-recommend-result_score-header">
          <h3>전체 점수표</h3>
          <div>
            <span></span>
            <span></span>
            <span></span>
            <p>점수 높음-보통-낮음 순</p>
          </div>
        </div>
        <table className="image-recommend-result_score-table">
          <tr>
            <td>사내분위기</td>
            <td>100</td>
          </tr>
          <tr>
            <td>사내분위기</td>
            <td>100</td>
            <td></td>
          </tr>
          <tr>
            <td>사내분위기</td>
            <td>100</td>
            <td></td>
          </tr>
          <tr>
            <td>사내분위기</td>
            <td>100</td>
            <td></td>
          </tr>
          <tr>
            <td>사내분위기</td>
            <td>100</td>
            <td></td>
          </tr>
          <tr>
            <td>사내분위기</td>
            <td>100</td>
            <td></td>
          </tr>
        </table>
      </main>
    </div>
  );
};

export default CorporateImageResult;
