import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from 'react';
import "./CSS/Form.css";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';

interface FormValues {
  company_name: string;
  type_of_company: string;
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
  const [companyTypes, setCompanyTypes] = useState<Array<{ id: string; name: string }>>([]);
  const [cities, setCities] = useState<Array<{ id_city: number; city_name: string; state_name: string; country_name: string; id_country: number; id_state: number }>>([]);
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
      setFieldValue("id_state", selectedCity.id_state);
      setFieldValue("id_country", selectedCity.id_country);
      setFieldValue("id_city", selectedCity.id_city);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidKeys = ['e', 'E', '+', '-'];
    const isNavigationKey = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Delete', 'Home', 'End'
    ].includes(e.key);
  
    if (isNavigationKey || e.key === 'Enter') {
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
      <h2 className="text-success font-weight-bold fs-3 mb-0">Company Info</h2>
      <p className="text-secondary m-0 fs-small">
        Please provide your Company Name, Company Type, and Address
      </p>
      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="company_name"
          >
            Company Name
          </label>
          <Field
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="company_name"
            name="company_name"
            className={`form-control border border-secondary rounded-3 p-3 w-100 ${
              errors.company_name && touched.company_name
                ? "border-danger shake-animation"
                : ""
            }`}
          />
          <div className="text-danger fs-small pt-2 errorMessage">
            <ErrorMessage name="company_name" />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="type_of_company"
          >
            Company Type
          </label>
          <div className="select-wrapper">
            <Field
              as="select"
              id="type_of_company"
              name="type_of_company"
              className={`form-control border border-secondary rounded-3 p-3 w-100 ${
                errors.type_of_company && touched.type_of_company ? "border-danger" : ""
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
            <ErrorMessage name="type_of_company" />
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
            className={`form-control border border-secondary rounded-3 p-3 w-100 `}
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
            className={`form-control border border-secondary rounded-3 p-3 w-100 `}
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
            onKeyDown={handleKeyDown}
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
