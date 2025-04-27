import React from "react";

const Spinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      <p className="mt-4 text-sm sm:text-base text-gray-700 font-semibold text-center">{text}</p>
    </div>
  );
};

export default Spinner;
