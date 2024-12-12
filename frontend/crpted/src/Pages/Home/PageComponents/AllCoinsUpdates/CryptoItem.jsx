import React, { useState,useContext } from "react";
import { AllCoinChart } from "./AllCoinChart";
import {CoinChartPage} from "../CoinChartPage"; // Import the full CoinChart component
import  CryptoContext  from "../../../../Context/CryptoContext";
const CryptoItem = ({ index, crypto }) => {
  const { getCurrencySymbol,currency } = useContext(CryptoContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-between items-center p-2.5 relative">
      <span>{index}</span>
      <span className="flex items-center">
        <img
          src={crypto.image}
          alt={`${crypto.name} logo`}
          className="w-6 mr-2"
        />
        {crypto.name} <span className="uppercase ml-1">{crypto.symbol}</span>
      </span>
      <span>{getCurrencySymbol()}{crypto.current_price.toLocaleString()}</span>
      <span
        className={
          crypto.price_change_percentage_24h >= 0
            ? "text-green-500"
            : "text-red-500"
        }
      >
        {crypto.price_change_percentage_24h.toFixed(2)}%
      </span>
      <span>{getCurrencySymbol()}{crypto.market_cap.toLocaleString()}</span>
      {/* Clickable smaller chart */}
      <div onClick={openModal}>
        <AllCoinChart coinId={crypto.id} />
      </div>
      <button className="px-3 py-1 border border-gray-500 bg-transparent text-white rounded-md hover:bg-gray-700">
        Trade
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-gray-900 rounded-lg shadow-lg p-5 w-[90%] md:w-[70%]">
            <button
              className="absolute top-4 right-4 text-white text-lg"
              onClick={closeModal}
            >
              ✖
            </button>
            <CoinChartPage coinId={crypto.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoItem;
