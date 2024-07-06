import React from "react";
import DropFileInput from "./DropFileInput/DropFileInput";

const FileUpload: React.FC = () => {
  const onFileChange = (files: File[]) => {
    console.log(files);
  };

  return (
    <div>

      <label
        className="text-primary font-weight-semibold"
        htmlFor="checkUpload"
      >
        Upload Your Check
      </label>
      <DropFileInput onFileChange={onFileChange} />

    </div>
  );
};
export default FileUpload;
