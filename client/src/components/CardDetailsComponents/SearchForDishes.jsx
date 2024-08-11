import React from 'react'
const SearchForDishes = () => {
  return (
    <button className="   w-[100%] md:w-[88%] flex items-center justify-between px-4 py-3 mt-10 md:ml-[5%] ml-0 bg-gray-200 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
      <span className="flex-grow text-center text-gray-600">Search for dishes</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  );
};

export default SearchForDishes;