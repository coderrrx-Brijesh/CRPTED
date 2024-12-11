import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { FaDollarSign, FaRupeeSign } from "react-icons/fa";
// Creating the context to store cryptocurrency data and settings.

const CryptoContext = createContext();

// Provider component that wraps the children and provides the context values.

export const CryptoContextProvider = (props) => {
  const [allCryptoData, setAllCryptoData] = useState([]);
  const [currency, setCurrency] = useState("INR");
  //  fetch cryptocurrency data from CoinGecko API.
  const fetchdata = async () => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets",
      params: { vs_currency: currency}, 
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PAD5i6MjsqAgusMstpzG8Mpb"
      },
    };
    
    try {
      const res = await axios.request(options);
      console.log(res.data);
      setAllCryptoData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  // fetch chart data from CoinGecko API
  const fetchChartData = async (setChartData, setDifference,coinId,timeRange=1,currency) => {
    try {
      const now = new Date();
      const timeAgo = now.getTime() - timeRange * 24 * 60 * 60 * 1000; // 24 hours ago in milliseconds
      const fromTimestamp = Math.floor(timeAgo / 1000); // Convert to Unix timestamp

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`,
        {
          params: {
            vs_currency: currency,
            from: fromTimestamp,
            to: Math.floor(Date.now() / 1000), // Current time in Unix timestamp
          },
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-PAD5i6MjsqAgusMstpzG8Mpb", // Replace with a valid API key if needed
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
      console.log("Error fetching price data");
    }
  };

  // functoin to get the currency symbol
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "INR":
        return "₹";
      default:
        return currency.toUpperCase();
    }
  };
  
  
  // useEffect hook to refetch data whenever the currency changes.
  useEffect(() => {
    fetchdata();
  }, [currency]); 

  // Context value includes cryptocurrency data and functions to update currency.
  const Crypto = { allCryptoData,setAllCryptoData, setCurrency, currency,fetchChartData,getCurrencySymbol };

  return (
    // Providing the context value to children components.
    <CryptoContext.Provider value={Crypto}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
