import { useAtom } from "jotai";
import { userDetailsAtom } from "../../storeAtom/Atom";

const ProfileSection = () => {

  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Profile</h2>
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-4">
          <img className="h-24 w-24 rounded-full mx-auto md:mx-0 mb-4 md:mb-0" src="https://via.placeholder.com/150" alt="User" />
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold">{userDetails?.name || userDetails?.user?.name}</h3>
            <p className="text-gray-600">{userDetails?.email|| userDetails?.user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Date of Birth:</strong> January 1, 1990</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Address</h4>
            <p>123 Main St, Anytown, ST 12345, USA</p>
          </div>
        </div>
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto">Edit Profile</button>
      </div>
    </div>
  )};

export default ProfileSection;