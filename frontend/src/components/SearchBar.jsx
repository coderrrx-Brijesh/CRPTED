import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSearch, placeholder }) => {
  return (
    <div className="flex items-center bg-gray-800 py-2 px-4 rounded-full w-max  h-12 transition-colors duration-300 hover:bg-gray-700">
      <FaSearch className="text-gray-400 text-lg cursor-pointer transition-colors duration-300 hover:text-white" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-white text-base w-full ml-3 placeholder-gray-400 caret-white"
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
};
