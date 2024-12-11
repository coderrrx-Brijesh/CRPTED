import React, { useEffect, useState, useContext } from "react";
import CryptoContext from "../../../Context/CryptoContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const CoinChartPage = ({ coinId }) => {
  const [chartData, setChartData] = useState([]);
  const [difference, setDifference] = useState(0);
  const { fetchChartData,getCurrencySymbol,currency } = useContext(CryptoContext);
  const [timeRange, setTimeRange] = useState(1);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  useEffect(() => {
    fetchChartData(setChartData, setDifference, coinId,timeRange);
  }, [coinId,timeRange]);

  return (
    <div style={{ width: "100%", padding: "20px", backgroundColor: "#121212", color: "#e0e0e0", borderRadius: "8px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h2 style={{ margin: 0, color: "#ffffff" }}>Price Chart</h2>
        <p style={{ color: difference > 0 ? "#4caf50" : "#f44336", margin: "5px 0" }}>
          {difference > 0 ? `+${getCurrencySymbol()}${difference.toFixed(2)}` : `-${getCurrencySymbol()}${Math.abs(difference.toFixed(2))}`}
        </p>
        <select
          value={timeRange}
          onChange={handleTimeRangeChange}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "1px solid #424242",
            backgroundColor: "#1e1e1e",
            color: "#e0e0e0",
            marginTop: "10px",
          }}
        >
          <option value={1}>Last 24 Hours</option>
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
      </div>

      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <AreaChart
            margin={{ top: 10, right: 10, left: 40, bottom: 0 }}
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
            <XAxis
              dataKey="time"
              tick={{ fill: "#e0e0e0" }}
              axisLine={{ stroke: "#424242" }}
              tickLine={false}
            />
            <YAxis
              domain={["dataMin", "dataMax"]}
              axisLine={{ stroke: "#424242" }}
              tickLine={false}
              tick={{ fill: "#e0e0e0" }}
              tickFormatter={(value) => `${getCurrencySymbol()}${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                color: "#e0e0e0",
                borderRadius: "5px",
                border: "1px solid #424242",
              }}
              formatter={(value) => `${getCurrencySymbol()}${value.toFixed(2)}`}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4caf50"
              strokeWidth={2}
              dot={false}
              fill={difference > 0 ? "#2e7d32" : "#c62828"}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};