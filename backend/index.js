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
    origin: "http://localhost:5173", // Your frontend URL
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
