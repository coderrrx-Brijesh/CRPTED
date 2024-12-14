import React, { useEffect, useState, useContext } from 'react';
import CryptoContext from '../../../Context/CryptoContext';
import CurrencySwitchButton from './CurrencyChangeButton';

const TopCryptoDetails = () => {
  const { allCryptoData, currency, setCurrency,getCurrencySymbol } = useContext(CryptoContext);


  return (
    <div className="p-5 text-white w-[95%] mx-auto rounded-lg bg-[#140d36] border border-gray-800 ">
      <div className="flex justify-around mb-5 ">
        <button className="px-4 py-2 bg-gray-900 rounded-full text-white  border border-gray-800 ">Crypto</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800 hover:bg-gray-900">DeFi</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">BSC</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">NFT</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">Metaverse</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">Polkadot</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">Solana</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">Opensea</button>
        <button className="px-4 py-2 bg-black rounded-full text-white  border border-gray-800  hover:bg-gray-900">Marketplace</button>
      </div>
      <div className="flex gap-5 flex-wrap">
        {allCryptoData.slice(0, 5).map((crypto, index) => (
          <div key={index} className="bg-black p-5 rounded-lg w-52 border border-gray-800">
            <div className="flex justify-between mb-2 text-gray-400 text-sm items-center">
              <span>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </span>
              <img src={crypto.image} alt={`${crypto.name} logo`} className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold">
              {getCurrencySymbol()} {crypto.current_price.toFixed(2)}
            </div>
            <div className="flex justify-between items-end mt-3 text-xs ">
              <span>
                Market Cap: {getCurrencySymbol()}
                {crypto.market_cap.toLocaleString()}
              </span>
              <span
                className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}
              > 
                {crypto.price_change_percentage_24h >= 0
                  ? `+${crypto.price_change_percentage_24h.toFixed(2)}%`
                  : `${crypto.price_change_percentage_24h.toFixed(2)}%`}
              </span>
            </div>
          </div>
        ))}
        <CurrencySwitchButton/>
      </div>
    </div>
  );
};

export default TopCryptoDetails;
