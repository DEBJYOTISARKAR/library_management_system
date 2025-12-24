const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./src/routes");
const db = require("./src/config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Library Management Backend Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
