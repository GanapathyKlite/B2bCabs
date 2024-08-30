import "./ViewProfile.css";
import CompanyLogo from "../../Assets/Company_Logo/Yas_Main_Logo.svg";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import PersonalInfo from "./Component/PersonalInfo";
import CompanyInfo from "./Component/CompanyInfo";
import BankInfo from "./Component/BankInfo";

import CompanyIDProofInfo from "./Component/CompanyIDProofInfo";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };
  const navigate = useNavigate();

  const handleBreadCrumbClick = (path: string) => {
    navigate(path);
  };

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
            <PersonalInfo isEditable={isEditable} />
            <CompanyInfo isEditable={isEditable} />
            <BankInfo />
            <CompanyIDProofInfo />
          </div>
          <div className="col-4">
            <div className="profileDetailsDiv">
              <div className="profileDetailsLogoDiv">
                <img src={CompanyLogo} alt="CompanyLogo" />
              </div>
              <div className="profileDetails">
                <div>
                  <span className="userIcon">
                    <FaUser />
                  </span>
                  Ganapathy Manohkar P
                </div>
                <div>
                  <span className="emailIcon">
                    <FaEnvelope />
                  </span>
                  Ganapathy@klitetechnology.com
                </div>
                <div>
                  <span className="mobileIcon">
                    <IoCall />
                  </span>
                  8838167633
                </div>
              </div>
              <button
                className="primaryBtn d-flex gap-2 align-items-center justify-content-center"
                onClick={handleEditClick}
              >
                {isEditable ? "Update" : "Edit"}
                <span>
                  <FaUserEdit />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewProfile;
