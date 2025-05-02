import React, { useState } from "react";
import ImgPrev from "./ImgPrev"; // You can reuse this if needed
import ImgUpload from "./ImgUpload";
import { BgApi } from "../utilis/BgApi"; // You'll need to define this
import toast from "react-hot-toast";
import Spinner from "../utilis/Spinner";
import Button from "../utilis/Button";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import Homw from "./Homw";


const BackgroundRemover = () => {
  const [uploadimg, setUploadimg] = useState(null);
  const [bgRemovedImg, setBgRemovedImg] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const navg=useNavigate();

  const uploadimgHanler = async (file) => {
    setUploadimg(URL.createObjectURL(file));
    setProcessing(true);
    try {
      const removedBg = await BgApi(file);
      setBgRemovedImg(removedBg);
      toast.success("Background removed successfully!");
    } catch (error) {
      toast.error("Failed to remove background.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(bgRemovedImg.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bg-removed.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded!");
    } catch {
      toast.error("Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full">
      <div className=" absolute left-3 top-3 text-[7vh]">
      <Link>
      <IoArrowBackCircleSharp onClick={navg("/home")} />
      </Link>
      </div>
      <ImgUpload uploadimgHanler={uploadimgHanler} />
      {processing ? (
        <Spinner text="Removing background..." />
      ) : (
        <ImgPrev
          loading={processing}
          uploaded={uploadimg}
          enhanced={bgRemovedImg?.image}
        />
      )}
      {bgRemovedImg?.image && !processing && !downloading && (
        <Button
          onClick={handleDownload}
          className="bg-green-600 text-white hover:bg-green-700 w-56 mt-8"
        >
          Download
        </Button>
      )}
      {downloading && <Spinner text="Preparing your download..." />}
    </div>
  );
};

export default BackgroundRemover;
