const mongoose = require("mongoose");

const SiteDataSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const SiteData = mongoose.model("SiteData", SiteDataSchema);

module.exports = SiteData;
