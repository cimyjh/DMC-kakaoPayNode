const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Account } = require("../models/Account");

router.post("/save", (req, res) => {
  const account = new Account(req.body);

  account.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/update", (req, res) => {
  //   const account = new Account(req.body);

  Account.findOneAndUpdate(
    { user: req.body.user },
    { account: req.body.account },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    }
  );
});

router.post("/", (req, res) => {
  let userId = req.body.userId;

  Account.findOne({ uniqueuser: userId })
    .populate("user")
    .exec((err, userAccountInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        userAccountInfo,
      });
    });
});

router.post("/purchase", (req, res) => {
  //   const account = new Account(req.body);

  Account.findOneAndUpdate(
    { uniqueuser: req.body.userId },
    { account: req.body.account },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    }
  );
});

module.exports = router;
