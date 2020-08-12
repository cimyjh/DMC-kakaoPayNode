import React, { useState, useEffect } from "react";
import { Button, Descriptions, Form, Input, Row, Col, Divider } from "antd";
import Axios from "axios";
import FundInfo from "../DetailFundPage/Sections/FundInfo";

// FundInfo.js, AccountInfo.js 에서 사용된 컴포넌트입니다.
// 계좌 정보를 가져오기 위한 공통된 컴포넌트입니다.

function AccountInfo() {
  const userId = localStorage.getItem("userId");
  const [UserAccount, setUserAccount] = useState([]);

  useEffect(() => {
    let body = {
      userId: userId,
    };

    getAccount(body);
  }, []);

  const getAccount = (body) => {
    Axios.post("/api/account", body)
      .then((response) => {
        setUserAccount(response.data.userAccountInfo);
        console.log(response.data.userAccountInfo);
        console.log(response.data.success);

        console.log({ UserAccount });
        alert("계좌 정보를 성공적으로 가져왔습니다.");
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <Descriptions title="계좌 정보" bordered>
        <Descriptions.Item label="고객 고유 번호" span={3}>
          {UserAccount.uniqueuser}
        </Descriptions.Item>
        <Descriptions.Item label="계좌 잔고">
          {UserAccount.account}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default AccountInfo;
