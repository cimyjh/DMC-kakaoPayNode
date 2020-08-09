const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Statement } = require("../models/Statement");

router.post("/", (req, res) => {
  // let order = req.body.order ? req.body.order : "desc";
  // let sortBy = req.body.sortBy ? req.body.sortBy : "_id";

  // fund collection에 들어 있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  // for (let key in req.body.filters) {
  //   if (req.body.filters[key].length > 0) {
  //     console.log("key", key);

  //     if (key === "price") {
  //       findArgs[key] = {
  //         //Greater than equal
  //         $gte: req.body.filters[key][0],
  //         //Less than equal
  //         $lte: req.body.filters[key][1],
  //       };
  //     } else {
  //       findArgs[key] = req.body.filters[key];
  //     }
  //   }
  // }

  if (term) {
    Statement.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("buyer")
      .populate("fund")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, statementInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          fundInfo,
          postSize: statementInfo.length,
        });
      });
  } else {
    Statement.find(findArgs)
      .populate("buyer")
      .populate("fund")
      // .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, statementInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          statementInfo,
          postSize: statementInfo.length,
        });
      });
  }
});

module.exports = router;
