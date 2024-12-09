import React, { useEffect, useState,useContext } from 'react';
import CryptoItem from './CryptoItem';
import  CryptoContext  from '../../../../Context/CryptoContext';
const CryptoList = ({ activeTab,cryptoID }) => {
  const { allCryptoData } = useContext(CryptoContext);

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
         const filteredCoins = allCryptoData.filter((crypto) => 
          crypto.id.toLowerCase().startsWith(cryptoID.toLowerCase())
        );
         if (filteredCoins.length>0) {
          return filteredCoins.slice(0,15).map((crypto, index)=>( /*used implicit return using () instead of using {} after arrow function hence no need of extra return statement or manual return*/
           <CryptoItem key={crypto.id} index={index + 1} crypto={crypto}/>
          ))
         }
        return null
       })()
       :
        (allCryptoData.slice(0,15).map((crypto, index) => (
          <CryptoItem key={crypto.id} index={index + 1} crypto={crypto} />
        )))}
      </div>
    </div>
  );
};

export default CryptoList;
