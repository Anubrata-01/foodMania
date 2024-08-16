// import React from 'react';
// import { NavLink } from 'react-router-dom';
// const UserProfile = () => {
//   const navLinkClass = ({ isActive }) =>
//     `block py-2 px-4 rounded transition duration-200 ${
//       isActive
//         ? 'bg-blue-500 text-white'
//         : 'text-blue-600 hover:bg-blue-100'
//     }`;
//   return (
//     <section className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
//       <div className="bg-stone-200 shadow-md rounded-lg p-6 mb-6">
//         <div className="flex items-center mb-4">
//           <img src="user-avatar.jpg" alt="User Avatar" className="w-20 h-20 rounded-full mr-4" />
//           <div>
//             <h2 className="text-2xl font-semibold">John Doe</h2>
//             <p className="text-gray-600">john.doe@example.com</p>
//             <p className="text-sm text-gray-500">Member since: January 1, 2023</p>
//           </div>
//         </div>
        
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Account Details</h3>
//             <ul className="space-y-2">
//             <NavLink to="/profile/orders" className={navLinkClass}>
//         Order History
//       </NavLink>
//       <NavLink to="/profile/wishlist" className={navLinkClass}>
//         Wishlist
//       </NavLink>
//       <NavLink to="/profile/reviews" className={navLinkClass}>
//         My Reviews
//       </NavLink>
//       <NavLink to="/profile/settings" className={navLinkClass}>
//         Account Settings
//       </NavLink>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
//             <address className="not-italic mb-2">
//               123 Main St<br />
//               Anytown, ST 12345<br />
//               United States
//             </address>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Shipping Info</button>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
//         <ul className="mb-4 space-y-2">
//           <li className="flex items-center">
//             <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
//             Visa ending in 1234
//           </li>
//           <li className="flex items-center">
//             <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
//             PayPal
//           </li>
//         </ul>
//         <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Payment Method</button>
//       </div>
//     </section>
//   );
// };

// export default UserProfile;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileSection from './ProfileSection';
import WishlistSection from './WishlistSection';
import SettingsSection from './SettingsSection';
import OrdersSection from './OrderSection';

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection/>;
      case 'orders':
        return <OrdersSection />;
      case 'wishlist':
        return <WishlistSection/>;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button 
        className="md:hidden bg-blue-500 text-white p-2 fixed top-0 left-0 z-20 mt-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`
        w-full md:w-64 bg-white shadow-md 
        fixed md:static inset-y-0 left-0 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition duration-200 ease-in-out z-10
      `}>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">My Account</h2>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left p-4 flex items-center space-x-2 ${
                activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 mt-12 md:mt-0">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};






export default UserAccount;