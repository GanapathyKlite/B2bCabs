import { ErrorMessage, Field, useFormikContext } from "formik";
import { useState } from "react";
import "./CSS/Form.css";
import { IoIosArrowDown } from "react-icons/io";

interface FormValues {
  companyname: string;
  companytype: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

const Form2: React.FC = () => {
  const { errors, touched } = useFormikContext<FormValues>();
  const [isCompanyTypeOpen, setIsCompanyTypeOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  return (
    <div
      className="d-flex flex-column gap-2 h-100 w-100 align-items-start font-mono text-left overflow-custom px-2"
    >
      <h2 className="text-success font-weight-bold fs-3 mb-0">Company Info</h2>
      <p className="text-secondary m-0 fs-small">
        Please provide your Company Name, Company Type, and Address
      </p>
      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="companyname"
          >
            Company Name
          </label>
          <Field
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="companyname"
            name="companyname"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.companyname && touched.companyname
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="companyname" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="companytype"
          >
            Company Type
          </label>
          <div className="select-wrapper">
            <Field
              as="select"
              id="companytype"
              name="companytype"
              className={`form-control border border-secondary rounded-3 p-3 w-100 ${
                errors.companytype && touched.companytype ? "border-danger" : ""
              }`}
              onClick={() => setIsCompanyTypeOpen(!isCompanyTypeOpen)}
              onBlur={() => setIsCompanyTypeOpen(false)}
            >
              <option disabled label="Select company type" value="" />
              <option
                value="Public Limited Company (PLC)"
                label="Public Limited Company (PLC)"
              />
              <option
                value="Private Limited Company (PVT)"
                label="Private Limited Company (PVT)"
              />
              <option
                value="One Person Company (OPC)"
                label="One Person Company (OPC)"
              />
            </Field>
            <IoIosArrowDown
              className={`dropdown-arrow ${isCompanyTypeOpen ? "rotate" : ""}`}
            />
          </div>
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="companytype" />
          </div>
        </div>
      </div>

      <div className="col-12">
        <label
          className="text-success font-weight-semibold pb-2"
          htmlFor="address"
        >
          Address
        </label>
        <Field
          as="textarea"
          type="text"
          placeholder="e.g. XYZ Street, Avenue Center"
          id="address"
          name="address"
          className={`form-control border border-secondary rounded-3 p-3 w-100 ${
            errors.address && touched.address
              ? "border-danger shake-animation"
              : ""
          }`}
        />
        <div className="text-danger fs-small pt-2 errorMessage">
          <ErrorMessage name="address" />
        </div>
      </div>

      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="city"
          >
            City
          </label>
          <div className="select-wrapper">
            <Field
              as="select"
              id="city"
              name="city"
              className={`form-control border border-secondary rounded-3 p-3 w-100 ${
                isCityOpen ? "open" : ""
              } ${errors.city && touched.city ? "border-danger" : ""}`}
              onClick={() => setIsCityOpen(!isCityOpen)}
              onBlur={() => setIsCityOpen(false)}
            >
              <option disabled label="Select City" />
              <option value="Tamil Nadu" label="Tamil Nadu" />
              <option value="Kerala" label="Kerala" />
              <option value="Telangana" label="Telangana" />
              <option value="Maharashtra" label="Maharashtra" />
              <option value="Punjab" label="Punjab" />
              <option value="Andhra Pradesh" label="Andhra Pradesh" />
            </Field>
            <IoIosArrowDown
              className={`dropdown-arrow ${isCityOpen ? "rotate" : ""}`}
            />
          </div>
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="city" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="state"
          >
            State
          </label>
          <div className="select-wrapper">
            <Field
              as="select"
              id="state"
              name="state"
              className={`form-control border border-secondary rounded-3 p-3 w-100 ${
                isStateOpen ? "open" : ""
              } ${errors.state && touched.state ? "border-danger" : ""}`}
              onClick={() => setIsStateOpen(!isStateOpen)}
              onBlur={() => setIsStateOpen(false)}
            >
              <option disabled label="Select State" />
              <option value="Tamil Nadu" label="Tamil Nadu" />
              <option value="Kerala" label="Kerala" />
              <option value="Telangana" label="Telangana" />
              <option value="Maharashtra" label="Maharashtra" />
              <option value="Punjab" label="Punjab" />
              <option value="Andhra Pradesh" label="Andhra Pradesh" />
            </Field>
            <IoIosArrowDown
              className={`dropdown-arrow ${isStateOpen ? "rotate" : ""}`}
            />
          </div>
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="state" />
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="country"
          >
            Country
          </label>
          <div className="select-wrapper">
            <Field
              as="select"
              id="country"
              name="country"
              className={`form-control border border-secondary rounded-3 p-3 w-100 ${
                isCountryOpen ? "open" : ""
              } ${errors.country && touched.country ? "border-danger" : ""}`}
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              onBlur={() => setIsCountryOpen(false)}
            >
              <option disabled label="Select Country" />
              <option value="Tamil Nadu" label="Tamil Nadu" />
              <option value="Kerala" label="Kerala" />
              <option value="Telangana" label="Telangana" />
              <option value="Maharashtra" label="Maharashtra" />
              <option value="Punjab" label="Punjab" />
              <option value="Andhra Pradesh" label="Andhra Pradesh" />
            </Field>
            <IoIosArrowDown
              className={`dropdown-arrow ${isCountryOpen ? "rotate" : ""}`}
            />
          </div>
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="country" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg -2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="pincode"
          >
            Pincode
          </label>
          <Field
            type="text"
            placeholder="e.g. 123456"
            id="pincode"
            name="pincode"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.pincode && touched.pincode
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="pincode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form2;
