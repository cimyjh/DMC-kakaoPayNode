const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statementSchema = mongoose.Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    fund: {
      type: Schema.Types.ObjectId,
      ref: "Fund",
    },

    //상품 구분 ex펀드, 부동산
    classification: {
      type: String,
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

    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

statementSchema.index(
  {
    buyer: "text",
    quantity: "text",
  },
  {
    weights: {
      buyer: 5,
      quantity: 1,
    },
  }
);

const Statement = mongoose.model("Statement", statementSchema);

module.exports = { Statement };
