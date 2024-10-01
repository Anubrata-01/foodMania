/* eslint-disable no-undef */
import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userAddressDetailsAtom } from "../storeAtom/Atom";
import { toast } from "react-toastify";
import { APP_URL } from "../constant/data";

const Success = () => {
  const [userAddressDetails, setUserAddressDetails] = useAtom(
    userAddressDetailsAtom
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", // New Name field
    PhNo: "",
    addressLine1: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    console.log(sessionId);
    if (sessionId) {
      fetch(`${APP_URL}/api/payment-success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error confirming payment:", error);
        });
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${APP_URL}/api/saveAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Address saved or updated in database:", data);
        setUserAddressDetails(formData);
        navigate("/");
      } else if (response.status === 409) {
        console.log("Address already exists in database");
        toast("Address already exists in database");
      } else {
        throw new Error("Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address to database:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsLoading(false);
    }

    console.log("Shipping address submitted:", formData);
  };

  const useCurrentAddress = () => {
    if (userAddressDetails) {
      setFormData(userAddressDetails);
    } else {
      alert("No current address available.");
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = "AIzaSyBX8R9zPH8lHO-ErIz4IfSP-E6uklDyuMY"; // Replace with your API key
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error fetching address:", error);
            alert("Failed to get address from coordinates. Please enter manually.");
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to get current location. Please enter address manually.");
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter address manually.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-4xl text-green-500 mb-4 text-center">✓</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Payment Successful!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your purchase. Please provide your shipping address.
      </p>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={useCurrentAddress}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition duration-300"
        >
          Use Saved Address
        </button>
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Use Current Location"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="PhNo"
          value={formData.PhNo}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleInputChange}
          placeholder="Address Line 1"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          placeholder="ZIP Code"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Country"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition duration-300"
        >
          Submit Shipping Address
        </button>
      </form>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-4 bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition duration-300"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;


