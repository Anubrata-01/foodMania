import { useAtom } from "jotai";
import { userDetailsAtom } from "../../storeAtom/Atom";
import { useEffect, useState } from "react";
import { getUserAddressDetails, updateAddressDetails } from "../Handilngfunctions/userAddressDetails";

const ProfileSection = () => {
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const [address, setAddress] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState({});
  const user = address ? address.filter((address) => address?.name === userDetails?.name) : address?.[4];
  const { _id, name, PhNo, city, addressLine1, country, state, zipCode } = user?.[0] || "";
  const handleEdit = (id) => {
    const addressToEdit = address.find((addr) => addr._id === id);
    setEditAddress(addressToEdit || {});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    await updateAddressDetails(editAddress, { setAddress });
  };

  useEffect(() => {
    getUserAddressDetails({ setAddress }, userDetails?.name);
  }, [address, setAddress]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Profile</h2>
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-4">
          <img
            className="h-24 w-24 rounded-full mx-auto md:mx-0 mb-4 md:mb-0"
            src="https://via.placeholder.com/150"
            alt="User"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold">{userDetails?.name || userDetails?.user?.name}</h3>
            <p className="text-gray-600">{userDetails?.email || userDetails?.user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
            <p>
              <strong>Phone:</strong> +91 {PhNo}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Address</h4>
            {address ? (
              <p>{addressLine1}, {city}, {state}, {country}, {zipCode}</p>
            ) : (
              "Address is not available"
            )}
          </div>
        </div>
        <button
          onClick={() => handleEdit(_id)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Edit Profile
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={editAddress.addressLine1 || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={editAddress.city || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={editAddress.state || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={editAddress.country || ""}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={editAddress.zipCode || ""}
                  onChange={handleInputChange}
                  className="mt-1  p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

