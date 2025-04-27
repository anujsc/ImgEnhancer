import React from "react";

const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-xl text-sm sm:text-lg transition duration-300 shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
