// localhost:3000/full_view

import React, { useState } from "react";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./profileDetail.css";
import PdfDownload from "../../Image/Icon/PdfDownload.svg";

const ProfileDetail = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>

        <div className="detail-wrapper">
          <div className="profile">
            <img src={ProfileIcon} alt="-" />
          </div>

          <div className="detail">
            <h1>홍길동 후보자 (29세, 남)</h1>
            <ul>
              <li># 00000할수 있는 인재</li>
              <li># 정보처리기사 1급</li>
              <li># 컴활 1급</li>
              <li># 빅데이터 기사</li>
            </ul>
          </div>
        </div>

        <div className="pdf-wrapper">
          <div className="pdf">
            <button className="pdf-download-button">
              <img src={PdfDownload} alt="이력서 pdf 다운로드" />
            </button>
            <p>이력서 다운받기 (.pdf)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
