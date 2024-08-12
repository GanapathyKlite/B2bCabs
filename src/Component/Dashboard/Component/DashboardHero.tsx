import React, { useState } from "react";
import "./CSS/DashboardHero.css";
import bg from "../../../Assets/hero-banner.jpg";
import { MdLocationSearching, MdGpsFixed } from "react-icons/md";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { DatePicker } from "antd";
import { LuCalendarDays } from "react-icons/lu";

// import "antd/dist/reset.css";
// import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface TabData {
  id: number;
  title: string;
  firstRadioButtonLable?: string;
  secondRadioButtonLable?: string;
  firstRadioButtonValue?: string;
  SecondRadioButtonValue?: string;
  first_input_box_placeholder: string;
  second_input_box_placeholder?: string;
  third_input_box_placeholder?: string;
  fourth_input_box_placeholder?: string;
  icon?: string;
}

const { RangePicker } = DatePicker;

const tabsData: TabData[] = [
  {
    id: 1,
    title: "Airport Transfer",
    firstRadioButtonLable: "From Airport",
    secondRadioButtonLable: "To Airport",
    firstRadioButtonValue: "fromAirport",
    SecondRadioButtonValue: "toAirport",
    first_input_box_placeholder: "Current Location",
    second_input_box_placeholder: "Enter Destination",
    third_input_box_placeholder: "Pick up Date & Time",
  },
  {
    id: 2,
    title: "Rental",
    firstRadioButtonLable: "Daily Rental",
    secondRadioButtonLable: "Hourly Rental",
    firstRadioButtonValue: "dailyRental",
    SecondRadioButtonValue: "hourlyRental",
    first_input_box_placeholder: "Current Location",
    second_input_box_placeholder: "Select Package",
    third_input_box_placeholder: "Pick up Date & Time",
  },
  {
    id: 3,
    title: "Holidays Package",
    first_input_box_placeholder: "Current Location",
    second_input_box_placeholder: "Enter Destination",
    third_input_box_placeholder: "Pick up Date & Time",
    fourth_input_box_placeholder: "Select Package",
  },
];

const DashboardHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isToggled, setToggled] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [inputValueTwo, setInputValueTwo] = useState<string>("");

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const handleCurrentLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggled(!isToggled);
  };

  const handleToggle = (option: string) => {
    setSelectedOption(option);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/dashboard/cablist");
  };

  const inputFieldOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputOneValue = e.target.value;
    setInputValueOne(inputOneValue);
    console.log(inputOneValue);
  };

  const inputFieldTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTwoValue = e.target.value;
    setInputValueTwo(inputTwoValue);
    console.log(inputTwoValue);
  };

  return (
    <>
      <div className="hero-banner">
        <div className="overlay"></div>
        <img src={bg} alt="Hero Banner" className="video" />
      </div>
      <div className="container-lg container-fluid position-relative height">
        <div className="row justify-content-center ">
          <div className="col-lg-12 mobile_sc">
            <div className="col-md-5 col-lg-4 justify-content-around tab_box">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab_btn ${activeTab === tab.id ? "actives" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="content_box">
              {tabsData.map((tab) => (
                <form onSubmit={handleSubmit}>
                  <div
                    key={tab.id}
                    className={`content ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                  >
                    {tab.id === 3 ? (
                      <div className="d-flex text-body-secondary m-0 h5 fw-light py-1 py-sm-2">
                        Select Your Holiday's Package
                      </div>
                    ) : (
                      <>
                        <div
                          className={`row ${
                            tab.id === 3 ? "d-none" : ""
                          } text-nowrap`}
                        >
                          <div className="radio-input-wrapper d-flex col-md-5 gap-2 pb-2">
                            <label
                              className={`label px-0 px-sm-2 px-md-3 py-1 py-sm-2`}
                            >
                              <input
                                type="radio"
                                id={tab.firstRadioButtonValue}
                                className="radio-type"
                                value={tab.firstRadioButtonValue}
                                checked={selectedOption === "option1"}
                                onChange={() => handleToggle("option1")}
                              />
                              <div className="label-text">
                                {tab.firstRadioButtonLable}
                              </div>
                            </label>
                            <label
                              className={`label px-0 px-sm-2 px-md-3 py-1 py-sm-2`}
                            >
                              <input
                                type="radio"
                                id={tab.SecondRadioButtonValue}
                                className="radio-type"
                                value={tab.SecondRadioButtonValue}
                                checked={selectedOption === "option2"}
                                onChange={() => handleToggle("option2")}
                              />
                              <div className="label-text">
                                {tab.secondRadioButtonLable}
                              </div>
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row justify-content-center row-gap-3 align-items-center position-relative">
                      <div className="col-lg-3 col-md-3 z-1">
                        <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                          <div
                            className={`${tab.id === 1 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <FaPlaneArrival className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 2 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 3 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>

                          <input
                            onChange={inputFieldOne}
                            value={inputValueOne}
                            type="text"
                            required
                            className="inputbox w-75"
                            placeholder={`${
                              tab.id === 1 && selectedOption === "option1"
                                ? "Enter Airport Name"
                                : "Enter Pickup Address"
                            }`}
                          />
                          <button
                            className={`currentlocationbtn ${
                              selectedOption === "option1" && tab.id === 1
                                ? "invisible"
                                : "opacity-1"
                            }`}
                            onClick={handleCurrentLocation}
                          >
                            {isToggled ? (
                              <MdGpsFixed className="clicked" />
                            ) : (
                              <MdLocationSearching className="notclicked" />
                            )}
                          </button>
                        </div>
                      </div>
                      {/* <hr
                        className={`hrLine d-block d-sm-none d-md-none d-lg-none d-xl-none`}
                        style={{ top: tab.id === 3 ? "30%" : "50%" }}
                      /> */}

                      <div className="col-lg-3 col-md-3 z-1">
                        <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                          <div
                            className={`${tab.id === 1 ? "d-flex" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <FaPlaneDeparture className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 2 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <LuClock4 className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 3 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <LuClock4 className="icon" />
                            )}
                          </div>

                          <div
                            className={`${
                              tab.id === 2 && selectedOption === "option2"
                                ? "d-none"
                                : "d-flex w-75"
                            }`}
                          >
                            <input
                              type="text"
                              onChange={inputFieldTwo}
                              value={inputValueTwo}
                              required
                              className="inputbox w-100 m-0"
                              placeholder={`${
                                tab.id === 1 && selectedOption === "option2"
                                  ? "Enter Airport Name"
                                  : "Enter Drop Address"
                              }`}
                            />
                          </div>
                          <div
                            className={`${
                              tab.id === 2 && selectedOption === "option2"
                                ? "d-flex w-75 justify-content-between"
                                : "d-none"
                            }`}
                          >
                            <select className="inputbox m-0 w-100">
                              <option value="1">1 hrs 15km</option>
                              <option value="2">2 hrs 25km</option>
                              <option value="3">4 hrs 35km</option>
                              <option value="4">5 hrs 50km</option>
                              <option value="5">6 hrs 60km</option>
                              <option value="6">7 hrs 70km</option>
                              <option value="7">8 hrs 70km</option>
                              <option value="8">9 hrs 70km</option>
                            </select>
                          </div>
                          <button
                            className={`currentlocationbtn ${
                              tab.id === 2 && selectedOption === "option2"
                                ? "invisible"
                                : "invisible"
                            }`}
                          >
                            <MdLocationSearching />
                          </button>
                        </div>
                      </div>
                      {/* <hr className="hrLine d-block d-sm-none" /> */}

                      {/* <div className="divline d-none d-sm-block d-md-none d-lg-none d-xl-none">
                        <hr className="hrLine" />
                      </div> */}
                      {tab.id === 1 ||
                      (tab.id === 2 && selectedOption === "option2") ? (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv px-3 py-0  m-0 d-flex align-items-center justify-content-between">
                              <LuCalendarDays />

                              <DatePicker
                                required
                                format="ddd, MMM D"
                                suffixIcon={null}
                                className="border-0 w-75 p-0"
                                allowClear={false}
                              />
                              <LuCalendarDays className="invisible" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv px-3 py-0  m-0 d-flex align-items-center justify-content-between">
                              <LuCalendarDays />

                              <RangePicker
                                required
                                format="ddd, MMM D"
                                suffixIcon={null}
                                className="border-0 w-75 p-0"
                                allowClear={false}
                              />
                              <LuCalendarDays className="invisible" />
                            </div>
                          </div>
                        </>
                      )}

                      {tab.id === 3 ? (
                        <>
                          {/* <hr className="hrLine d-block d-sm-none" /> */}

                          {/* <div className="divline d-none d-sm-block d-md-none d-lg-none d-xl-none">
                            <hr className="hrLine" />
                          </div> */}
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                              <select className="inputbox m-0 w-100">
                                <option value="1">Select Your Package</option>
                                <option value="1">
                                  Cochin - Munnar (2N) - Alleppy (1N)
                                </option>
                                <option value="2">
                                  Munnar - Cochin (2N) - Alleppy (1N)
                                </option>
                                <option value="3">
                                  Cochin - Alleppy (2N) - Munnar (1N)
                                </option>
                                <option value="4">
                                  Cochin - Munnar (2N) - Alleppy (1N)
                                </option>
                              </select>
                            </div>
                          </div>
                        </>
                      ) : null}

                      <div className="col-lg-3 col-md-3 z-1">
                        <button
                          type="submit"
                          className="text-nowrap search_btn w-100 py-lg-3 px-lg-4 py-md-2 px-md-3"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
