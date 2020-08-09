import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../../../_actions/user_actions";

function FundInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(purchase_fund(props.detail._id));
  };

  return (
    <div>
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

      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default FundInfo;
