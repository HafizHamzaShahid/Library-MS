const mongoose = require("mongoose");

// Mongoose schema and model for FashionShopData
// Fields are taken from the coursework brief
const fashionProductSchema = new mongoose.Schema(
  {
    productCategory: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    unitsSold: {
      type: Number,
      required: true,
      min: 0,
    },
    returns: {
      type: Number,
      required: true,
      min: 0,
    },
    revenue: {
      type: Number,
      required: true,
      min: 0,
    },
    customerRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    stockLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    season: {
      type: String,
      required: true,
      trim: true,
    },
    trendScore: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    collection: "FashionShopData",
    timestamps: false,
  }
);

const FashionProduct = mongoose.model("FashionProduct", fashionProductSchema);

module.exports = FashionProduct;


