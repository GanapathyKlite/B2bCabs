import { ErrorMessage, Field, useFormikContext } from "formik";
import { useRef } from "react";
import { Notyf } from "notyf";
import uploadImg from "../../Assets/fileUploadIcon.svg";
import "./CSS/Form.css";
import "notyf/notyf.min.css";

// Initialize Notyf instance with updated configuration
const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});

interface Form3Props {
  fileList: File[];
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}

const Form3: React.FC<Form3Props> = ({ fileList, setFileList }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setFieldValue } = useFormikContext();

  const validTypes = ["image/png", "image/jpeg", "image/tiff"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  const validateFile = (file: File): boolean => {
    if (!validTypes.includes(file.type)) {
      notyf.error("Only PNG, JPEG, and TIFF files are allowed.");
      return false;
    }
    if (file.size > maxSize) {
      notyf.error("File size should not exceed 2MB.");
      return false;
    }
    return true;
  };

  const onFileChange = (files: File[]) => {
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
      setFileList(validFiles);
      setFieldValue("filelist", validFiles);
    } else {
      setFileList([]);
      setFieldValue("filelist", []);
    }
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wrapperRef.current?.classList.add("dragover");
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wrapperRef.current?.classList.remove("dragover");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wrapperRef.current?.classList.remove("dragover");

    const files = Array.from(e.dataTransfer.files);
    onFileChange(files);
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFileChange(files);
  };

  const clearImage = () => {
    setFileList([]);
    setFieldValue("filelist", []);
  };

  return (
    <div
      className="d-flex flex-column gap-2 h-100 w-100 align-items-start font-mono text-left overflow-custom px-2"
      style={{ scrollbarWidth: "thin" }}
    >
      <h2 className="text-success font-weight-bold fs-3 mb-0">Bank Info</h2>
      <p className="text-secondary m-0 fs-small">
        Please provide your Account No., Beneficiary Name, and IFSC Code
      </p>
      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="accountno"
          >
            Account Number
          </label>
          <Field
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="accountno"
            name="accountno"
            className="form-control border border-secondary rounded-3 p-3 w-100"
          />
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="accountno" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiaryname"
          >
            Beneficiary Name
          </label>
          <Field
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="beneficiaryname"
            name="beneficiaryname"
            className="form-control border border-secondary rounded-3 p-3 w-100"
          />
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="beneficiaryname" />
          </div>
        </div>
      </div>

      <div className="col-12">
        <label
          className="text-success font-weight-semibold pb-2"
          htmlFor="ifsccode"
        >
          IFSC Code
        </label>
        <Field
          type="text"
          placeholder="e.g. XYZ Pvt Ltd"
          id="ifsccode"
          name="ifsccode"
          className="form-control border border-secondary rounded-3 p-3 w-100"
        />
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="ifsccode" />
        </div>
      </div>

      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 pe-2 pe-md-4">
          <div>
            <label
              className="text-success font-weight-semibold"
              htmlFor="filelist"
            >
              Upload Your Check
            </label>
          </div>
          {/* Clear Button: Show only when fileList is not empty */}
          {fileList.length > 0 && (
            <button
              id="checkDeleteBtn"
              className="imgClear"
              onClick={clearImage}
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
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            {fileList.length === 0 ? (
              <>
                <img src={uploadImg} alt="Upload" className="imageUpload" />
                <p>Drag & Drop your files here</p>
              </>
            ) : (
              <img
                src={URL.createObjectURL(fileList[0])}
                alt="Uploaded"
                className="uploaded-image-preview"
              />
            )}
          </div>
          <input
            id="filelist"
            name="filelist"
            type="file"
            onChange={onFileDrop}
          />
        </div>
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="filelist" />
        </div>
      </div>
    </div>
  );
};

export default Form3;
