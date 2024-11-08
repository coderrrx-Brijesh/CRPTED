// cors for testing backend and front end together
const cors = require('cors');
// backend uses express as server
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

// Connecting to database
const connectDB = require('./config/database');
connectDB();

// all endpoint swill be handled by mainrouter
const mainRouter = require('./Routes/Route');
app.use("/app/V1", mainRouter);
