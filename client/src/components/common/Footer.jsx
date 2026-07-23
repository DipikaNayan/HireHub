import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100py-6 mt-20">
      <div className="max-w-7xl mx-auto text-center text-gray-600">
        @{new Date().getFullYear()} HireHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
