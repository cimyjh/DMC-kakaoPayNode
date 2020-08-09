import React, { useEffect, useState } from "react";
import axios from "axios";
import FundImage from "./Sections/FundImage";
import FundInfo from "./Sections/FundInfo";
import { Row, Col, Divider } from "antd";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
// import { useSelector } from "react-redux";

function DetailFundPage(props) {
  // const user = useSelector((state) => state.user);
  const fundId = props.match.params.fundId;

  const [Fund, setFund] = useState({});

  useEffect(() => {
    axios
      .get(`/api/fund/funds_by_id?id=${fundId}&type=single`)
      .then((response) => {
        setFund(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Fund.kakaoTitle}</h1>
      </div>
      <Divider />

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <FundImage detail={Fund} />
        </Col>
        <Col lg={12} sm={24}>
          <FundInfo detail={Fund} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailFundPage;
