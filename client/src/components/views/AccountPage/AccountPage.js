import React, { useEffect, useState } from "react";
import { Button, Descriptions, Form, Input, Row, Col, Divider } from "antd";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import Axios from "axios";
import AccountInfo from "../Common/AccountInfo";

function AccountPage(props) {
  const [SaveAccount, setSaveAccount] = useState("");
  const [UpdateAccount, setUpdateAccount] = useState("");

  const userId = localStorage.getItem("userId");

  //   const [UserAccount, setUserAccount] = useState([]);
  const [UserAccount, setUserAccount] = useState([]);

  // useEffect(() => {
  //   let body = {
  //     userId: userId,
  //   };

  //   getAccount(body);
  // }, []);

  // const getAccount = (body) => {
  //   Axios.post("/api/account", body)
  //     .then((response) => {
  //       setUserAccount(response.data.userAccountInfo);
  //       console.log(response.data.userAccountInfo);
  //       console.log(response.data.success);

  //       console.log({ UserAccount });
  //       alert("계좌 정보를 성공적으로 가져왔습니다.");
  //     })
  //     .catch((err) => alert(err));
  // };

  const findSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      userId: userId,
    };

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

  const saveAccountChangeHandler = (event) => {
    setSaveAccount(event.currentTarget.value);
  };

  const updateAccountChangeHandler = (event) => {
    setUpdateAccount(event.currentTarget.value);
  };

  const saveSubmitHandler = (event) => {
    event.preventDefault();

    if (!SaveAccount) {
      return alert("계좌 금액을 기입하셔야 합니다.");
    }

    //작동함
    const body = {
      user: userId,
      uniqueuser: userId,
      account: SaveAccount,
    };

    console.log(body);

    Axios.post("/api/account/save", body).then((response) => {
      if (response.data.success) {
        alert("계좌 잔고가 등록되었습니다.");

        //후에 구매내역 페이지로 이동해야한다.
        //안됨
        props.history.push("/");
      } else {
        alert("계좌 잔고 등록에 실패했습니다.");
      }
    });
  };

  const updateSubmitHandler = (event) => {
    event.preventDefault();

    if (!UpdateAccount) {
      return alert("계좌 금액을 기입하셔야 합니다.");
    }

    //작동함
    const body = {
      user: userId,
      account: UpdateAccount,
    };

    console.log(body);

    Axios.post("/api/account/update", body).then((response) => {
      if (response.data.success) {
        alert("계좌 잔고가 갱신되었습니다.");

        props.history.push("/");
      } else {
        alert("계좌 잔고 갱신에 실패했습니다.");
      }
    });
  };

  //   const renderItems = () => {
  //     return (
  //       <tr>
  //         <td>{UserAccount.uniqueuser}</td>
  //         <td>{UserAccount.account}</td>
  //       </tr>
  //     );
  //   };

  //   function numberWithCommas(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   }

  //   const x = numberWithCommas(UserAccount.account);

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <AccountInfo />
          {/* <table>
            <thead>
              <tr>
                <th>고객 고유 번호</th>
                <th>계좌 잔고</th>
              </tr>
            </thead>

            <tbody>

              <td>{UserAccount.uniqueuser}</td>
              <td> {UserAccount.account}원 </td>
            </tbody>
          </table> */}
        </Col>
        <Col>
          <Form onSubmit={findSubmitHandler}>
            <button type="submit">계좌 정보 불러오기</button>
          </Form>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <h1> 신규 계좌 등록</h1>
          <Form onSubmit={saveSubmitHandler}>
            <Input
              type="number"
              onChange={saveAccountChangeHandler}
              value={SaveAccount}
            />
            <button type="submit">계좌 입력</button>
          </Form>
        </Col>

        <Col lg={12} xs={24}>
          <h1> 기존 계좌 업데이트</h1>
          <Form onSubmit={updateSubmitHandler}>
            <Input
              type="number"
              onChange={updateAccountChangeHandler}
              value={UpdateAccount}
            />
            <button type="submit">계좌 입력</button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AccountPage;
