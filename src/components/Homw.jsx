import React, { useState } from "react";
import ImgPrev from "./ImgPrev";
import ImgUpload from "./ImgUpload";
import { enhancedImageAPI } from "../utilis/Api";
import toast from "react-hot-toast";
import Button from "../utilis/Button"

import Spinner from "../utilis/Spinner";

const Homw = () => {
  const [uploadimg, setuploadimg] = useState(null);
  const [enhancedimg, setenhancedimg] = useState(null);
  const [uploading, setUploading] = useState(false); // For uploading
  const [downloading, setDownloading] = useState(false); // For downloading

  // const handleRefresh = () => {
  //   window.location.reload();
  // };

  const handleDownload = async () => {
    try {
      setDownloading(true);
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

      toast.success("Download completed successfully! 🎉");
    } catch (error) {
      toast.error("Download failed. Please try again!");
    } finally {
      setDownloading(false);
    }
  };

  const uploadimgHanler = async (file) => {
    setuploadimg(URL.createObjectURL(file));
    setUploading(true);
    try {
      const enhancedURL = await enhancedImageAPI(file);
      setenhancedimg(enhancedURL);
      toast.success("Image enhanced successfully! 🎯");
    } catch (error) {
      console.log(error);
      toast.error("Error while enhancing the image. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">

      <ImgUpload uploadimgHanler={uploadimgHanler} />

      {uploading ? (
        <Spinner text="Enhancing your image..." />
      ) : (
        <ImgPrev
          loading={uploading}
          uploaded={uploadimg}
          enhanced={enhancedimg?.image}
        />
      )}

      {/* 🔘 Buttons Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">

        {/* Download Button */}
        {enhancedimg?.image && !uploading && !downloading && (
          <Button
            onClick={handleDownload}
            className="px-6 py-3 font-semibold bg-green-600 text-white rounded-2xl text-lg hover:bg-green-700 transition duration-300 shadow-md"
          >
            Download Enhanced Image
          </Button>
        )}

        {/* Spinner while downloading */}
        {downloading && <Spinner text="Preparing your download..." />}

      </div>
    </div>
  );
};

export default Homw;
