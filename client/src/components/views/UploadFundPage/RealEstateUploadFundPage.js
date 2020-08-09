import React, { useState } from "react";
import { Typography, Button, Form, Input, Divider } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
const { TextArea } = Input;

// const Continents = [
//   { key: 1, value: "Africa" },
//   { key: 2, value: "Europe" },
//   { key: 3, value: "Asia" },
//   { key: 4, value: "North America" },
//   { key: 5, value: "South America" },
//   { key: 6, value: "Australia" },
//   { key: 7, value: "Antarctica" },
// ];

function RealEstateUploadProductPage(props) {
  //판매자
  const [Seller, setSeller] = useState("");

  //펀드 진짜 이름
  const [FundTitle, setFundTitle] = useState("");

  //상품 구분
  const [Classification, setClassification] = useState("");

  //연이율
  const [MortgageInterestRate, setMortgageInterestRate] = useState("");

  //투자기간
  const [InvestmentPeriod, setInvestmentPeriod] = useState("");

  //상환방식
  const [RepaymentMethod, setRepaymentMethod] = useState("");

  //   const [Description, setDescription] = useState("");
  //   const [Price, setPrice] = useState(0);
  //   const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  //글 상자 작동을 위한 event
  const sellerChangeHandler = (event) => {
    setSeller(event.currentTarget.value);
  };

  const fundTitleChangeHandler = (event) => {
    setFundTitle(event.currentTarget.value);
  };

  const classificationChangeHandler = (event) => {
    setClassification(event.currentTarget.value);
  };

  const mortgageInterestRateChangeHandler = (event) => {
    setMortgageInterestRate(event.currentTarget.value);
  };

  const investmentPeriodChangeHandler = (event) => {
    setInvestmentPeriod(event.currentTarget.value);
  };

  const repaymentMethodChangeHandler = (event) => {
    setRepaymentMethod(event.currentTarget.value);
  };

  //이미지 전송
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  //form 전송
  const submitHandler = (event) => {
    event.preventDefault();

    if (!Seller || !FundTitle || Images.length === 0) {
      return alert(" 모든 값을 넣어주셔야 합니다.");
    }

    //서버에 채운 값들을 request로 보낸다.

    //변수를 객체로 전송하기 위한 req body
    const body = {
      //로그인 된 사람의 ID
      buyer: props.user.userData._id,
      seller: Seller,
      classification: Classification,
      fundTitle: FundTitle,
      mortgageInterestRate: MortgageInterestRate,
      investmentPeriod: InvestmentPeriod,
      repaymentMethod: RepaymentMethod,
      images: Images,
    };

    Axios.post("/api/fund", body).then((response) => {
      if (response.data.success) {
        alert("펀드 상품 업로드에 성공 했습니다.");
        props.history.push("/");
      } else {
        alert("펀드 상품 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> 부동산 담보 상품 업로드</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <Divider>펀드 이름 및 유형</Divider>
        <br />
        <label>상품 구분___펀드 or 부동산</label>
        <Input onChange={classificationChangeHandler} value={Classification} />
        <br />
        <label>판매자</label>
        <Input onChange={sellerChangeHandler} value={Seller} />
        <br />
        <br />
        <label>펀드명</label>
        <Input onChange={fundTitleChangeHandler} value={FundTitle} />
        <br />
        <br />
        <label>연이율</label>
        <Input
          onChange={mortgageInterestRateChangeHandler}
          value={MortgageInterestRate}
        />
        <br />
        <br />
        <label>투자기간</label>
        <Input
          onChange={investmentPeriodChangeHandler}
          value={InvestmentPeriod}
        />
        <br />
        <br />
        <label>상환방식</label>
        <Input
          onChange={repaymentMethodChangeHandler}
          value={RepaymentMethod}
        />
        <br />
        <br />
        {/* <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br /> */}
        {/* <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {" "}
              {item.value}
            </option>
          ))}
        </select> */}
        <button type="submit">저장하기</button>
      </Form>
    </div>
  );
}

export default RealEstateUploadProductPage;
