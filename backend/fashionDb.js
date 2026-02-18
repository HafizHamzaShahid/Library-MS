const mongoose = require("mongoose");
const FashionProduct = require("./models/fashionProduct");
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

// Connection helper for the FashionShopData collection using Mongoose
const connectFashionDb = async () => {
  const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  await mongoose.connect(uri, {
    // Options kept minimal for compatibility with newer mongoose versions
  });

  console.log("Mongoose connected (FashionShopData)");
};

module.exports = { connectFashionDb, FashionProduct };


