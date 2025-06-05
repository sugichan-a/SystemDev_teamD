import React from "react";

function Button({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-roboto ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
