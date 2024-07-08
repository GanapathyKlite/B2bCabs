import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import "./CSS/Form.css";

interface FormValues {
  firstname: string;
  lastname: string;
  emailid: string;
  mobilenumber: string;
  alternatemobilenumber: string;
  // Add other fields here
}

const Form1: React.FC = () => {
  const { errors, touched } = useFormikContext<FormValues>();

  return (
    <div
      className="d-flex flex-column gap-2 h-100 w-100 align-items-start font-mono text-left overflow-custom px-2"
      style={{ scrollbarWidth: "thin" }}
    >
      <h2 className="text-success font-weight-bold fs-3 mb-0">Personal Info</h2>
      <p className="text-secondary m-0 fs-small">
        Please provide your name, address, and phone
      </p>
      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="firstname"
          >
            First Name
          </label>
          <Field
            type="text"
            placeholder="e.g. Johnny"
            id="firstname"
            name="firstname"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.firstname && touched.firstname
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="firstname" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <Field
            type="text"
            placeholder="e.g. Depp"
            id="lastname"
            name="lastname"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.lastname && touched.lastname
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="lastname" />
          </div>
        </div>
      </div>

      <div className="col-12">
        <label
          className="text-success font-weight-semibold pb-2"
          htmlFor="emailid"
        >
          Email ID
        </label>
        <Field
          type="text"
          placeholder="e.g. johnnydepp@gmail.com"
          id="emailid"
          name="emailid"
          className={`form-control border border-secondary rounded-3 p-3 w-100 min-height-[50px] ${
            errors.emailid && touched.emailid
              ? "border-danger shake-animation"
              : ""
          }`}
        />
        <div
          className="text-danger fs-small pt-2 errorMessage"
          aria-live="polite"
        >
          <ErrorMessage name="emailid" />
        </div>
      </div>

      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="mobilenumber"
          >
            Mobile Number
          </label>
          <Field
            type="text"
            placeholder="e.g. 1234567890"
            id="mobilenumber"
            name="mobilenumber"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.mobilenumber && touched.mobilenumber
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="mobilenumber" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="alternatemobilenumber"
          >
            Alternate Mobile Number
          </label>
          <Field
            type="text"
            placeholder="e.g. 0987654321"
            id="alternatemobilenumber"
            name="alternatemobilenumber"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.alternatemobilenumber && touched.alternatemobilenumber
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="alternatemobilenumber" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form1;
