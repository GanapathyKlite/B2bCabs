import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from 'react';
import "./CSS/Form.css";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';

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
  const [companyTypes, setCompanyTypes] = useState<Array<{ id: string; name: string }>>([]);
  const [cities, setCities] = useState<Array<{ id_city: number; city_name: string; state_name: string; country_name: string }>>([]);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/registration-type`);
        setCompanyTypes(response.data);
        
      } catch (error) {
        console.error('Error fetching company types:', error);
      }
    };

    fetchCompanyTypes();
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/city/city-state-country`);
        if (response.data.status) {
          setCities(response.data.cities);
          
        } else {
          console.error('Failed to fetch cities');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = cities.find(city => city.city_name === event.target.value);

    if (selectedCity) {
      setFieldValue('state', selectedCity.state_name);
      setFieldValue('country', selectedCity.country_name);
    }
  };
  return (
    <div
      className="d-flex flex-column gap-2 h-100 w-100 align-items-start font-mono text-left overflow-custom px-2"
      style={{ scrollbarWidth: "thin" }}
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
              {/* <option
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
              /> */}
              {companyTypes.map((type) => (
          <option key={type.id} value={type.id} label={type.name} />
        ))}
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
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                handleCityChange(event);
                setFieldValue('city', event.target.value);
              }}
            >
              <option disabled label="Select City" />
              {/* <option value="Tamil Nadu" label="Tamil Nadu" />
              <option value="Kerala" label="Kerala" />
              <option value="Telangana" label="Telangana" />
              <option value="Maharashtra" label="Maharashtra" />
              <option value="Punjab" label="Punjab" />
              <option value="Andhra Pradesh" label="Andhra Pradesh" /> */}
               {cities.map((city) => (
          <option key={city.id_city} value={city.city_name} label={city.city_name} />
        ))}
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
            as="input"
            id="state"
            name="state"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              isStateOpen ? 'open' : ''
            }`}
            readOnly
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
            as="input"
            id="country"
            name="country"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              isCountryOpen ? 'open' : ''
            }`}
            readOnly
          />
           
          </div>
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="country" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
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
            maxLength={6}
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
