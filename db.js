const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
    throw new Error("MONGO_URL is not set. Add your MongoDB Atlas connection string to .env.");
}

const connectionPromise = mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected");
})

db.on('error', (error) => {
    console.error("MongoDB connection error:", error.message);
})
db.on('disconnected', () => {
    console.log("disconnected");
})
module.exports = connectionPromise;
