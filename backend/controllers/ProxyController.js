const axios = require("axios");

// Proxy for CoinGecko API calls - specifically handling coins/markets
exports.proxyCoinGecko = async (req, res) => {
  try {
    let url;
    // Special handling for the coins/markets endpoint
    if (req.path === "/coingecko/coins/markets") {
      url = "https://api.coingecko.com/api/v3/coins/markets";
    } else {
      // For other endpoints
      const { endpoint } = req.params;
      url = `https://api.coingecko.com/api/v3/${endpoint}`;
    }

    console.log("Proxying request to:", url);

    const response = await axios.get(url, {
      params: req.query,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PAD5i6MjsqAgusMstpzG8Mpb",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error proxying to CoinGecko:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Error fetching data from CoinGecko",
      details: error.message,
    });
  }
};

// Proxy for CoinGecko market chart range API specifically
exports.proxyMarketChartRange = async (req, res) => {
  try {
    const { coinId } = req.params;
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`;

    console.log("Proxying market chart request to:", url);

    const response = await axios.get(url, {
      params: req.query,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PAD5i6MjsqAgusMstpzG8Mpb",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error proxying to CoinGecko market chart:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Error fetching chart data from CoinGecko",
      details: error.message,
    });
  }
};

// Proxy for NewsAPI
exports.proxyNewsAPI = async (req, res) => {
  try {
    const apiKey = "738082046b0242a7bbad05a70b843adf"; // Using the key from your error logs
    const params = { ...req.query, apiKey };

    console.log(
      "Proxying request to NewsAPI with params:",
      JSON.stringify(params)
    );

    // The 426 error suggests NewsAPI requires HTTPS
    // Make sure we're using HTTPS here
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error proxying to NewsAPI:", error.message);
    if (error.response) {
      console.error("NewsAPI response status:", error.response.status);
      console.error("NewsAPI response data:", error.response.data);
    }

    // If there's a 426 error, provide a more helpful message
    if (error.response && error.response.status === 426) {
      return res.status(502).json({
        error:
          "The NewsAPI requires a paid subscription for this type of request",
        details:
          "NewsAPI's free tier only allows requests from localhost and doesn't work in production environments",
      });
    }

    res.status(error.response?.status || 500).json({
      error: "Error fetching data from NewsAPI",
      details: error.message,
    });
  }
};
