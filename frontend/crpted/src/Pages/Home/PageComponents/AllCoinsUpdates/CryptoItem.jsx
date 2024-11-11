import React from 'react';
import './CryptoItem.css';

const CryptoItem = ({ index, crypto }) => {
  return (
    <div className="crypto-item">
      <span>{index}</span>
      <span className="crypto-name">
        <img src={crypto.image} alt={`${crypto.name} logo`} className="crypto-logo" />
        {crypto.name} <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
      </span>
      <span>₹{crypto.current_price.toLocaleString()}</span>
      <span className={crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}>
        {crypto.price_change_percentage_24h}%
      </span>
      <span>₹{crypto.market_cap.toLocaleString()}</span>
      <span className="crypto-trend-chart">
        {'N/A'}
      </span>
      <button className="trade-button">Trade</button>
    </div>
  );
};

export default CryptoItem;
