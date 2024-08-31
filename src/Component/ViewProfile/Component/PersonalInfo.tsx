import { useEffect, useState } from "react";

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

interface PersonalInfoProps {
  isEditable: boolean;
  profile: Profile;
  onValidationChange: (isValid: boolean) => void;
  onMobileNumberChange: (mobileNumber: number | null) => void;
}

const PersonalInfo = ({ isEditable, profile, onValidationChange, onMobileNumberChange }: PersonalInfoProps) => {
  const [editMobileNumber, setEditMobileNumber] = useState<number | null>(null);
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(null);
useEffect(() => {
  if (profile.mobile_no) {
    setEditMobileNumber(parseInt(profile.mobile_no));
  }
}, [profile.mobile_no]); 



const handleEditMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  const numericValue = inputValue.replace(/[^0-9]/g, "");
  const numberValue = numericValue === "" ? null : Number(numericValue);
  setEditMobileNumber(numberValue);
  onMobileNumberChange(numberValue); 
  validateField("contactNumber");
};

const validateField = (field: string) => {
  switch (field) {
    case "contactNumber":
      if (editMobileNumber === null || editMobileNumber.toString().length !== 10) {
        setMobileNumberError("Contact Number must be exactly 10 digits");
        onValidationChange(false); 
      } else {
        setMobileNumberError(null);
        onValidationChange(true); 
      }
      break;
      
    default:
      break;
  }
};

  return (
    <>
      <div className="row row-gap-3 personalInfoDiv">
        <div className="col-12 text-success font-weight-bold fs-3 mb-0">
          Personal Info
        </div>
        <div className="col-2 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="title"
          >
            Title
          </label>
          <div className="select-wrapper">
            {/* <input
              id="name_title"
              readOnly
              value="Mr"
              name="name_title"
              className="border-0 border-secondary rounded-3 p-2 py-1 w-100"
            /> */}
            {profile.name_title}
            {/* <IoIosArrowDown className={`dropdown-arrow`} /> */}
          </div>
        </div>

        <div className="col-12 col-lg-5 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="firstname"
          >
            {/* First  */}
            Name
          </label>
          {/* <input
            type="text"
            placeholder="e.g. Johnny"
            readOnly
            value="Ganapathy"
            id="firstname"
            name="firstname"
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100`}
          /> */}
          {profile.name}
        </div>

        {/* <div className="col-12 col-lg-5 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="e.g. Depp"
            readOnly
            value="Manohkar"
            id="lastname"
            name="lastname"
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100 $`}
          />
        </div> */}
        <div className="col-12">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="email_id"
          >
            Email ID
          </label>
          {/* <input
            type="text"
            placeholder="e.g. johnnydepp@gmail.com"
            readOnly
            value={profile.email_id}
            id="email_id"
            name="email_id"
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100 min-height-[50px]`}
          /> */}
          <div>
          {profile.email_id}
          </div>
        </div>
        <div className="col-12 col-lg-6 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="mobile_no"
          >
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="mobile number"
            id="mobile_no"
            name="mobile_no"
            disabled={!isEditable}
            value={editMobileNumber !== null ? editMobileNumber : ""}
            onBlur={() => validateField("contactNumber")}
            onChange={handleEditMobileNumber}
            maxLength={10}
            className={`border border-secondary rounded-3 p-2 w-100`}
          />
            {mobileNumberError && (
            <div className="text-danger mt-2">{mobileNumberError}</div>
          )}
        </div>
        <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="al_mobile_no"
          >
            Alternate Mobile Number
          </label>
          {/* <input
            type="text"
            placeholder="e.g. 0987654321"
            id="al_mobile_no"
            name="al_mobile_no"
            readOnly
            value={profile.al_mobile_no}
            maxLength={10}
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100`}
          /> */}
          <div>
          {profile.al_mobile_no}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
