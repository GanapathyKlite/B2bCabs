import "./ViewProfile.css";
// import CompanyLogo from "../../Assets/Company_Logo/Yas_Main_Logo.svg";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import PersonalInfo from "./Component/PersonalInfo";
import CompanyInfo from "./Component/CompanyInfo";
import BankInfo from "./Component/BankInfo";
import { Notyf } from "notyf";
import CompanyIDProofInfo from "./Component/CompanyIDProofInfo";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";

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

const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});

const ViewProfile = () => {
  const [isEditable, setIsEditable] = useState(false);

  const navigate = useNavigate();
  const {userData, authToken} = useAuth();
  const [profileData, setProfileData] = useState<Profile>({});
  const [initialProfileData, setInitialProfileData] = useState<Profile>({});
  

  const [isDisabled, setIsDisabled] = useState(true);

  const handleValidationChange = (isValid: boolean) => {
    setIsDisabled(!isValid)
  };

  const handleCompanyValidationChange = (isValid: boolean) => {
    console.log("company",isValid);
    
    setIsDisabled(!isValid);
  };

  const handleUpdateClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/agent/profile-update/${userData.id}`,
          {
            mobile_no: profileData.mobile_no,
            address: profileData.address,
            pincode: profileData.pincode,
          }
            ,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          notyf.success(response.data.message)
          setInitialProfileData(profileData); 
          setIsDisabled(true);
          
        }
      } catch (error) {
        notyf.error("Profile not updated")
        console.log(error);
      }
    setIsEditable(!isEditable);
  };
  useEffect(() => {
    const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/agent/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        }
      );
      setProfileData(response.data);
      setInitialProfileData(response.data);
      
    } catch (err) {
      console.log(err);
    }
    
  }
  fetchProfile();

  },[]);

  


  const handleBreadCrumbClick = (path: string) => {
    navigate(path);
  };
  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
  const companyImage = `${imageURL}${userData.logo}`;

  const handleMobileNumberChange = (mobileNumber: number | null) => {
    setProfileData((prevProfile) => ({
      ...prevProfile,
      mobile_no: mobileNumber ? mobileNumber.toString() : "",
    }));
  };

  const handleAddressChange = (address: string) => {
    setProfileData((prevProfile) => ({
      ...prevProfile,
      address,
    }));
  };

  const handlePincodeChange = (pincode: number | null) => {
    setProfileData((prevProfile) => ({
      ...prevProfile,
      pincode: pincode ? pincode.toString() : "",
    }));
  };

  useEffect(() => {

    console.log(profileData.mobile_no,"current");
    console.log(initialProfileData.mobile_no, "initial");
    
    
    if (
      profileData.mobile_no == initialProfileData.mobile_no &&
      profileData.address === initialProfileData.address &&
      profileData.pincode == initialProfileData.pincode
    ) {
      setIsDisabled(true);
    } 
  }, [profileData, initialProfileData, handleMobileNumberChange, handleAddressChange, handlePincodeChange]);
  return (
    <>
      <div className="container pt-3 pb-5">
        <div className="breadcrumbDiv">
          <span onClick={() => handleBreadCrumbClick("/dashboard")}>
            Dashboard
          </span>
          <IoIosArrowForward /> <span>View Profile</span>
        </div>
        <div className="row justify-content-center mt-3 row-gap-4 editprofileDetailsDiv">
          <div className="col-8 d-flex flex-column row-gap-4">
            <PersonalInfo isEditable={isEditable}  profile={profileData}
             onValidationChange={handleValidationChange}
            onMobileNumberChange={handleMobileNumberChange} />
            <CompanyInfo isEditable={isEditable}
              profile={profileData}
              onAddressChange={handleAddressChange}
              onPincodeChange={handlePincodeChange}
              onValidationChange={handleCompanyValidationChange} 
              />
            <BankInfo  profile={profileData}/>
            <CompanyIDProofInfo  profile={profileData}/>
          </div>
          <div className="col-4">
            <div className="profileDetailsDiv">
              <div className="profileDetailsLogoDiv">
                <img 
                // src={CompanyLogo} 
                src={companyImage}
                alt="CompanyLogo" />
              </div>
              <div className="profileDetails">
                <div>
                  <span className="userIcon">
                    <FaUser />
                  </span>
                  {/* Ganapathy Manohkar P */}
                  {userData.name}
                </div>
                <div>
                  <span className="emailIcon">
                    <FaEnvelope />
                  </span>
                  {/* Ganapathy@klitetechnology.com */}
                  {userData.email}
                </div>
                <div>
                  <span className="mobileIcon">
                    <IoCall />
                  </span>
                  {/* 8838167633 */}
                  {userData.mobile}
                </div>
              </div>
              
              {isEditable ? (<>
                <button
                className="primaryBtn d-flex gap-2 align-items-center justify-content-center"
                onClick={handleUpdateClick}
                disabled={isDisabled}
                style={{backgroundColor: isDisabled ? "gray" : "#089848"}}
                
              >
                Update
                <span>
                  <FaUserEdit />
                </span>
              </button>
              </>):(<>
                <button
                className="primaryBtn d-flex gap-2 align-items-center justify-content-center"
                onClick={()=>{
                  setIsEditable(!isEditable);
                }}
                
              >
                Edit
                <span>
                  <FaUserEdit />
                </span>
              </button>
              </>)}
              
              {isEditable && (
                  <button
                  style={{backgroundColor: "gray"}}
                    className="primaryBtn d-flex gap-2 align-items-center justify-content-center"
                    onClick={() => {
                      setIsEditable(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewProfile;
