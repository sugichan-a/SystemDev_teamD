import React from "react";

function NavBar({ activePage }) {
  return (
    <nav className="mb-8">
      <div className="flex items-center text-gray-600 text-sm font-roboto">
        <span className="text-blue-600">Home</span>
        <span className="mx-2">/</span>
        <span>{activePage}</span>
      </div>
    </nav>
  );
}

export default NavBar;
