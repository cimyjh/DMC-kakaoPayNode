const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundSchema = mongoose.Schema(
  {
    //구매자
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    //상품 구분 ex펀드, 부동산
    classification: {
      type: String,
    },

    //판매자 ex)키움자산운용, 피플펀드
    seller: {
      type: String,
      maxlength: 50,
    },

    //상품 소개 이름
    kakaoTitle: {
      type: String,
      maxlength: 200,
    },

    //펀드 진짜 이름
    fundTitle: {
      type: String,
      maxlength: 200,
    },

    //펀드 지역
    local: {
      type: String,
      maxlength: 50,
    },

    //펀드 테마
    fundTheme: {
      type: String,
      maxlength: 50,
    },

    //펀드 위험
    fundDanger: {
      type: String,
      maxlength: 50,
    },

    description: {
      type: String,
    },

    //누적 투자자 수
    salesPeople: {
      type: Number,
      default: 0,
    },

    //누적 판매 금액
    salesAmount: {
      type: Number,
      default: 0,
    },

    //설정 후 수익률
    afterYield: {
      type: Number,
      default: 0,
    },

    //보수_수수료
    fess: {
      type: Number,
      default: 0,
    },

    images: {
      type: Array,
      default: [],
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

fundSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Fund = mongoose.model("Fund", fundSchema);

module.exports = { Fund };
