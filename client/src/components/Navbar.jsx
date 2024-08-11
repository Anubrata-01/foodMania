import React, { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NavItem from "./NavItem";
import {  MdAddShoppingCart, MdOutlineSearch } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { cartItemsAtom, userDetailsAtom } from "../storeAtom/Atom";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66ac7e7d0000a652d698");

const account = new Account(client);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems] = useAtom(cartItemsAtom);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(() => setDropdownOpen((prev) => !prev), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
         await account.getSession("current");
        const user = await account.get();
        console.log('User details:', user);
        setUserDetails(user);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUserDetails(null);
      }
    };
    checkAuthStatus();
  }, []);
console.log(userDetails);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await account.deleteSession("current");
      setUserDetails(null);
      navigate("/");
      setDropdownOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const NAV_ITEMS = [
    { to: "/search", label: "Search", icon: <MdOutlineSearch /> },
    { to: "/about", label: "About", icon: <FcAbout /> },
    { to: "/cart", label: "Cart", icon: <MdAddShoppingCart />, badge: cartItems.length },
    ...(!userDetails
      ? [{ to: "/login", label: "Sign In", icon: <FaRegUser /> }]
      : [{ to: "#", label: userDetails?.name || userDetails?.user?.name, icon: <FaRegUser />, onClick: toggleDropdown }]),
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-1"}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 ml-5 md:ml-0">
            <span className="text-2xl font-bold text-red-600 cursor-pointer" onClick={() => navigate("/")}>
              FoodStore
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-5 flex items-baseline space-x-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.to} className="relative flex items-center">
                  <NavItem {...item} />
                  {item.badge > 0 && (
                    <span className="absolute top-0 left-10 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-label="menubar"
            >
              {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {NAV_ITEMS.map((item) => (
            <div key={item.to} className="relative flex items-center">
              <NavItem {...item} onClick={item.onClick || toggleMenu} isMobile />
              {item.badge > 0 && (
                <span className="absolute top-2 left-[52%] transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute top-20 right-16 md:right-5 bg-white shadow-lg rounded-lg py-2 w-48">
          <button onClick={() => navigate("/profile")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
            Profile
          </button>
          <button onClick={() => navigate("/settings")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
            Settings
          </button>
          <button onClick={handleSignOut} disabled={isLoggingOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
