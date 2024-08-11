import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelComponent = () => {
  const navigate=useNavigate()

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-md text-center">
      <div className="text-6xl text-red-500 mb-6">✕</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Cancelled</h2>
      <p className="text-gray-600 mb-6">Your payment has been cancelled. No charges were made.</p>
      <div className="space-x-4">
        <button 
      onClick={()=>navigate("/cart")}

          className="bg-red-500 text-white px-6 py-2 rounded-md font-medium 
                     hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Return to Cart
        </button>
        <button 
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium 
                     hover:bg-gray-300 transition duration-300 ease-in-out"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default CancelComponent;