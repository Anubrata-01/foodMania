/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
const About = ({ Navbar }) => {
  return (
    <div>
      {Navbar}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
        <p className="mt-2 text-gray-600">
          Insert your About content here.hello
        </p>
      </div>
    </div>
  );
};

export default About;
