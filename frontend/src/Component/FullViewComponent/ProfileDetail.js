import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./profileDetail.css";
import PdfDownload from "../../Image/Icon/PdfDownload.svg";
import EmptyHeart from "../../Image/Icon/heart_empty.svg";
import FilledHeart from "../../Image/Icon/heart_filled.svg";

const ProfileDetail = ({
  onClose,
  name,
  keyword,
  age,
  userEmail,
  resume_id,
  onToggleWishlist,
}) => {
  const [liked, setLiked] = useState(false);
  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    axios
      .get(`${BACK_URL}/resume/wishlist/${userEmail}`)
      .then((res) => {
        const wishedIds = res.data.map((resume) => resume.resume_id);
        setLiked(wishedIds.includes(resume_id));
      })
      .catch((err) => console.error("찜 상태 확인 실패:", err));
  }, [userEmail, resume_id]);

  const toggleWishlist = async () => {
    try {
      if (liked) {
        await axios.delete(
          `${BACK_URL}/resume/wishlist/${userEmail}/${resume_id}`
        );
        setLiked(false);
        onToggleWishlist?.(resume_id, false); // 상태 변경 알림
      } else {
        await axios.post(
          `${BACK_URL}/resume/wishlist/${userEmail}/${resume_id}`
        );
        setLiked(true);
        onToggleWishlist?.(resume_id, true); // 상태 변경 알림
      }
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

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
              <button
                className="detail-heart-toggle-btn"
                onClick={toggleWishlist}
              >
                <img alt="찜하기" src={liked ? FilledHeart : EmptyHeart} />
              </button>
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
            <button
              onClick={async () => {
                const pdfUrl = `/pdf/${resume_id}.pdf`; // public/pdf 안 파일 경로

                try {
                  // 1️⃣ HEAD 요청으로 파일 존재 여부 확인
                  const headRes = await fetch(pdfUrl, { method: "HEAD" });
                  if (!headRes.ok) {
                    alert("이력서가 존재하지 않습니다.");
                    return;
                  }

                  // 2️⃣ 다운로드
                  const link = document.createElement("a");
                  link.href = pdfUrl;
                  link.download = `${name}_이력서.pdf`; // 브라우저에서 보여질 파일명
                  link.click();
                } catch (err) {
                  console.error("PDF 다운로드 실패:", err);
                  alert("PDF 다운로드 중 오류가 발생했습니다.");
                }
              }}
            >
              <img src={PdfDownload} alt="이력서 pdf 다운로드" />
            </button>
            <p>
              이력서 다운받기 <span>(.pdf)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
