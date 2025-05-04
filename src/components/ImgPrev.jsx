import React from "react";
import Loader from "./Loader";

const ImgPrev = ({ uploaded, enhanced, loading,bg }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {/* Original Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-blue-700 text-white py-2">
          Original Image
        </h2>

        {uploaded ? (
          <img src={uploaded} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No Image Selected
          </div>
        )}
      </div>

      {/* Enhanced Image Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-purple-600 text-white py-2">
          {bg}
        </h2>

        {enhanced && !loading && (
          <>
            <img src={enhanced} alt="" className="w-full h-full object-cover" />
          </>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No Enhanced Image
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgPrev;
