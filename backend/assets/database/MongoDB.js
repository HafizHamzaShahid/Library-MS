const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

let _db;

const mongoConnect = (callback) => {
  const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  
  MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
      console.log("Connected to MongoDB");
      _db = client.db();
      callback();
    })
    .catch(err => console.error("MongoDB connection error:", err));
};

const getDb = () => {
  if (_db) return _db;
  throw "No database found!";
};

module.exports = { mongoConnect, getDb };
