import React, { useEffect, useState,useContext } from "react";
import  CryptoContext  from "../../../../Context/CryptoContext";
import {
  AreaChart,
  LineChart,
  Line,
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
    <div  className="w-1/12 h-1/5" style={{ width: "200px", height: "100px" }}>
      <ResponsiveContainer>
        <LineChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }} data={chartData}>
          <CartesianGrid  />
          <XAxis dataKey="time" tick={false} axisLine stroke={difference > 0 ? "green" : "red"} />
          <YAxis domain={['dataMin', 'dataMax']} tick={false} axisLine stroke={difference > 0 ? "green" : "red"} />
          <Tooltip
            contentStyle={{ backgroundColor: "black", width: "150px" }}
            position={{ x: 50, y: -70 }}
            formatter={(value) => value.toFixed(2)}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={difference > 0 ? "green" : "red"}
            strokeWidth={2}
            dot={false}
            // fill={difference > 0 ? "green" : "red"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
