import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImgUpload = ({ uploadimgHanler }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      uploadimgHanler(acceptedFiles[0]);
    }
  }, [uploadimgHanler]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="bg-white dark:bg-gray-900 shadow-slate-600 dark:shadow-slate  shadow-2xl rounded-2xl p-6 sm:p-8 w-[90%] max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-300 hover:border-blue-500"}
        `}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600 dark:text-blue-300 font-medium text-lg">Drop your image here...</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Drag and drop your image here, or <span className="text-blue-500 underline">click to browse</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ImgUpload;
