import React, { useState } from "react";
import { Typography, Button, Form, Input, Divider } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
const { TextArea } = Input;

const Classifications = [
  { key: 1, value: "펀드" },
  { key: 2, value: "부동산" },
];

function UploadProductPage(props) {
  //판매자
  const [Seller, setSeller] = useState("");

  //상품 구분
  const [Classification, setClassification] = useState("");

  //상품 소개 이름
  const [KakaoTitle, setKakaoTitle] = useState("");

  //펀드 진짜 이름
  const [FundTitle, setFundTitle] = useState("");

  //펀드 지역
  const [Local, setLocal] = useState("");

  //펀드 테마
  const [FundTheme, setFundTheme] = useState("");

  //펀드 위험
  const [FundDanger, setFundDanger] = useState("");

  //누적투자자 수
  const [SalesPeople, setSalesPeople] = useState("");

  //누적 판매 금액
  const [SalesAmount, setSalesAmount] = useState("");

  //설중 후 수익률
  const [AfterYield, setAfterYield] = useState("");

  //보수
  const [Fess, setFess] = useState("");

  //   const [Description, setDescription] = useState("");
  //   const [Price, setPrice] = useState(0);
  //   const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  //글 상자 작동을 위한 event
  const sellerChangeHandler = (event) => {
    setSeller(event.currentTarget.value);
  };

  const classificationChangeHandler = (event) => {
    setClassification(event.currentTarget.value);
  };

  const kakaoTitleChangeHandler = (event) => {
    setKakaoTitle(event.currentTarget.value);
  };

  const fundTitleChangeHandler = (event) => {
    setFundTitle(event.currentTarget.value);
  };

  const localChangeHandler = (event) => {
    setLocal(event.currentTarget.value);
  };

  const fundThemeChangeHandler = (event) => {
    setFundTheme(event.currentTarget.value);
  };

  const fundDamgerChangeHandler = (event) => {
    setFundDanger(event.currentTarget.value);
  };

  const salesPeopleChangeHandler = (event) => {
    setSalesPeople(event.currentTarget.value);
  };

  const salesAmountChangeHandler = (event) => {
    setSalesAmount(event.currentTarget.value);
  };

  const afterYieldChangeHandler = (event) => {
    setAfterYield(event.currentTarget.value);
  };

  const fessChangeHandler = (event) => {
    setFess(event.currentTarget.value);
  };

  //이미지 전송
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  //form 전송
  const submitHandler = (event) => {
    event.preventDefault();

    if (!Seller || !KakaoTitle || !FundTitle || !Local || Images.length === 0) {
      return alert(" 모든 값을 넣어주셔야 합니다.");
    }

    //서버에 채운 값들을 request로 보낸다.

    //변수를 객체로 전송하기 위한 req body
    const body = {
      //로그인 된 사람의 ID
      buyer: props.user.userData._id,
      seller: Seller,
      classification: Classification,
      kakaoTitle: KakaoTitle,
      fundTitle: FundTitle,
      local: Local,
      fundTheme: FundTheme,
      fundDanger: FundDanger,
      salesPeople: SalesPeople,
      salesAmount: SalesAmount,
      afterYield: AfterYield,
      fess: Fess,
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
        <h2> 펀드 상품 업로드</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <Divider>펀드 이름 및 유형</Divider>
        <br />
        <label>상품 구분</label>
        <br />
        <select onChange={classificationChangeHandler} value={Classification}>
          {Classifications.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>판매자</label>
        <Input onChange={sellerChangeHandler} value={Seller} />
        <br />
        <br />
        <label>카카오페이 상품 소개명</label>
        <Input onChange={kakaoTitleChangeHandler} value={KakaoTitle} />
        <br />
        <br />
        <label>펀드명</label>
        <Input onChange={fundTitleChangeHandler} value={FundTitle} />
        <br />
        <br />
        <label>펀드 지역 구분</label>
        <Input onChange={localChangeHandler} value={Local} />
        <br />
        <br />
        <label>펀드 테마</label>
        <Input onChange={fundThemeChangeHandler} value={FundTheme} />
        <br />
        <br />
        <label>펀드 위험도</label>
        <Input onChange={fundDamgerChangeHandler} value={FundDanger} />
        <br />
        <br />

        <Divider>펀드와 관련된 수치</Divider>
        <br />
        <label>누적 투자자 수</label>
        <Input
          type="number"
          onChange={salesPeopleChangeHandler}
          value={SalesPeople}
        />
        <br />
        <br />
        <label>누적 판매 금액</label>
        <Input
          type="number"
          onChange={salesAmountChangeHandler}
          value={SalesAmount}
        />
        <br />
        <br />
        <label>설정 후 수익률</label>
        <Input
          type="number"
          onChange={afterYieldChangeHandler}
          value={AfterYield}
        />
        <br />
        <br />
        <label>보수( 넓은 범위에서의 수수료 )</label>
        <Input type="number" onChange={fessChangeHandler} value={Fess} />
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

export default UploadProductPage;
