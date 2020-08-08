import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
// import Checkbox from './Sections/CheckBox';
// import Radiobox from './Sections/RadioBox';
// import SearchFeature from './Sections/SearchFeature';
// import { continents, price } from './Sections/Datas';

function LandingPage() {
  // usestate
  const [Fund, setFund] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  //useEffect_Dom실행
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getFund(body);
  }, []);

  //useEffect 마지막에 불러오는 axios
  const getFund = (body) => {
    axios.post("/api/fund/funds", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setFund([...Fund, ...response.data.fundInfo]);
        } else {
          setFund(response.data.fundInfo);
        }
        // 더보기 실행 시
        // setPostSize(response.data.postSize)
      } else {
        alert(" 상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const fundCards = Fund.map((fund, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/fund/${fund._id}`}>
              {/* util */}
              <ImageSlider images={fund.images} />
            </a>
          }
        >
          <h2>
            {" "}
            <a href={`/fund/${fund._id}`}>{fund.title}</a>
          </h2>
          <Meta title={fund.kakaoTitle} description={`${fund.fundTheme}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div>
        <h1>LandingPage</h1>
      </div>
      {/* 펀드 상품을 보여주는 공간 */}
      <Row gutter={[16, 16]}>{fundCards}</Row>
    </div>
  );
}

export default LandingPage;
