import React, { useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import CryptoItem from './CryptoItem';
import CryptoContext from '../../../../Context/CryptoContext';

const CryptoList = ({ activeTab, cryptoID }) => {
  const { allCryptoData } = useContext(CryptoContext);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center p-2 border-b border-gray-700 text-gray-400 font-bold">
        <span>#</span>
        <span>Name</span>
        <span>Last Price</span>
        <span>Change%</span>
        <span>Market Cap</span>
        <span>Last 24 Hours</span>
      </div>

      {/* Scroll Area for the list */}
      <ScrollArea.Root
        className="h-[30rem] rounded-lg border"
      >
        <ScrollArea.Viewport className="w-full h-full">
          {/* Render filtered or default crypto data */}
          {cryptoID
            ? (() => {
                const filteredCoins = allCryptoData.filter((crypto) =>
                  crypto.id.toLowerCase().startsWith(cryptoID.toLowerCase())
                );
                if (filteredCoins.length > 0) {
                  return filteredCoins.slice(0, 10).map((crypto, index) => (
                    <CryptoItem
                      key={crypto.id}
                      index={index + 1}
                      crypto={crypto}
                    />
                  ));
                }
                return <p className="text-gray-400 text-center">No results found</p>;
              })()
            : allCryptoData.slice(0, 10).map((crypto, index) => (
                <CryptoItem key={crypto.id} index={index + 1} crypto={crypto} />
              ))}
        </ScrollArea.Viewport>

        {/* Scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-gray-800 hover:bg-gray-700"
        >
          <ScrollArea.Thumb className="relative flex-1 bg-gray-500 rounded" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

export default CryptoList;
