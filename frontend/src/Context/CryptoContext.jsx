import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creating the context to store cryptocurrency data and settings.
const CryptoContext = createContext();

// Provider component that wraps the children and provides the context values.
export const CryptoContextProvider = (props) => {
  const [allCryptoData, setAllCryptoData] = useState([]);
  const [crntCryptoData, setCrntCryptoData] = useState([]);
  const [currency, setCurrency] = useState("INR");

  // Function to fetch cryptocurrency data from CoinGecko API.
  const fetchdata = async () => {
    try {
      const INRoptions = {
        method: "GET",
          url: "https://crpted.onrender.com/proxy/coingecko/coins/markets",
          params: { vs_currency: "inr" },
      };
      const USDoptions = {
        method: "GET",
        url: "https://crpted.onrender.com/proxy/coingecko/coins/markets",
        params: { vs_currency: "usd" },
      };

      const [INRres, USDres] = await Promise.all([
        axios.request(INRoptions),
        axios.request(USDoptions),
      ]);

      const data = [INRres.data, USDres.data];
      setCrntCryptoData(data);
      setAllCryptoData(currency === "INR" ? data[0] : data[1]);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Function to fetch chart data from CoinGecko API.
  const fetchChartData = async (setChartData, setDifference, coinId, timeRange = 1) => {
    try {
      const now = new Date();
      const timeAgo = now.getTime() - timeRange * 24 * 60 * 60 * 1000; // Time range in milliseconds
      const fromTimestamp = Math.floor(timeAgo / 1000); // Convert to Unix timestamp

      const response = await axios.get(
        `https://crpted.onrender.com/proxy/coingecko/coins/${coinId}/market_chart/range`,
        {
          params: {
            vs_currency: currency,
            from: fromTimestamp,
            to: Math.floor(Date.now() / 1000), // Current time in Unix timestamp
          },
        }
      );

      const data = response.data.prices.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        price,
      }));

      setChartData(data);

      // Calculate price difference between the last and first point
      const diff = data[data.length - 1].price - data[0].price;
      setDifference(diff);
    } catch (error) {
      console.log("Error fetching chart data");
    }
  };

  // Function to get the currency symbol
  const getCurrencySymbol = () => {
    switch (currency) {
      case "USD":
        return "$";
      case "INR":
        return "₹";
      default:
        return currency.toUpperCase();
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchdata();
  }, []);

  // Update `allCryptoData` when `currency` or `crntCryptoData` changes
  useEffect(() => {
    if (crntCryptoData.length > 0) {
      setAllCryptoData(currency === "INR" ? crntCryptoData[0] : crntCryptoData[1]);
    }
  }, [currency, crntCryptoData]);

  // Context value includes cryptocurrency data and functions to update currency.
  const Crypto = {
    allCryptoData,
    setAllCryptoData,
    setCurrency,
    currency,
    fetchChartData,
    getCurrencySymbol,
  };

  return (
    // Providing the context value to children components.
    <CryptoContext.Provider value={Crypto}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
