import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StatementPage.css";

function StatementPage() {
  const [Statement, SetStatement] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getStetements(body);
  }, []);

  const getStetements = (body) => {
    axios.post("/api/statement", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          SetStatement([...Statement, ...response.data.statementInfo]);
        } else {
          SetStatement(response.data.statementInfo);
        }
        setPostSize(response.data.statementSize);
      } else {
        alert(" 펀드 판매 현황을 가져오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHanlder = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getStetements(body);
    setSkip(skip);
  };

  const renderItems = Statement.map((statement, index) => {
    return (
      <tr key={index}>
        <td>{statement.buyer.email}</td>
        <td>{statement.fund.classification}</td>
        <td>{statement.fund.kakaoTitle}</td>
        <td>{statement.fund.fundTitle}</td>
        <td>{statement.quantity}</td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>펀드 판매 현황</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>구매자 번호</th>
              <th>상품 구분</th>
              <th>상품 소개 이름</th>
              <th>펀드 이름</th>
              <th>판매된 펀드 금액</th>
            </tr>
          </thead>

          <tbody>{renderItems}</tbody>
        </table>
      </div>

      {/* {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total Amount: ${Total}</h2>
        </div>
      ) : ShowSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}

      {ShowTotal && <Paypal total={Total} onSuccess={transactionSuccess} />} */}

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHanlder}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default StatementPage;
