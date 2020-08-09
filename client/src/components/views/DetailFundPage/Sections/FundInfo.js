import React, { useState } from "react";
import { Button, Descriptions, Form, Input } from "antd";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
// import { useDispatch } from "react-redux";
import Axios from "axios";
// import { useSelector } from "react-redux";
// import { addToCart } from "../../../../_actions/user_actions";

function FundInfo(props) {
  // const user = useSelector((state) => state.user);
  const [Quantity, setQuantity] = useState("");

  const userId = localStorage.getItem("userId");

  const quantityChangeHandler = (event) => {
    setQuantity(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Quantity) {
      return alert("구매하고자 하는 금액을 넣어주셔야 합니다.");
    }

    //작동안함
    //   const body = {
    //     buyer: userId,
    //     fundId: props.detail._id,
    //     fundTitle: props.detail.fundTitle,
    //     fess: props.detail.fess,
    //     Quantity: Quantity,
    //   };
    //   console.log(body);

    //   Axios.post("/api/users/purchase", body).then((response) => {
    //     if (response.data.success) {
    //       alert("상품 구매에 성공했습니다.");

    //       //후에 구매내역 페이지로 이동해야한다.
    //       //안됨
    //       // props.history.push("/");
    //     } else {
    //       alert("상품 구매에 실패했습니다.");
    //     }
    //   });
    // };

    //작동함
    const body = {
      buyer: userId,
      fund: props.detail._id,
      // classification: props.detail.classification,
      // kakaoTitle: props.detail.kakaoTitle,
      // fundTitle: props.detail.fundTitle,
      quantity: Quantity,
    };
    console.log(body);

    Axios.post("/api/users/purchase", body).then((response) => {
      if (response.data.success) {
        alert("상품 구매에 성공했습니다.");

        //후에 구매내역 페이지로 이동해야한다.
        //안됨
        // props.history.push("/");
      } else {
        alert("상품 구매에 실패했습니다.");
      }
    });
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
            {props.detail.salesPeople}명
          </Descriptions.Item>{" "}
          명
          <Descriptions.Item label="누적 판매 금액">
            {props.detail.salesAmount} 억원
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

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={submitHandler}>
          <Input
            type="number"
            onChange={quantityChangeHandler}
            value={Quantity}
          />

          <button type="submit">구매하기</button>
        </Form>
      </div>
    </div>
  );
}

export default FundInfo;
