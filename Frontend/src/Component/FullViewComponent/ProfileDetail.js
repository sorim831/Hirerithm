// localhost:3000/full_view

import React, { useState } from "react";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./profileDetail.css";
import PdfDownload from "../../Image/Icon/PdfDownload.svg";

const ProfileDetail = ({ onClose, name, keyword, age }) => {
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
            <h1>
              {name} 후보자 ({age}세)
            </h1>
            <ul>
              {keyword?.map((word, idx) => (
                <li key={idx}># {word}</li>
              ))}
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
