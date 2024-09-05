import React, { useState } from 'react';
import { items } from '../../data';
import { BiCaretDown, BiDollar, BiHeadphone, BiLaptop, BiTv, BiMouse, BiDesktop } from "react-icons/bi";

import Navbar from '../../components/navbar/Navbar';
import './Deprecation.css';

function Deprecation() {
  const [filters, setFilters] = useState({
    type: '',
    price: '',
    purchaseDate: '',
    depreciation: '',
    currentPrice: '',
    remainingTime: ''
  });

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'laptop':
        return <BiLaptop />;
      case 'headphones':
        return <BiHeadphone />;
      case 'mouse':
          return <BiMouse />; 
      case 'tv':
          return <BiTv />; 
      case 'monitor':
        return <BiDesktop />;
      default:
        return ''; 
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredItems = items.filter(item => {
    return (
      (!filters.type || item.type.toLowerCase().includes(filters.type.toLowerCase())) &&
      (!filters.price || item.price <= parseFloat(filters.price)) &&
      (!filters.purchaseDate || item.purchaseDate.includes(filters.purchaseDate)) &&
      (!filters.currentPrice || item.currentPrice <= parseFloat(filters.currentPrice)) &&
      (!filters.remainingTime || item.remainingTime.toString().includes(filters.remainingTime))
    );
  });

  return (
    <div className="container ">
      <Navbar pageTitle='Depreciation of Tools' />

      <div className="filters mt-2 d-flex flex-row rounded p-3 gap-2">
        <input 
          type="text" 
          name="type" 
          placeholder="Filter by Type" 
          value={filters.type} 
          onChange={handleFilterChange} 
          className="filter-input form-control" 
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Max Price" 
          value={filters.price} 
          onChange={handleFilterChange} 
          className="filter-input form-control" 
        />
        <input 
          type="text" 
          name="purchaseDate" 
          placeholder="Filter by Purchase Date" 
          value={filters.purchaseDate} 
          onChange={handleFilterChange} 
          className="filter-input form-control" 
        />
        <input 
          type="number" 
          name="currentPrice" 
          placeholder="Max Current Price" 
          value={filters.currentPrice} 
          onChange={handleFilterChange} 
          className="filter-input form-control" 
        />
        <input 
          type="text" 
          name="remainingTime" 
          placeholder="Filter by Remaining Time" 
          value={filters.remainingTime} 
          onChange={handleFilterChange} 
          className="filter-input form-control" 
        />
      </div>
      <div className="d p-3">
      <div className="header-row mt-2 position-sticky">
        <div className="header-field">Type</div>
        <div className="header-field">Price</div>
        <div className="header-field">Purchase Date</div>
        <div className="header-field">Depreciation</div>
        <div className="header-field">Current Price</div>
        <div className="header-field">Remaining Time</div>
      </div>

      {filteredItems.map((item, index) => (
        <div key={index} className="data-row shadow ">
          <div className="data-field">{getTypeIcon(item.type)} {item.type}</div>
          <div className="data-field text-success"><strong><BiDollar />{item.price}</strong></div>
          <div className="data-field">{item.purchaseDate}</div>
          <div className="data-field text-danger"><strong><BiCaretDown /> ${item.depreciation}</strong></div>
          <div className="data-field"><strong><BiDollar />{item.currentPrice}</strong></div>
          <div className="data-field text-info"><strong>{item.remainingTime} years </strong></div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Deprecation;
