import React, { useEffect, useState } from "react";
import axios from "axios";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import MemberIcon from "../../Image/Icon/member.svg"; // 아이콘 경로
import "./styles/MyPage.css";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const address = process.env.REACT_APP_BACKEND_ADDRESS || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };

    const decoded = parseJwt(token);
    const userEmail = decoded?.userEmail;
    if (!userEmail) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${address}/auth/get-user`,
          { email: userEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
        setFormData(response.data.user);
      } catch (error) {
        console.error("❌ 사용자 정보 불러오기 실패:", error.response || error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${address}/auth/update-user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(formData);
      setIsEditing(false);
      alert("수정 완료!");
    } catch (error) {
      console.error("❌ 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  if (!user) {
    return (
      <div className="mypage_wrapper">
        <MemberNavigation />
        <div className="mypage_loading">사용자 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="mypage_wrapper">
      <MemberNavigation />

      {/* 상단 헤더 스타일 개선 */}
      <div className="mypage_page-index-wrapper">
        <img src={MemberIcon} alt="회원 아이콘" />
        <h2>회원 정보 열람 / 수정</h2>
      </div>

      <div className="mypage_content">
        <p className="mypage_welcome">
  <span className="mypage_highlight">
    [{user.name}] [{user.role === "personal" ? "개인회원" : "헤드헌터"}] 님, 반가워요!
  </span>

  <span className="mypage_edit-inline">
    {isEditing ? (
      <button className="mypage_edit-button" onClick={handleSave}>저장</button>
    ) : (
      <button className="mypage_edit-button" onClick={handleEditClick}>회원 정보 수정</button>
    )}
  </span>
</p>



        <div className="mypage_info-box">
          <div className="mypage_row">
            <span>이름</span>
            {isEditing ? (
              <input name="name" value={formData.name || ""} onChange={handleChange} />
            ) : (
              <span>{user.name}</span>
            )}
          </div>
          <div className="mypage_row">
            <span>이메일</span>
            <span>{user.email}</span>
          </div>
          <div className="mypage_row">
            <span>비밀번호</span>
            <span>************</span>
          </div>
          <div className="mypage_row">
            <span>개인전화번호</span>
            {isEditing ? (
              <input name="phone" value={formData.phone || ""} onChange={handleChange} />
            ) : (
              <span>{user.phone?.replace(/(\d{3})-?\d{4}-?(\d{4})/, "$1 - **** - $2")}</span>
            )}
          </div>
          <div className="mypage_row">
            <span>회원 형식</span>
            <span>{user.role === "headhunter" ? "헤드헌터" : "개인회원"}</span>
          </div>
          <div className="mypage_row">
            <span>회사/점포명</span>
            {isEditing ? (
              <input name="company_name" value={formData.company_name || ""} onChange={handleChange} />
            ) : (
              <span>{user.company_name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
