import React, { useState } from 'react';
import CryptoList from './CryptoList';
import { SearchBar } from './SearchBar';
const MarketUpdate = () => {
  const [activeTab, setActiveTab] = useState('Crypto');
  const [cryptoID,setCryptoID]=useState('');
  function onSearch(cryptoName){
    setCryptoID(cryptoName);
  }
  return (
    <div className="m-10 bg-black p-5 rounded-lg text-white h-screen">
      <div className='flex items-top justify-between'>
        <h2 className="text-2xl font-bold mb-10">Market Update</h2>
        <SearchBar onSearch={onSearch}></SearchBar>
      </div>
      <div className="flex justify-around items-center mb-4">
        <button
          onClick={() => setActiveTab('Crypto')}
          className={`${activeTab === 'Crypto' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          View All
        </button>
        <button
          onClick={() => setActiveTab('Metaverse')}
          className={`${activeTab === 'Metaverse' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          Metaverse
        </button>
        <button
          onClick={() => setActiveTab('Entertainment')}
          className={`${activeTab === 'Entertainment' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          Entertainment
        </button>
        <button
          onClick={() => setActiveTab('Energy')}
          className={`${activeTab === 'Energy' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          Energy
        </button>
        <button
          onClick={() => setActiveTab('NFT')}
          className={`${activeTab === 'NFT' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          NFT
        </button>
        <button
          onClick={() => setActiveTab('Gaming')}
          className={`${activeTab === 'Gaming' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          Gaming
        </button>
        <button
          onClick={() => setActiveTab('Music')}
          className={`${activeTab === 'Music' ? 'bg-gray-600' : 'bg-gray-800'} py-2 px-4 rounded-full mr-2`}
        >
          Music
        </button>
      </div>
      <div className='h-4/5'>
        <CryptoList activeTab={activeTab} cryptoID={cryptoID}/>
      </div>
    </div>
  );
};

export default MarketUpdate;
