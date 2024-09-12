import { useState, useEffect } from "react";


interface Profile {
  company_name?: string;
  name_title?: string;
  name?: string;
  email_id?: string;
  mobile_no?: string;
  al_mobile_no?: string;
  address?: string;
  pincode?: string;
  pan_no?: string;
  pan_front_side_img?: string;
  gst_no?: string;
  gst_front_side_img?: string;
  company_reg_cer_img?: string;
  account_no?: string;
  beneficiary_name?: string;
  ifc_code?: string;
  check_leaf_front_img?: string;
  company_logo?: string;
  current_balance?: string;
  type_of_company_name?: string;
  city_name?: string;
  state_name?: string;
  country_name?: string;
}
interface CompanyInfoProps {
  isEditable: boolean;
  profile: Profile;
  onValidationChange: (isValid: boolean) => void;
  onAddressChange: (address: string) => void;
  onPincodeChange: (pincode: number | null) => void;
  setResetPincodeError: React.Dispatch<React.SetStateAction<(() => void) | null>>;
  setResetAddressError: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}
const CompanyInfo = ({ isEditable, profile,onValidationChange, onAddressChange, onPincodeChange, setResetPincodeError,setResetAddressError }: CompanyInfoProps) => {
  const [editAddress, setEditAddress] = useState<string>(
    profile.address ?? ""
  );
  const [editPincode, setEditPincode] = useState<number | null>(null);
  const [pincodeError, setpincodeError] = useState<string | null>(null);
  const [addressError, setaddressError] = useState<string | null>(null);

  useEffect(() => {
    if (profile.pincode) {
      setEditPincode(parseInt(profile.pincode));
    }
    if (profile.address) {
      setEditAddress(profile.address);
    }

    setResetPincodeError(() => () => setpincodeError(null));
    
    setResetAddressError(() => () => setaddressError(null));
    return () =>{
      setResetPincodeError(null);
      setResetAddressError(null);
    }
  }, [profile.pincode, profile.address, setResetPincodeError, setResetAddressError]);


  

  const handleEditAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const address = e.target.value;
    setEditAddress(address);
    onAddressChange(address);
    validateField("address");
  };

  const handleEditPincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const pincode = numericValue === "" ? null : Number(numericValue);
    setEditPincode(pincode);
    onPincodeChange(pincode); 

  if (numericValue.length !== 6) {
    setpincodeError("Pincode must be exactly 6 digits");
    onValidationChange(false);
  } else if (numericValue.length === 6) {
    setpincodeError(null);
    onValidationChange(true);
  } else {
    setpincodeError("Pincode must be exactly 6 digits");
    onValidationChange(false);
  }
    // validateField("pincode");
  };

  const validateField = (field: string) => {
    switch (field) {
      case "pincode":
        if (editPincode === null || editPincode.toString().length !== 6) {
          setpincodeError("Pincode must be exactly 6 digits");
        } else {
          setpincodeError(null);
        }
        break;

        case "address":
        if (editAddress === null || editAddress.length < 10) {
          setaddressError("Address must be atleast 10 characters");
        } else {
          setaddressError(null);
        }
        break;
        
      default:
        break;
    }
    // onValidationChange(!pincodeError && !addressError);
  };
  useEffect(() => {
    onValidationChange(!pincodeError && !addressError);
  }, [pincodeError, addressError, editAddress]);
  
  return (
    <>
      <div className="row row-gap-3 personalInfoDiv">
        <div className="col-12 text-success font-weight-bold fs-3 mb-0">
          Company Info
        </div>

        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="company_name"
          >
            Company Name
          </label>
          {/* <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            readOnly
            value={profile.company_name}
            id="company_name"
            name="company_name"
            className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100`}
          /> */}
          <div>
          {profile.company_name}
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
            {/* <input
              id="type_of_company"
              readOnly
              value={profile.type_of_company_name}
              name="type_of_company"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100`}
            /> */}
              {profile.type_of_company_name}
            {/* <IoIosArrowDown className={`dropdown-arrow`} /> */}
          </div>
        </div>

        <div className="col-12">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            placeholder="e.g. XYZ Street, Avenue Center"
            id="address"
            name="address"
            readOnly={!isEditable}
            value={editAddress !== null ? editAddress : ""}
            onChange={handleEditAddress}
            onBlur={() => validateField("address")}
            className={`form-control border border-secondary rounded-3 px-2 py-3 w-100 `}
          />
           {addressError && (
            <div className="text-danger mt-2">{addressError}</div>
          )}
        </div>

        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="city"
          >
            City
          </label>
          <div className="select-wrapper">
            {/* <input
              id="city"
              value={profile.city_name}
              name="city"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100`}
            /> */}
            {/* <IoIosArrowDown className={`dropdown-arrow`} /> */}
            {profile.city_name}
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
            {/* <input
              id="state"
              name="state"
              value= {profile.state_name}
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100 `}
            /> */}
            {profile.state_name}
          </div>
        </div>
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="country"
          >
            Country
          </label>
          <div className="select-wrapper">
            {/* <input
              id="country"
              value={profile.country_name}
              name="country"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100 `}
            /> */}
            {profile.country_name}
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="pincode"
          >
            Pincode
          </label>
          <input
            placeholder="e.g. 123456"
            id="pincode"
            readOnly={!isEditable}
            name="pincode"
            value={editPincode !== null ? editPincode : ""}
            onChange={handleEditPincode}
            // onBlur={() => validateField("pincode")}
            maxLength={6}
            className={`form-control border border-secondary rounded-3 p-2 w-100`}
          />
          {pincodeError && (
            <div className="text-danger mt-2">{pincodeError}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
