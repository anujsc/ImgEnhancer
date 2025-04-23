import React, { useState } from "react";
import ImgPrev from "./ImgPrev";
import ImgUpload from "./ImgUpload";
import { enhancedImageAPI } from "../utilis/Api";

const Homw = () => {
  const [uploadimg, setuploadimg] = useState(null);
  const [enhancedimg, setenhancedimg] = useState(null);
  const [loading, setloading] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(enhancedimg.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "enhanced-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed. Try again!");
    }
  };

  const uploadimgHanler = async (file) => {
    setuploadimg(URL.createObjectURL(file));
    setloading(true);
    try {
      const enhancedURL = await enhancedImageAPI(file);
      setenhancedimg(enhancedURL);
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image. Please try again later.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <ImgUpload uploadimgHanler={uploadimgHanler} />
      <ImgPrev
        loading={loading}
        uploaded={uploadimg}
        enhanced={enhancedimg?.image}
      />

      {/* 🔘 Buttons Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
        <button
          onClick={handleRefresh}
          className="px-6 py-3 font-semibold bg-blue-600 text-white rounded-2xl text-lg hover:bg-blue-800 transition duration-300 shadow-md"
        >
          Try Again !!
        </button>

        {enhancedimg?.image && !loading && (
          <button
            onClick={handleDownload}
            className="px-6 py-3 font-semibold bg-green-600 text-white rounded-2xl text-lg hover:bg-green-700 transition duration-300 shadow-md"
          >
            Download Enhanced Image
          </button>
        )}
      </div>
    </div>
  );
};

export default Homw;
