require("dotenv").config();
const PORT = process.env.PORT || 3000;
// backend uses express as server
const express = require('express');
const app = express();
app.use(express.json());

// cors for testing backend and front end together
const cors = require('cors');
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Connect DB
const { connectDB } = require("./config/database");
connectDB();




const signRoutes = require("./Routes/SignRoutes");
app.use("/api/v1", signRoutes);

// const dataRoutes = require("./Routes/DataRoutes");
// app.use("/api/v1", dataRoutes);

app.listen(PORT, (req, res) => {
  console.log(`APP IS STARTED AT ${PORT}`);
});
