import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import  CryptoContext  from "../../../../Context/CryptoContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AllCoinChart = ({ coinId, currency = "inr" }) => {
  const [chartData, setChartData] = useState([]);
  const [difference, setDifference] = useState(0);
  const{fetchChartData} = useContext(CryptoContext);
  useEffect(() => {
    fetchChartData(setChartData, setDifference, coinId);
  }, [coinId, currency]);

  return (
    <div style={{ width: "200px", height: "100px" }}>
      <ResponsiveContainer>
        <AreaChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={false} axisLine stroke="#8884d8" />
          <YAxis domain={['dataMin', 'dataMax']} tick={false} axisLine stroke="#8884d8" />
          <Tooltip
            contentStyle={{ backgroundColor: "black", width: "150px" }}
            position={{ x: 50, y: -70 }}
            formatter={(value) => value.toFixed(2)}
          />
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
