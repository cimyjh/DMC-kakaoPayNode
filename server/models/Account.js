const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    uniqueuser: {
      type: String,
    },

    account: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

accountSchema.index(
  {
    user: "text",
    account: "text",
  },
  {
    weights: {
      buyer: 5,
      account: 1,
    },
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = { Account };
