const mongoose = require("mongoose");
//const mongoURL = process.env.MONGO_URL_LOCAL; //LOCAL HOST..
const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
    throw new Error("MONGO_URL is not configured");
}

const connectionPromise = mongoose.connect(mongoURL);//,{
//useNewUrlParser: true,
//useUnifiedTopology: true
//})
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
