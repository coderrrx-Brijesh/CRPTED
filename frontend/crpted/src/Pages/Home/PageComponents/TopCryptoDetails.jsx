import React, { useEffect, useState } from 'react';
import './TopCryptoDetails.css';
const TopCryptoDetails = () => {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    // Fetch live data from CoinGecko API (includes market cap and image URLs)
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr'
        );
        const data = await response.json();
        const top4Data=data.slice(0,4);
        const fetchedData = top4Data.map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
          price: crypto.current_price,
          img: crypto.image,
          change: crypto.price_change_percentage_24h,
          marketCap: crypto.market_cap,  // Market capitalization in INR
        }));
        setCryptoData(fetchedData);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="crypto-details-container">
      <div className="crypto-tabs">
        <button className="active-tab">Crypto</button>
        <button>DeFi</button>
        <button>BSC</button>
        <button>NFT</button>
        <button>Metaverse</button>
        <button>Polkadot</button>
        <button>Solana</button>
        <button>Opensea</button>
        <button>Marketplace</button>
      </div>
      <div id='top-crypto-list'>
        <div className="crypto-cards">
          {cryptoData.map((crypto, index) => (
            <div key={index} className="crypto-card">
              <div className="crypto-header">
                <span>{crypto.name} ({crypto.symbol})</span> 
                <img src={crypto.img} alt={`${crypto.name} logo`} className="crypto-logo" />
              </div>
              <div className="crypto-price">INR {crypto.price.toFixed(2)}</div>
              <div className="crypto-footer">
                <span>Market Cap: INR {crypto.marketCap.toLocaleString()}</span>
                <span className={crypto.change >= 0 ? 'price-up' : 'price-down'}>
                  {crypto.change >= 0?`+${crypto.change.toFixed(2)}%`:`${crypto.change.toFixed(2)}%`}
                </span>
              </div>
            </div>
              ))}
      </div>
      </div>
    </div>
  );
};

export default TopCryptoDetails;
