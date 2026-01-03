const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  await client.connect();
  db = client.db("dt_app");
  console.log("MongoDB connected");
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
