import React, { useState } from "react";
import ImgPrev from "./ImgPrev";
import ImgUpload from "./ImgUpload";
import { enhancedImageAPI } from "../utilis/Api";
import toast from "react-hot-toast";
import Button from "../utilis/Button";
import Spinner from "../utilis/Spinner";
import { Link } from "react-router-dom";

const Homw = () => {
  const [uploadimg, setuploadimg] = useState(null);
  const [enhancedimg, setenhancedimg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);

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
      <ImgUpload uploadimgHanler={uploadimgHanler} />
      
      <Link to="/home" className="btn">
        Enhance
      </Link>
      <Link to="/bg-remover" className="btn">
        Remove Background
      </Link>

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
    </div>
  );
};

export default Homw;
