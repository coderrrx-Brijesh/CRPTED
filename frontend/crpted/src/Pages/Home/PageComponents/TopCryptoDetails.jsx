import React, { useEffect, useState } from 'react';

const TopCryptoDetails = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr'
        );
        const data = await response.json();
        const top4Data = data.slice(0, 4);
        const fetchedData = top4Data.map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
          price: crypto.current_price,
          img: crypto.image,
          change: crypto.price_change_percentage_24h,
          marketCap: crypto.market_cap,
        }));
        setCryptoData(fetchedData);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg- bg-[#111] p-5 rounded-lg text-white">
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
      <div className="flex gap-5">
        {cryptoData.map((crypto, index) => (
          <div key={index} className="bg-black p-5 rounded-lg w-52">
            <div className="flex justify-between mb-2 text-gray-400 text-sm">
              <span>{crypto.name} ({crypto.symbol})</span>
              <img src={crypto.img} alt={`${crypto.name} logo`} className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">INR {crypto.price.toFixed(2)}</div>
            <div className="flex justify-between items-center mt-3 text-sm">
              <span>Market Cap: INR {crypto.marketCap.toLocaleString()}</span>
              <span className={crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {crypto.change >= 0 ? `+${crypto.change.toFixed(2)}%` : `${crypto.change.toFixed(2)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCryptoDetails;
