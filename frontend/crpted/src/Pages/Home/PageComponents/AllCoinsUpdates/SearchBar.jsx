import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

export const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input type="text" placeholder="Search for a cryptocurrency..." onChange={(event)=>onSearch(event.target.value)} />
    </div>
  );
};
