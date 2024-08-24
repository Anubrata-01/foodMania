/* eslint-disable no-undef */
import { useAtom } from "jotai";
import { cartItemsAtom, userAddressDetailsAtom, userDetailsAtom } from "../../storeAtom/Atom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL, { APP_URL, Swigy_url } from "../../constant/data";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js'; 
const Cart = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const [userDetails] = useAtom(userDetailsAtom);   
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if(!userDetails){
      toast.error("Login karle vai!");
      navigate("/login")
      console.log("Login karle");
    }
  }, [userDetails]);
  console.log(cartItems);
  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };
  const ImgCon = useMemo(
    () => (
      <img
        src="https://food-plaza-project.onrender.com/Cart-empty.cdd853dc.png"
        alt="Empty Cart"
        className="w-32 h-32 mb-4"
        loading="lazy"
      />
    ),
    []
  );

  // Payment Integration
  const makePayment = useCallback(async () => {
    try {
      const stripe = await loadStripe("pk_test_51Pm6P5RvOgF1bnDE9oBvxFrkl3UNdktLzzXV1y03ru59sIGyCDvUN01EVsUQNwklBW4qLnT6lSaLtJvaZ5OAH1TD00YoC5fLA6");
  
      const body = {
        products: cartItems,
        userDetails:userDetails
      };
  
      const response = await fetch(`${APP_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        const session = await response.json();
        console.log(session)
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });
  
        if (result.error) {
          console.error("Stripe Checkout error:", result.error.message);
          toast.error("Payment failed. Please try again.");
        }
      } else {
        console.error("Server error when creating session:", response.statusText);
        toast.error("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment process:", error.message);
      toast.error("An error occurred during payment. Please try again");
    }
  }, [cartItems]);
  


  console.log(cartItems);
  if (cartItems.length === 0) {
    return (
      <div className="bg-stone-200 flex flex-col items-center justify-center h-[570px]">
        {ImgCon}
        <p className="text-xl font-semibold text-gray-600">
          Your cart is empty
        </p>
        <p className="text-gray-400">Add some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-sky-50 to-sky-200">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mt-0 border-2 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Your Cart</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-6 border-b-2"
          >
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={Swigy_url + item.imageId}
                alt={item.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-500">₹{item.price / 100}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="w-12 bg-gray-100 text-center border-none focus:outline-none"
                />
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  +
                </button>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mb-6">
          <button
            className="px-6 py-2 border rounded-lg text-red-600 hover:bg-red-100"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button
            className="px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => navigate(-1)}
          >
            Add More Items
          </button>
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={noContactDelivery}
              onChange={() => setNoContactDelivery(!noContactDelivery)}
              className="mr-2"
            />
            <span>Opt in for No-contact Delivery</span>
          </label>
          <p className="text-sm text-gray-600 ml-6">
            Unwell, or avoiding contact? Please select no-contact delivery.
            Partner will safely place the order outside your door (not for COD)
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Subtotal:</span>
            <span>₹{totalAmount / 100}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Delivery Fee:</span>
            <span>₹40</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{(totalAmount + 4000) / 100}</span>
          </div>
        </div>
        <button
          className="w-full bg-green-500 text-white py-4 rounded-lg font-bold hover:bg-green-600 transition-colors duration-300"
          onClick={makePayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;

