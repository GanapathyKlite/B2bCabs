import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useState } from "react";
import "./CSS/Form.css";
import { IoIosArrowDown } from "react-icons/io";

interface FormValues {
  name_title: string;
  firstname: string;
  lastname: string;
  email_id: string;
  mobile_no: string;
  al_mobile_no: string;
  // Add other fields here
}

const Form1: React.FC = () => {
  const { errors, touched } = useFormikContext<FormValues>();
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidKeys = ["e", "E", "+", "-"];
    const isNavigationKey = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Delete",
      "Home",
      "End",
    ].includes(e.key);

    if (isNavigationKey || e.key === "Enter") {
      return;
    }

    if (invalidKeys.includes(e.key) || !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

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
        <div className="col-12 col-lg-2 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="title"
          >
            Title
          </label>
          <div className="select-wrapper">
            <Field
              as="select"
              id="name_title"
              name="name_title"
              onClick={() => setIsTitleOpen(!isTitleOpen)}
              onBlur={() => setIsTitleOpen(false)}
              className={`form-control border border-secondary rounded-3 p-3 w-100 ${
                errors.name_title && touched.name_title
                  ? "border-danger shake-animation"
                  : ""
              }`}
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
            </Field>
            <IoIosArrowDown
              className={`dropdown-arrow ${isTitleOpen ? "rotate" : ""}`}
            />
          </div>
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="title" />
          </div>
        </div>

        <div className="col-12 col-lg-5 pe-lg-2 d-flex flex-column">
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

        <div className="col-12 col-lg-5 ps-lg-2 d-flex flex-column">
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
          htmlFor="email_id"
        >
          Email ID
        </label>
        <Field
          type="text"
          placeholder="e.g. johnnydepp@gmail.com"
          id="email_id"
          name="email_id"
          className={`form-control border border-secondary rounded-3 p-3 w-100 min-height-[50px] ${
            errors.email_id && touched.email_id
              ? "border-danger shake-animation"
              : ""
          }`}
        />
        <div
          className="text-danger fs-small pt-2 errorMessage"
          aria-live="polite"
        >
          <ErrorMessage name="email_id" />
        </div>
      </div>

      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="mobile_no"
          >
            Mobile Number
          </label>
          <Field
            type="text"
            placeholder="e.g. 1234567890"
            id="mobile_no"
            name="mobile_no"
            onKeyDown={handleKeyDown}
            maxLength={10}
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.mobile_no && touched.mobile_no
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="mobile_no" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="al_mobile_no"
          >
            Alternate Mobile Number
          </label>
          <Field
            type="text"
            placeholder="e.g. 0987654321"
            id="al_mobile_no"
            name="al_mobile_no"
            onKeyDown={handleKeyDown}
            maxLength={10}
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.al_mobile_no && touched.al_mobile_no
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div
            className="text-danger fs-small pt-2 errorMessage"
            aria-live="polite"
          >
            <ErrorMessage name="al_mobile_no" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form1;
