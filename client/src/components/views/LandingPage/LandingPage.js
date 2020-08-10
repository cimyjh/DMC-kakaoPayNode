import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/CheckBox";
// import Radiobox from './Sections/RadioBox';
import SearchFeature from "./Sections/SearchFeature";
import { classification, price } from "./Sections/Datas";

function LandingPage() {
  // usestate
  const [Fund, setFund] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    classification: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

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
        setPostSize(response.data.postSize);
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
            <a href={`/fund/${fund._id}`}>{fund.fundTitle}</a>
          </h2>
          <Meta description={`${fund.seller}`} />
        </Card>
      </Col>
    );
  });

  //더보기
  const loadMoreHanlder = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getFund(body);
    setSkip(skip);
  };

  //라디오 버튼에 사용할 객체, 하지만 지금은 사용 안함
  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  //CheckBox를 위한 핸들러
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    console.log("filters", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  //body를 정의하는 함수, CheckBox
  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getFund(body);
    setSkip(0);
  };

  //body를 정의하는 함수, 검색에 대한 것
  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getFund(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div>
        <h1>LandingPage</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <Checkbox
            list={classification}
            handleFilters={(filters) =>
              handleFilters(filters, "classification")
            }
          />
        </Col>
        <Col lg={12} xs={24}>
          <SearchFeature refreshFunction={updateSearchTerm} />
        </Col>
      </Row>

      {/* 펀드 상품을 보여주는 공간 */}
      <Row gutter={[16, 16]}>{fundCards}</Row>

      <br />

      {/* 더보기 */}
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHanlder}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
