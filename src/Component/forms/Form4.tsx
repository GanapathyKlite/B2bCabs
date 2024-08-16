import { ErrorMessage, Field, useFormikContext, useField } from "formik";
import "./CSS/Form.css";
import uploadImg from "../../Assets/fileUploadIcon.svg";
import { useRef } from "react";
import { Notyf } from "notyf";
import axios from 'axios';

// Initialize Notyf instance with updated configuration
const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});

interface Form4Props {
  panimage: File[];
  gstimage: File[];
  rcimage: File[];
  setPanimage: React.Dispatch<React.SetStateAction<File[]>>;
  setGstimage: React.Dispatch<React.SetStateAction<File[]>>;
  setRcimage: React.Dispatch<React.SetStateAction<File[]>>;
}

const Form4: React.FC<Form4Props> = ({
  panimage,
  setPanimage,
  gstimage,
  setGstimage,
  rcimage,
  setRcimage,
}) => {
  const panimageRef = useRef<HTMLInputElement>(null);
  const gstimageRef = useRef<HTMLInputElement>(null);
  const rcimageRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setFieldValue } = useFormikContext<any>();
  const [panField] = useField('pan_front_side_img');
    const [gstField] = useField('gst_front_side_img');
    const [companyRegField] = useField('company_reg_cer_img');

  const validTypes = ["image/png", "image/jpeg", "image/tiff"];
  const maxSize = 101 * 1024; // 100KB

  const validateFile = (file: File): boolean => {
    if (!validTypes.includes(file.type)) {
      notyf.error("Only PNG, JPEG, and TIFF files are allowed.");
      return false;
    }
    if (file.size > maxSize) {
      notyf.error("File size should not exceed 100KB.");
      return false;
    }
    return true;
  };


  const onFileChange = async(
    files: File[],
    type: "panimage" | "gstimage" | "rcimage"
  ) => {
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    files.forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      if (type === "panimage") {
        setPanimage(validFiles);
        setFieldValue("panimage", validFiles);
        const formData = new FormData();
      formData.append("file", validFiles[0]);
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/upload/upload-single/AGENT_PAN/agent`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data.status) {
          const imagePath = response.data.image_path;
          setFieldValue('pan_front_side_img', imagePath);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      } else if (type === "gstimage") {
        setGstimage(validFiles);
        setFieldValue("gstimage", validFiles);
        const formData = new FormData();
      formData.append("file", validFiles[0]);
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/upload/upload-single/AGENT_GST/agent`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data.status) {
          const imagePath = response.data.image_path;
          setFieldValue('gst_front_side_img', imagePath);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      } else if (type === "rcimage") {
        setRcimage(validFiles);
        setFieldValue("rcimage", validFiles);
        const formData = new FormData();
      formData.append("file", validFiles[0]);
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/upload/upload-single/AGENT_COM_CER/agent`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data.status) {
          const imagePath = response.data.image_path;
          setFieldValue('company_reg_cer_img', imagePath);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      }
    } else {
      if (type === "panimage") {
        setPanimage([]);
        setFieldValue("panimage", []);
      } else if (type === "gstimage") {
        setGstimage([]);
        setFieldValue("gstimage", []);
      } else if (type === "rcimage") {
        setRcimage([]);
        setFieldValue("rcimage", []);
      }
    }
  };

  const onDrop = (
    e: React.DragEvent,
    type: "panimage" | "gstimage" | "rcimage"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    wrapperRef.current?.classList.remove("dragover");

    const files = Array.from(e.dataTransfer.files);
    onFileChange(files, type);
  };

  const onFileDrop = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "panimage" | "gstimage" | "rcimage"
  ) => {
    const files = Array.from(e.target.files || []);
    onFileChange(files, type);
  };

  const clearImage = async(type: "panimage" | "gstimage" | "rcimage") => {
    if (type === "panimage") {
      try {
        const panFrontSideImgValue = panField.value;
        
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload/delete`, {
          image_path: panFrontSideImgValue,
        });
  
        if (response.status === 200) {
          setPanimage([]);
      setFieldValue("panimage", []);
        }
      } catch (error) {
        console.error('Error deleting the image:', error);
      }
      
    } else if (type === "gstimage") {
      try {
        const gstFrontSideImgValue = gstField.value;
        
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload/delete`, {
          image_path: gstFrontSideImgValue,
        });
  
        if (response.status === 200) {
          setGstimage([]);
          setFieldValue("gstimage", []);
        }
      } catch (error) {
        console.error('Error deleting the image:', error);
      }
      
    } else if (type === "rcimage") {
      try {
        const companyRegCerImgValue = companyRegField.value;
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload/delete`, {
          image_path: companyRegCerImgValue,
        });
  
        if (response.status === 200) {
          setRcimage([]);
      setFieldValue("rcimage", []);
        }
      } catch (error) {
        console.error('Error deleting the image:', error);
      }
      
    }
  };

  const triggerFileSelect = (type: "panimage" | "gstimage" | "rcimage") => {
    if (type === "panimage" && panimageRef.current) {
      panimageRef.current.click();
    } else if (type === "gstimage" && gstimageRef.current) {
      gstimageRef.current.click();
    } else if (type === "rcimage" && rcimageRef.current) {
      rcimageRef.current.click();
    }
  };

  return (
    <div
      className="d-flex flex-column gap-2 h-100 w-100 align-items-start font-mono text-left overflow-custom  px-2"
      style={{ scrollbarWidth: "thin" }}
    >
      <h2 className="text-success font-weight-bold fs-3 mb-0">
        COMPANY ID PROOF Info
      </h2>
      <p className="text-secondary m-0 fs-small">
        Please provide your PAN No., GST No., and RC
      </p>

      <div className="col-12">
        <label
          className="text-success font-weight-semibold pb-2"
          htmlFor="panno"
        >
          PAN Number
        </label>
        <Field
          type="text"
          placeholder=" e.g. XYZ Pvt Ltd"
          id="panno"
          name="panno"
          className="form-control border border-secondary rounded-3 p-3 w-100"
        />
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="panno" />
        </div>
      </div>

      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 pe-2 pe-md-4">
          <div>
            <label
              className="text-success font-weight-semibold"
              htmlFor="panimage"
            >
              Upload PAN Image
            </label>
          </div>
          {panimage.length > 0 && (
            <button
              id="checkDeleteBtn"
              className="imgClear"
              onClick={() => clearImage("panimage")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                className="svgIcon bin-top"
              >
                <g clip-path="url(#clip0_35_24)">
                  <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                className="svgIcon bin-bottom"
              >
                <g clip-path="url(#clip0_35_22)">
                  <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </div>
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "panimage")}
          onClick={() => triggerFileSelect("panimage")}
        >
          <div className="drop-file-input__label">
            {panimage.length === 0 ? (
              <>
                <img src={uploadImg} alt="Upload" className="imageUpload" />
                <p>Drag & Drop your PAN image here</p>
              </>
            ) : (
              <img
                src={URL.createObjectURL(panimage[0])}
                alt="Uploaded"
                className="uploaded-image-preview"
              />
            )}
          </div>
          <input
            id="panimage"
            name="panimage"
            type="file"
            ref={panimageRef}
            onChange={(e) => onFileDrop(e, "panimage")}
            style={{ display: "none" }}
          />
        </div>
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="panimage" /> 
        </div>
      </div>

      <div className="col-12">
        <label
          className="text-success font-weight-semibold pb-2"
          htmlFor="gstno"
        >
          GST Number
        </label>
        <Field
          type="text"
          placeholder=" e.g. XYZ Pvt Ltd"
          id="gstno"
          name="gstno"
          className="form-control border border-secondary rounded-3 p-3 w-100"
        />
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="gstno" />
        </div>
      </div>

      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 pe-2 pe-md-4">
          <div>
            <label
              className="text-success font-weight-semibold"
              htmlFor="gstimage"
            >
              Upload GST Image
            </label>
          </div>
          {gstimage.length > 0 && (
            <button
              id="checkDeleteBtn"
              className="imgClear"
              onClick={() => clearImage("gstimage")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                className="svgIcon bin-top"
              >
                <g clip-path="url(#clip0_35_24)">
                  <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                className="svgIcon bin-bottom"
              >
                <g clip-path="url(#clip0_35_22)">
                  <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </div>
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "gstimage")}
          onClick={() => triggerFileSelect("gstimage")}
        >
          <div className="drop-file-input__label">
            {gstimage.length === 0 ? (
              <>
                <img src={uploadImg} alt="Upload" className="imageUpload" />
                <p>Drag & Drop your GST image here</p>
              </>
            ) : (
              <img
                src={URL.createObjectURL(gstimage[0])}
                alt="Uploaded"
                className="uploaded-image-preview"
              />
            )}
          </div>
          <input
            id="gstimage"
            name="gstimage"
            type="file"
            ref={gstimageRef}
            onChange={(e) => onFileDrop(e, "gstimage")}
            style={{ display: "none" }}
          />
        </div>
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="gstimage" />
        </div>
      </div>

      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 pe-2 pe-md-4">
          <div>
            <label
              className="text-success font-weight-semibold"
              htmlFor="rcimage"
            >
              Upload R C Image
            </label>
          </div>
          {rcimage.length > 0 && (
            <button
              id="checkDeleteBtn"
              className="imgClear"
              onClick={() => clearImage("rcimage")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                className="svgIcon bin-top"
              >
                <g clip-path="url(#clip0_35_24)">
                  <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                className="svgIcon bin-bottom"
              >
                <g clip-path="url(#clip0_35_22)">
                  <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </div>
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "rcimage")}
          onClick={() => triggerFileSelect("rcimage")}
        >
          <div className="drop-file-input__label">
            {rcimage.length === 0 ? (
              <>
                <img src={uploadImg} alt="Upload" className="imageUpload" />
                <p>Drag & Drop your R C image here</p>
              </>
            ) : (
              <img
                src={URL.createObjectURL(rcimage[0])}
                alt="Uploaded"
                className="uploaded-image-preview"
              />
            )}
          </div>
          <input
            id="rcimage"
            name="rcimage"
            type="file"
            ref={rcimageRef}
            onChange={(e) => onFileDrop(e, "rcimage")}
            style={{ display: "none" }}
          />
        </div>
        <div className="text-danger fs-small pt-2 errorMessage errorMessage">
          <ErrorMessage name="rcimage" />
        </div>
      </div>
    </div>
  );
};

export default Form4;
