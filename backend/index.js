require("dotenv").config();
const PORT = process.env.PORT || 3000;
// backend uses express as server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// cors for testing backend and front end together
app.use(
  cors({
    origin: "https://crpted.vercel.app", // Your frontend URL
    credentials: true, // Important for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect DB
const { connectDB } = require("./config/database");
connectDB();

const signRoutes = require("./Routes/SignRoutes");
app.use("/api/v1", signRoutes);

const dataRoutes = require("./Routes/DataRoutes");
app.use("/api/v1", dataRoutes);

// Add proxy routes to handle external API requests
const proxyRoutes = require("./Routes/ProxyRoutes");
app.use("/proxy", proxyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
