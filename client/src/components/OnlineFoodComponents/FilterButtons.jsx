import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const filters = [
  "Fast Delivery",
  "Ratings 4.0+",
  "Offers",
  "Pure Veg",
  "Less than Rs.300",
  "Rs.300-Rs.600"
];

const FilterButtons = ({ selectedFilter, setSelectedFilter, searchQuery, setSearchQuery }) => {
  const [filterActive, setFilterActive] = useState(selectedFilter);

  const handleFilterClick = (filter) => {
    if (filterActive === filter) {
      clearFilter();
    } else {
      setSelectedFilter(filter);
      setFilterActive(filter);
      toast(`Filter applied: ${filter}`);
    }
  };

  const clearFilter = () => {
    setSelectedFilter("");
    setFilterActive("");
    toast("Filter cleared");
  };

  return (
    <div className="flex flex-wrap gap-2 space-x-4 overflow-x-auto p-4">
      <input
        type="text"
        placeholder="Search Restaurant"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="whitespace-nowrap py-2 px-4 sm:block hidden bg-white rounded-full shadow-sm text-gray-600 focus:outline-none"
      />
      {filters.map((filter, index) => (
        <button
          key={index}
          className={`relative whitespace-nowrap py-2 px-4 bg-white rounded-full shadow-sm text-gray-600 hover:bg-gray-400 focus:outline-none ${
            filterActive === filter ? 'bg-yellow-800 text-slate-300' : ''
          }`}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
          {filterActive === filter && (
            <span
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full cursor-pointer px-1.5"
              onClick={clearFilter}
            >
              &times;
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;



