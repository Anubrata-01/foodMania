import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h5 className="text-lg font-bold mb-2">FoodDelivery App</h5>
          <p>© 2024 FoodDelivery. All rights reserved.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <nav className="flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Menu</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </nav>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" aria-label="Follow us on Twitter" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M24 4.56c-.88.39-1.83.65-2.82.77 1.01-.61 1.78-1.57 2.14-2.71-.95.57-2.01.98-3.13 1.2-.9-.96-2.18-1.56-3.6-1.56-2.72 0-4.92 2.2-4.92 4.92 0 .39.04.77.13 1.14-4.09-.21-7.72-2.16-10.14-5.13-.42.72-.66 1.55-.66 2.44 0 1.68.86 3.17 2.17 4.04-.8-.03-1.55-.25-2.21-.61v.06c0 2.34 1.67 4.28 3.88 4.72-.41.11-.83.17-1.27.17-.31 0-.61-.03-.91-.08.62 1.93 2.4 3.34 4.51 3.38-1.65 1.29-3.74 2.07-6.01 2.07-.39 0-.77-.02-1.15-.07 2.15 1.38 4.7 2.19 7.45 2.19 8.94 0 13.83-7.4 13.83-13.83 0-.21 0-.42-.01-.63.95-.69 1.78-1.55 2.44-2.53z"/>
            </svg>
          </a>
          <a href="#" aria-label="Follow us on Facebook" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M22.23 5.93c-.77.34-1.59.57-2.45.67.88-.52 1.55-1.36 1.87-2.35-.83.49-1.75.85-2.72 1.04a4.92 4.92 0 0 0-8.38 4.48C7.69 8.84 4.07 6.9 1.64 3.91c-.9 1.54-.44 3.55 1.07 4.57a4.9 4.9 0 0 1-2.23-.62v.06c0 2.38 1.69 4.37 3.94 4.82-.41.11-.84.16-1.28.16-.31 0-.62-.03-.92-.09.63 1.97 2.45 3.4 4.6 3.44A9.86 9.86 0 0 1 1 19.54 13.9 13.9 0 0 0 7.46 21c8.68 0 13.42-7.2 13.42-13.42 0-.21 0-.42-.02-.62.92-.67 1.72-1.52 2.35-2.47z"/>
            </svg>
          </a>
          <a href="#" aria-label="Follow us on Instagram" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.49 4.46 9.96 9.96 9.96s9.96-4.46 9.96-9.96c0-5.49-4.46-9.96-9.96-9.96zm3.38 9.96c-.03.05-.03.1-.05.16-.03.04-.07.07-.11.11-.05.01-.1.01-.15.01h-3.46v5.62h-2.22v-5.62h-1.5v-1.78h1.5v-1.32c0-1.07.29-1.87.88-2.39.6-.53 1.38-.79 2.34-.79h1.47v1.78h-1.22c-.29 0-.49.06-.62.18-.12.13-.19.31-.19.55v1.19h2.06v1.78h-2.06z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

