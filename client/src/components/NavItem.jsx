import { NavLink } from "react-router-dom";
const NavItem = ({ to, label, onClick, isMobile, icon }) => {


  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        px-3 py-2 rounded-md text-sm font-medium
        transition-colors duration-300 flex gap-2 justify-center text-center
        ${isActive
          ? 'bg-red-600 text-white'
          : 'text-gray-700 hover:bg-red-100 hover:text-red-600'}
        ${isMobile ? 'block w-full text-center' : ''}
      `}
      onClick={onClick}
    >
      <span className="mt-0 text-xl">{icon}</span>
      <span>
        {label}
      </span>
    </NavLink>
  );
};

export default NavItem;

