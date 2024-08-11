import React, { useState, useCallback, memo } from 'react';
import FoodItem from './FoodItem';

const AccordionOfFoods = ({ details,restaurantName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCards, title } = details;

  const toggleAccordion = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <section className="rounded-xl mt-4 w-full md:w-[88%] md:ml-[5%] ml-0 shadow-md shadow-slate-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200"
        onClick={toggleAccordion}
        aria-label='toogleAccordian'
      >
        <span className="font-semibold text-black">{title}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4">
          {itemCards?.map((item, index) => (
            <FoodItem key={item?.card?.info?.id || index} item={item} restaurantName={restaurantName} />
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(AccordionOfFoods);
