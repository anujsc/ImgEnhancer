import React from 'react';

const ImgUpload = ({uploadimgHanler}) => {

  const ShowImageHandler=(e)=>{
    const file =e.target.files[0];
    if(file){
      uploadimgHanler(file);
    }
  }
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-[90%] max-w-2xl mx-auto">
      <label
        htmlFor="fileInput"
        className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-500 transition-all"
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={ShowImageHandler}
        />
        <span className="text-base sm:text-lg font-medium text-gray-600">
          Click and drag to upload your image
        </span>
      </label>
    </div>
  );
};

export default ImgUpload;
