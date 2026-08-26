const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/";
mongoose.connect(mongoURL);//,{
    //useNewUrlParser: true,
    //useUnifiedTopology: true
//})
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connected");
})

db.on('error',()=>{
    console.log("error");
})
db.on('disconnected',()=>{
    console.log("disconnected");
})
module.exports = db;
