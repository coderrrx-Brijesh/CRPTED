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




const signRoutes = require("./routes/SignRoutes");
app.use("/api/v1", signRoutes);

app.listen(PORT, (req, res) => {
  console.log(`APPP IS STARTED AT ${PORT}`);
});
