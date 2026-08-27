const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const db = require("./db.js");
const personRouter = require("./routers/personrouter.js");
const menuRouter = require("./routers/menurouters.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.send("BABA KA DHABA API is running successfully!");
});

// Mounted Routes
app.use("/person", personRouter);
app.use("/menu", menuRouter);

// Start Server after Database Connection
db.then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error.message);
  process.exit(1);
});