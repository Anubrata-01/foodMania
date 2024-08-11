import React from 'react';
import { useNavigate } from 'react-router-dom';
const Success= () => {
  const navigate=useNavigate()
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-slate-300 rounded-lg shadow-md text-center">
      <div className="text-6xl text-green-500 mb-6">✓</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
      <button 
      onClick={()=>navigate("/")}
        className="bg-green-500 text-white px-6 py-2 rounded-md font-medium 
                   hover:bg-green-600 transition duration-300 ease-in-out"
        
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;