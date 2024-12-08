import React, { useEffect, useState } from 'react';
import CryptoItem from './CryptoItem';

const CryptoList = ({ activeTab,cryptoID }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [Top20Cryptos,setTop20]=useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr'
        );
        const data = await response.json();
        setCryptoData(data);
        setTop20(data.slice(0,20))
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div>
      <div className="flex justify-between items-center p-2 border-b border-gray-700 text-gray-400 font-bold">
        <span>#</span>
        <span>Name</span>
        <span>Last Price</span>
        <span>Change%</span>
        <span>Market Cap</span>
        <span>Last 24 Hours</span>
      </div>
      <div className="h-[35rem] overflow-y-scroll">
      {/* used Immediately Invoked Function Expression (IIFE) instead defining outside and calling*/}
      {cryptoID ? (()=>{
         const filteredCoins = cryptoData.filter((crypto) => 
          crypto.id.toLowerCase().startsWith(cryptoID.toLowerCase())
        );
         if (filteredCoins.length>0) {
          return filteredCoins.map((crypto, index)=>( /*used implicit return using () instead of using {} after arrow function hence no need of extra return statement or manual return*/
           <CryptoItem key={crypto.id} index={index + 1} crypto={crypto}/>
          ))
         }
        return null
       })()
       :
        (Top20Cryptos.map((crypto, index) => (
          <CryptoItem key={crypto.id} index={index + 1} crypto={crypto} />
        )))}
      </div>
    </div>
  );
};

export default CryptoList;
