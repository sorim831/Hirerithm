import React from "react";

const CorporateImageCoverPage = ({ summary }) => {
  return (
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
      <h3>기업 이미지 기반 [ oo 기업 마케팅 팀장 직무 ] 후보자 추천 결과</h3>
      <input
        className="image-recommend-result_report-author-input"
        placeholder="보고서 작성자 정보를 입력하세요."
        value={summary.author}
      />

      <div className="image-recommend-result_recommand-result-summary">
        <h4>{summary.keywords}</h4>
        <table className="report-candidate-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>기본 인적사항</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {summary.candidates.map((c) => (
              <tr key={c.rank}>
                <td>{c.rank}</td>
                <td>{c.info}</td>
                <td>{c.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>자세한 후보자 이력서는 뒷장에 첨부.</p>
    </div>
  );
};

export default CorporateImageCoverPage;
