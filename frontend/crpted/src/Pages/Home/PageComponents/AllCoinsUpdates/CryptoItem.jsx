import React from 'react';

const CryptoItem = ({ index, crypto }) => {
  return (
    <div className="flex justify-between items-center p-2.5">
      <span>{index}</span>
      <span className="flex items-center">
        <img src={crypto.image} alt={`${crypto.name} logo`} className="w-6 mr-2" />
        {crypto.name} <span className="uppercase ml-1">{crypto.symbol}</span>
      </span>
      <span>₹{crypto.current_price.toLocaleString(2)}</span>
      <span className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
        {crypto.price_change_percentage_24h.toFixed(2)}%
      </span>
      <span>₹{crypto.market_cap.toLocaleString()}</span>
      <span className="text-gray-400">{'N/A'}</span>
      <button className="px-3 py-1 border border-gray-500 bg-transparent text-white rounded-md hover:bg-gray-700">
        Trade
      </button>
    </div>
  );
};

export default CryptoItem;
