import React from "react";
import "./candidatePage.css";

const CandidatePersonalData = () => {
  return (
    <div>
      <div className="image-recommend-result_item-container">
        <div className="image-recommend-result_item">
          <label>성명</label>
          <p>ooo</p>
        </div>

        <div className="image-recommend-result_item">
          <label>출생</label>
          <p>20030219 (만 22세)</p>
        </div>

        <div className="image-recommend-result_item">
          <label>성별</label>
          <p>남성</p>
        </div>

        <div className="image-recommend-result_item">
          <label>주소</label>
          <p>서울특별시 성북구 석관동 두산위브아파트</p>
        </div>

        <div className="image-recommend-result_item">
          <label>연락처</label>
          <p>010-1231-1231</p>
        </div>

        <div className="image-recommend-result_item">
          <label>연봉정보</label>
          <p>현 5000 만원 / 희망 6000 만원</p>
        </div>
      </div>

      <div className="image-recommend-result_item-container">
        <div className="image-recommend-result_item">
          <label>학력</label>
          <ul>
            <li>oo 고등학교 / 졸업</li>
            <li>광운대학교 정보융합학부 / 졸업</li>
          </ul>
        </div>
      </div>

      <div className="image-recommend-result_item-container">
        <div className="image-recommend-result_item">
          <label>경력</label>
          <ul>
            <li>삼성전자 / 무선사업부 소프트웨어 엔지니어 / 201801 - 202206 </li>
            <li>카카오 / 카카오톡 플랫폼팀 백엔드 개발자 / 202207 -  </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidatePersonalData;
