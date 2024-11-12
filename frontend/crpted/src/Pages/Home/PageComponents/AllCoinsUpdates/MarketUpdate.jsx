import React, { useState } from 'react';
import CryptoList from './CryptoList';
import './MarketUpdate.css';

const MarketUpdate = () => {
  const [activeTab, setActiveTab] = useState('Crypto');
  return (
    <div className="market-update-container">
      <h2 className='text-2xl  font-bold mb-10'>Market Update</h2>
      <div className="tabs">
        <button id="tab-btn" onClick={() => setActiveTab('Crypto')} className={activeTab === 'Crypto' ? 'active' : ''}>View All</button>
        <button id="tab-btn" onClick={() => setActiveTab('Metaverse')}>Metaverse</button>
        <button id="tab-btn" onClick={() => setActiveTab('Entertainment')}>Entertainment</button>
        <button id="tab-btn" onClick={() => setActiveTab('Energy')}>Energy</button>
        <button id="tab-btn" onClick={() => setActiveTab('NFT')}>NFT</button>
        <button id="tab-btn" onClick={() => setActiveTab('Gaming')}>Gaming</button>
        <button id="tab-btn" onClick={() => setActiveTab('Music')}>Music</button>
      </div>
      <CryptoList activeTab={activeTab} />
    </div>
  );
};

export default MarketUpdate;
