import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Descriptions, Form, Input, Row, Col, Divider } from "antd";
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect,
} from "react-router";
// import { useDispatch } from "react-redux";
import Axios from "axios";
// import { useSelector } from "react-redux";
// import { addToCart } from "../../../../_actions/user_actions";

function FundInfo(props) {
  // const user = useSelector((state) => state.user);
  const [Quantity, setQuantity] = useState("");

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

  const quantityChangeHandler = (event) => {
    setQuantity(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Quantity) {
      return alert("구매하고자 하는 금액을 넣어주셔야 합니다.");
    }

    //작동함
    const body = {
      buyer: userId,
      fund: props.detail._id,
      quantity: Quantity,
    };

    Axios.post("/api/users/purchase", body).then((response) => {
      if (response.data.success) {
        alert("상품 구매에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("상품 구매에 실패했습니다.");
      }
    });

    //잔고 계산 하는 것
    const afterAccount = UserAccount.account - Quantity;

    const body2 = {
      userId: userId,
      account: afterAccount,
    };

    Axios.post("/api/account/purchase", body2)
      .then((response) => {
        setUserAccount(response.data.userAccountInfo);
        console.log(response.data.userAccountInfo);
        console.log(response.data.success);

        console.log({ UserAccount });
        props.history.push("/");

        alert("계좌 잔고도 정상 차감되었습니다..");
      })
      // .catch((err) => alert(err));
      .catch((err) => props.history.push("/"));
  };

  //계좌 가져오기
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

  const RenderItems = () => {
    if (props.detail.fundDanger) {
      return (
        <Descriptions title="펀드 정보" bordered>
          <Descriptions.Item label="상품 소개 이름" span={3}>
            {props.detail.kakaoTitle}
          </Descriptions.Item>
          <Descriptions.Item label="펀드 이름" span={3}>
            {props.detail.fundTitle}
          </Descriptions.Item>
          <Descriptions.Item label="판매자">
            {props.detail.seller}
          </Descriptions.Item>
          <Descriptions.Item label="펀드 지역">
            {props.detail.local}
          </Descriptions.Item>
          <Descriptions.Item label="펀드 테마">
            {props.detail.fundTheme}
          </Descriptions.Item>
          <Descriptions.Item label="펀드 위험">
            {props.detail.fundDanger}
          </Descriptions.Item>
          <Descriptions.Item label="누적 투자자 수">
            {props.detail.salesPeople.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
            명
          </Descriptions.Item>{" "}
          명
          <Descriptions.Item label="누적 판매 금액">
            {props.detail.salesAmount.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}{" "}
            억원
          </Descriptions.Item>
          <Descriptions.Item label="설정 후 수익률">
            {props.detail.afterYield}%
          </Descriptions.Item>
          <Descriptions.Item label="보수_수수료">
            {props.detail.fess}%
          </Descriptions.Item>
        </Descriptions>
      );
    } else
      return (
        <Descriptions title="펀드 정보" bordered>
          <Descriptions.Item label="펀드 이름" span={3}>
            {props.detail.fundTitle}
          </Descriptions.Item>
          <Descriptions.Item label="판매자">
            {props.detail.seller}
          </Descriptions.Item>
          <Descriptions.Item label="연이율">
            {props.detail.mortgageInterestRate}
          </Descriptions.Item>
          <Descriptions.Item label="투자기간">
            {props.detail.investmentPeriod}
          </Descriptions.Item>
          <Descriptions.Item label="상환방식">
            {props.detail.repaymentMethod}
          </Descriptions.Item>
        </Descriptions>
      );
  };

  // const dispatch = useDispatch();

  // const clickHandler = () => {d
  //   //필요한 정보를 Cart 필드에다가 넣어 준다.
  //   dispatch(purchase_fund(props.detail._id));
  // };

  return (
    <div>
      <div>
        <RenderItems />
      </div>

      <Divider />

      <div>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <Descriptions title="계좌 정보" bordered>
              <Descriptions.Item label="고객 고유 번호" span={3}>
                {UserAccount.uniqueuser}
              </Descriptions.Item>
              <Descriptions.Item label="계좌 잔고">
                {UserAccount.account}
              </Descriptions.Item>
            </Descriptions>

            <Form onSubmit={findSubmitHandler}>
              <button type="submit">계좌 정보 불러오기</button>
            </Form>
          </Col>

          <Col lg={12} xs={24}>
            <Form onSubmit={submitHandler}>
              <Input
                type="number"
                onChange={quantityChangeHandler}
                value={Quantity}
              />
              <button type="submit">구매하기</button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(FundInfo);
