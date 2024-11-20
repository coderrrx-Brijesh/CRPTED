import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const oneWeekAgoInSeconds = nowInSeconds - 7 * 24 * 60 * 60; // 7 days ago

      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1730983718&to=1731588483',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-PAD5i6MjsqAgusMstpzG8Mpb'}
      };
      try {
        const response = await axios.request(options);
        console.log(response);
        const { prices, market_caps, total_volumes } = response.data;

        const labels = prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString());
        const priceData = prices.map(([, value]) => value);
        const marketCapData = market_caps.map(([, value]) => value);
        const volumeData = total_volumes.map(([, value]) => value);

        const transformedData = {
          labels,
          datasets: [
            {
              label: "Prices (INR)",
              data: priceData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
            },
            {
              label: "Market Cap (INR)",
              data: marketCapData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.3,
            },
            {
              label: "Total Volume (INR)",
              data: volumeData,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.3,
            },
          ],
        };

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      {chartData ? (
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};
