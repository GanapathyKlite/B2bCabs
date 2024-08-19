import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaRupeeSign } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { useAuth } from "../../Auth/AuthContext";

interface Option {
  icon: JSX.Element;
  color: string;
  text: string;
}

const CarListNavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your option");
  const { inputValueOne, inputValueTwo, selectedDate, selectedDateRange, tripType } = useAuth();

  const options: Option[] = [
    { icon: <FaRupeeSign />, color: "#171515", text: "Cab From Airport" },
    { icon: <FaRupeeSign />, color: "#E1306C", text: "Cab To Airport" },
    { icon: <FaRupeeSign />, color: "#0E76A8", text: "Daily Rental" },
    { icon: <FaRupeeSign />, color: "#4267B2", text: "Hourly Rental" },
    { icon: <FaRupeeSign />, color: "#1DA1F2", text: "Holidays Package" },
  ];


  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (text: string) => {
    setSelectedOption(text);
    setIsActive(false);
  };

  return (
    <>
      <div className="edit_search position-sticky d-none d-md-block top0">
        <div className="container">
          <div className="row justify-content-evenly">
            <div
              className={`p-0 col-lg-2 select-menu ${isActive ? "active" : ""}`}
            >
              <div className="select-btn" onClick={toggleDropdown}>
                <div className="d-flex label">Trip Type</div>
                <div className="d-flex justify-content-between align-items-center w-100">
                  {tripType? (<span className="sBtn-text">{tripType}</span>):(<span className="sBtn-text">{selectedOption}</span>)}
                  
                  {isActive ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              </div>

              <ul className="options">

                {options.map((option, index) => (
                  <li
                    className="option"
                    key={index}
                    onClick={() => handleOptionClick(option.text)}
                  >
                    <i
                      className={`bx ${option.icon}`}
                      style={{ color: option.color }}
                    ></i>
                    <span className="option-text">{option.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pe-0 ps-1 col-lg-2">
              <div className="d-flex justify-content-between align-items-start fromPlace">
                <div className="d-flex label">FROM</div>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <input
                    type="text"
                    placeholder="Input One"
                    className="hiddenInputBox"
                    value={inputValueOne}
                  />
                  {/* <span className="sBtn-text">
                    Muthialpet Police Station, Mahatma Gandhi Road, Ramakrishna
                    Nagar, Puducherry, India
                  </span> */}
                </div>
              </div>
            </div>
            <div className="arrows">
              <LuArrowLeftRight />
            </div>
            <div className="p-0 col-lg-2">
              <div className="d-flex justify-content-between align-items-start fromPlace">
                <div className="d-flex label">TO</div>
                <div className="d-flex justify-content-between align-items-center w-100">
                  {/* <span className="sBtn-text">
                    Yeswanthpur South Western Railway Parcel Office, Railway
                    Colony Road, Muniswara Nagar, Yeswanthpur, Bengaluru,
                    Karnataka, India
                  </span> */}
                   <input
        type="text"
        placeholder="Input Two"
        className="hiddenInputBox"
        value={inputValueTwo}
      />
                </div>
              </div>
            </div>

            <div className="pe-0 ps-1 col-lg-3">
              <div className="d-flex justify-content-between position-relative align-items-start fromPlace p-0">
                <div
                  className="d-flex label position-absolute z-3"
                  style={{ left: "10px", top: "5px" }}
                >
                  PICK-UP DATE
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 datePickerDiv">
                  {/* <RangePicker /> */}
                  {selectedDate ? (
        <DatePicker value={selectedDate} />
      ) : (
        <RangePicker value={selectedDateRange} />
      )}

                </div>
              </div>
            </div>

            <div className="col-lg-2 d-flex align-items-center searchBtnDiv">
              <button className="primaryBtn">
                <span>SEARCH</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarListNavBar;
