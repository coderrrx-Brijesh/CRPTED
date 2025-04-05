const express = require("express");
const router = express.Router();
const { 
    proxyCoinGecko, 
    proxyMarketChartRange, 
    proxyNewsAPI 
} = require("../controllers/ProxyController");

// Specific endpoint for market chart range data
router.get("/coingecko/coins/:coinId/market_chart/range", proxyMarketChartRange);

// Generic CoinGecko API proxy for coins/markets endpoint
router.get("/coingecko/coins/markets", proxyCoinGecko);

// Generic CoinGecko API proxy for other endpoints
router.get("/coingecko/:endpoint", proxyCoinGecko);

// NewsAPI proxy
router.get("/newsapi", proxyNewsAPI);

module.exports = router;
