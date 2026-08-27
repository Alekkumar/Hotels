const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL || process.env.MONGO_URL_LOCAL || "mongodb://127.0.0.1:27017/";

const connectionPromise = mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected");
})

db.on('error', () => {
    console.log("error");
})
db.on('disconnected', () => {
    console.log("disconnected");
})
module.exports = connectionPromise;
