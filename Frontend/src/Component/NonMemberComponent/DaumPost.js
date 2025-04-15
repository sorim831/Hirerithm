import React from "react";
import DaumPostcode from "react-daum-postcode";
import LocationIcon from "../../Image/Icon/LocationIcon.svg";
import "./daumPost.css";

export default function DaumPost(props) {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname) extraAddress += data.bname;
      if (data.buildingName)
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;

      if (extraAddress) fullAddress += ` (${extraAddress})`;
    }

    props.onComplete({
      address: fullAddress,
      zonecode: data.zonecode,
    });
  };

  return (
    <div
      className="daum-post-background"
      onClick={() => props.onComplete(null)}
    >
      <div className="daum-post-container" onClick={(e) => e.stopPropagation()}>
        <div className="daum-post-header">
          <h1>주소 검색</h1>
          <img src={LocationIcon} alt="📌" />
        </div>
        <DaumPostcode
          autoClose
          style={{ height: "500px", width: "100%" }}
          onComplete={complete}
        />
      </div>
    </div>
  );
}
