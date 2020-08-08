const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Fund } = require("../models/Fund");

//=================================
//             Fund
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const fund = new Fund(req.body);

  fund.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/funds", (req, res) => {
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
    Fund.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("buyer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, fundInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          fundInfo,
          postSize: fundInfo.length,
        });
      });
  } else {
    Fund.find(findArgs)
      .populate("buyer")
      // .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, fundInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          fundInfo,
          postSize: fundInfo.length,
        });
      });
  }
});

//id=123123123,324234234,324234234  type=array
router.get("/funds_by_id", (req, res) => {
  let type = req.query.type;
  let fundtIds = req.query.id;

  if (type === "array") {
    //id=123123123,324234234,324234234 이거를
    //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
    let ids = req.query.id.split(",");
    fundIds = ids.map((item) => {
      return item;
    });
  }

  //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

  Fund.find({ _id: { $in: fundIds } })
    .populate("buyer")
    .exec((err, fund) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(fund);
    });
});

module.exports = router;
