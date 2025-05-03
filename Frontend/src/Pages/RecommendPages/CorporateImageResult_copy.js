import { useState } from "react";
import { useLocation } from "react-router-dom";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./corporateImageResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import RecommandReport from "../../Component/RecommandComponent/CorporateImageReport";
import { motion, AnimatePresence } from "framer-motion";
import dummyCandidates from "../../data/dummyCandidate";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const CorporateImageResult = () => {
  const location = useLocation();

  const categoryMapping = {
    "Teamculture": "조직문화",
    "Evaluation": "공정한 평가, 성장지원",
    "Pay Level": "보상수준",
    "Vision & Direction": "비전 및 방향성",
    "Welfare Quality": "복지",
    "Workload": "워라밸",
  };  
  
  // 더미 데이터 설정
  const companyDummydata = [
    { rank: "1", subject: "조직문화", score: 5 },
    { rank: "2", subject: "공정한 평가, 성장지원", score: 4.3 },
    { rank: "3", subject: "보상수준", score: 4.0 },
    { rank: "t4", subject: "비전 및 방향성", score: 2.5 },
    { rank: "5", subject: "복지", score: 2.1 },
    { rank: "6", subject: "워라벨", score: 1.0 },
  ];

  // location에서 받은 데이터
  const { data } = location.state || {};
  const companyName = location.state?.companyName || '';
  const companyData = data?.keywordArray || companyDummydata;  // 받아온 데이터가 없으면 더미 데이터 사용
  console.log(companyData,"ㅎㅇㅎㅇ");

  // 데이터를 매핑하여 출력
  const mappedCompanyData = companyData.map(item => ({
    ...item,
    category: categoryMapping[item.category] || item.category, // 카테고리 매핑 
    }));

  console.log(mappedCompanyData)

  const [showReport, setShowReport] = useState(false);

  // 결과 요약 데이터
  const resultsSummary = [
    {
      title: "마케팅 팀장 직무 추천 결과",
      author: "유니코서치 대리 김가연",
      keywords: "[ ESG ] [ 높은 매출 ]",
      candidates: [
        { rank: 1, info: "김철수 (29), 남", score: "470 / 500" },
        { rank: 2, info: "김민지 (27), 여", score: "450 / 500" },
        { rank: 3, info: "박희망 (30), 남", score: "400 / 500" },
        { rank: 4, info: "박찬희 (30), 남", score: "390 / 500" },
        { rank: 5, info: "최민서 (30), 여", score: "385 / 500" },
      ],
    },
  ];

  return (
    <div className="image-recommend-result_wrapper">
      <MemberNavigation />

      <AnimatePresence mode="wait">
        {!showReport ? (
          <motion.div
            key="firstPage"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <header>
              <div className="image-recommend-result_page-index-wrapper">
                <img src={FileLogo} alt="파일 아이콘" />
                <h2>[ {companyName} ] 기업 이미지 점수 / 점수 기반 후보자 추천</h2>
              </div>
            </header>

            <div className="image-recommend-result_first-page">
              <main>
                <h3 className="image-recommend-result_graph-header">
                  이미지 카테고리별 점수
                </h3>

                <div className="image-recommend-result_graph">
                  <RadarChart
                    cx={200}
                    cy={150}
                    outerRadius={120}
                    width={450}
                    height={300}
                    data={mappedCompanyData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fill: "#1e1e1e", fontSize: 16 }}
                      tickMargin={100}
                    />
                    <PolarRadiusAxis
                      domain={[0, 5]}
                      tick={{ fontSize: 0 }}
                      axisLine={false}
                      tickCount={6}
                    />
                    <Radar
                      name="점수"
                      dataKey="score"
                      stroke="#008A34"
                      fill="#008A34"
                      fillOpacity={0.5}
                    />
                  </RadarChart>

                  <div className="image-recommend-result_top2">
                    <p>{companyName} 기업 이미지 키워드 Top 2를 뽑았어요 !</p>
                    <div className="image-recommend-result_keyword">
                      <span className="keyword">조직문화</span>
                      <span className="keyword">공정한 평가, 성장지원</span>
                    </div>
                  </div>
                </div>

                <div className="image-recommend-result_review">
                  <h3 className="image-recommend-result_graph-header">
                    실제 {companyName} 기업 직원 반응
                  </h3>

                  <ul className="review-list">
                    <li><span className="list-style"></span><p>"좋은 팀 분위기 덕에 업무를 더 잘 할 수 있게 되는 것 같음"</p></li>
                    <li><span className="list-style"></span><p>"성과를 공정하게 평가하려는 분위기가 강해요"</p></li>
                    <li><span className="list-style"></span><p>"성과를 공정하게 평가하려는 분위기가 강해요"</p></li>
                    <li><span className="list-style"></span><p>"성과를 공정하게 평가하려는 분위기가 강해요"</p></li>
                    <li><span className="list-style"></span><p>"좋은 팀 분위기 덕에 업무를 더 잘 할 수 있게 되는 것 같음"</p></li>
                    <li><span className="list-style"></span><p>"성과를 공정하게 평가하려는 분위기가 강해요"</p></li>
                  </ul>
                </div>

                <div className="image-recommend-result_score-header">
                  <h3>전체 점수표 (기업 이미지 점수 / 후보자 추천 결과 요약)</h3>
                  <div>
                    <div>
                      <span></span><span></span><span></span>
                    </div>
                    <p>점수 높음-보통-낮음 순</p>
                  </div>
                </div>

                <div className="company-result-summary-tables">
                  <table className="image-recommend-result_score-table">
                    <tbody>
                      {companyData.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.rank}</td>
                          <td>{item.subject}</td>
                          <td>{item.score} 점</td>
                          <td><span></span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className="image-recommend-result_score-table">
                    <tbody>
                      <tr><td>1</td><td>홍길동</td><td>90/100 점</td><td><span></span></td></tr>
                      <tr><td>2</td><td>홍길동</td><td>88/100 점</td><td><span></span></td></tr>
                      <tr><td>3</td><td>홍길동</td><td>80/100 점</td><td><span></span></td></tr>
                      <tr><td>4</td><td>홍길동</td><td>66/100 점</td><td><span></span></td></tr>
                      <tr><td>5</td><td>홍길동</td><td>59/100 점</td><td><span></span></td></tr>
                      <tr><td>6</td><td>홍길동</td><td>59/100 점</td><td><span></span></td></tr>
                    </tbody>
                  </table>
                </div>

                <button
                  className="image-recommend-result_job-seeker-button"
                  onClick={() => setShowReport(true)}
                >
                  <img src={ArrowIcon} alt="➜" />
                  <span>추천 결과 보고서 열람</span>
                </button>
              </main>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reportPage"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <RecommandReport
              onBack={() => setShowReport(false)}
              companySummary={companyDummydata}
              resultsSummary={resultsSummary}
              candidates={dummyCandidates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorporateImageResult;
