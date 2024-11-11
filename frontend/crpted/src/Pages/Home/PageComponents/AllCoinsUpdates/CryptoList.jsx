import React, {useEffect,useState} from 'react';
import CryptoItem from './CryptoItem';
import './CryptoList.css';

const CryptoList = ({ activeTab }) => {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    // Fetching data from CoinGecko API
    const fetchData = async () => {
      try{
        const response=await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr'
        );
        const data = await response.json();
        setCryptoData(data);
      }catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="crypto-list">
      <div className="table-header">
        <span>#</span>
        <span>Name</span>
        <span>Last Price</span>
        <span>Change%</span>
        <span>Market Cap</span>
        <span>Last 7 Days</span>
      </div>
      {cryptoData.map((crypto, index)=>(
        <CryptoItem key={crypto.id} index={index+1}crypto={crypto}/>
      ))}
    </div>
  );
};

export default CryptoList;
