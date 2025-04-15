import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { ReactComponent as DaumPostCloseSvg } from "../../Image/Icon/LocationIcon.svg";

const DaumPostBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

const DaumPostContainer = styled.div`
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

const DaumPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: #fff;
  padding: 12px 16px;
`;

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

    props.setAddress({
      address: fullAddress,
      zonecode: data.zonecode,
    });

    props.handleComplete();
  };

  return (
    <DaumPostBackground>
      <DaumPostContainer>
        <DaumPostHeader>
          <h1>주소 검색</h1>
          <DaumPostCloseSvg
            style={{ cursor: "pointer" }}
            onClick={props.handleComplete}
          />
        </DaumPostHeader>
        <DaumPostcode
          autoClose
          style={{ height: "500px", width: "100%" }}
          onComplete={complete}
        />
      </DaumPostContainer>
    </DaumPostBackground>
  );
}
