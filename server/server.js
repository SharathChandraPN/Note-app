const express = require("express");
const cors = require("cors");
const dns = require("dns");
const noteRoutes = require("./routes/noteRoutes");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Notes API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});