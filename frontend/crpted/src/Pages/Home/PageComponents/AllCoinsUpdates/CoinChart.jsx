import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const PriceUpdateChart = ({ coinId, currency = "inr" }) => {
  const [priceData, setPriceData] = useState([]);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`,
          {
            params: {
              vs_currency: currency,
              from: midnight,
              to: Math.floor(Date.now() / 1000),
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

        setPriceData(data);

        const diff = data[data.length - 1].price - data[0].price;
        setDifference(diff);
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };

    fetchPriceData();
  }, [coinId, currency]);

  return (
    <div style={{ width: "200px", height: "100px" }}>
      <ResponsiveContainer>
        <AreaChart
          data={priceData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={false} axisLine stroke="#8884d8" />
          <YAxis tick={false} axisLine stroke="#8884d8" />
          {/* <Tooltip contentStyle={{backgroundColor: "black", width: "150px"}} formatter={(value)=>value.toFixed(2)}/> */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            fill={difference > 0 ? "green" : "red"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};