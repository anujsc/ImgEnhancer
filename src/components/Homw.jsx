import React, { useState } from "react";
import ImgPrev from "./ImgPrev";
import ImgUpload from "./ImgUpload";
import { enhancedImageAPI } from "../utilis/Api";
import toast from "react-hot-toast";
import Button from "../utilis/Button";
import Spinner from "../utilis/Spinner";
import { Link, useNavigate } from "react-router-dom";

const Homw = () => {
  const [uploadimg, setuploadimg] = useState(null);
  const [enhancedimg, setenhancedimg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const navg = useNavigate();

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
      toast.error("Error while enhancing the image. Please try again later.");
    } finally {
      setUploading(false);
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 w-full">
       <div className=" flex-col text-center mt-2 mb-6 w-full">
        <div className=" flex sm:gap-5 justify-center">
        <button onClick={() => navg(-1)} className=" sm:size-10 size-20">
          <img src="/images/arrow.png" alt="" />
        </button>
        <h1 className="text-3xl font-mono tracking-tighter sm:text-4xl font-bold text-gray-800 dark:text-white">
          Enhance Your Image
        </h1>
        </div>
        <hr className="h-[0.3vh] mt-4 bg-gray-200 border-0 dark:bg-gray-700"/>
        <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-300">
          Upload your image and enhance your image instantly with one click.
        </p>
        <div className="mt-4 w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
      </div>
      
      <ImgUpload uploadimgHanler={uploadimgHanler} />

      {uploading ? (
        <Spinner text="Enhancing your image..." />
      ) : (
        <ImgPrev
          loading={uploading}
          uploaded={uploadimg}
          enhanced={enhancedimg?.image}
          bg={"Enhanced Image"}
        />
      )}

      {/* 🔘 Buttons Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-2xl">
        {/* Download Button (after enhanced image ready) */}
        {enhancedimg?.image && !uploading && !downloading && (
          <Button
            onClick={handleDownload}
            className="bg-green-600 text-white hover:bg-green-700 w-56"
          >
            Download
          </Button>
        )}

        {/* Spinner while downloading */}
        {downloading && <Spinner text="Preparing your download..." />}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6">
        Powered By <span className="font-semibold">@AnujAI</span>
      </div>
    </div>
  );
};

export default Homw;
