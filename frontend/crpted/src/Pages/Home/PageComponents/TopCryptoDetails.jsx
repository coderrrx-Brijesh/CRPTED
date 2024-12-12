import React, { useEffect, useState, useContext } from 'react';
import CryptoContext from '../../../Context/CryptoContext';
import CurrencySwitchButton from './CurrencyChangeButton';

const TopCryptoDetails = () => {
  const { allCryptoData, currency, setCurrency,getCurrencySymbol } = useContext(CryptoContext);


  return (
    <div className="bg-[#111] p-5 rounded-lg text-white">
      <div className="flex justify-around mb-5">
        <button className="px-4 py-2 bg-gray-900 rounded-full text-white">Crypto</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">DeFi</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">BSC</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">NFT</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">Metaverse</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">Polkadot</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">Solana</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">Opensea</button>
        <button className="px-4 py-2 bg-black rounded-full text-white">Marketplace</button>
      </div>
      <div className="flex gap-5 flex-wrap">
        {allCryptoData.slice(0, 5).map((crypto, index) => (
          <div key={index} className="bg-black p-5 rounded-lg w-52">
            <div className="flex justify-between mb-2 text-gray-400 text-sm">
              <span>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </span>
              <img src={crypto.image} alt={`${crypto.name} logo`} className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">
              {getCurrencySymbol()} {crypto.current_price.toFixed(2)}
            </div>
            <div className="flex justify-between items-center mt-3 text-sm">
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
