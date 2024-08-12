import React from "react";
import "./CarBooking.css";
import carIcon from "../../Assets/Car_icon.svg";
import Footer from "../Footer/Footer";
import {  Tooltip } from "antd";
// Icons Start
import {
  FaArrowRightArrowLeft,
  FaGasPump,
  FaRegSnowflake,
  FaTv,
  FaCheck,
  FaCircleCheck,
} from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TbClockX } from "react-icons/tb";
import { GiCharging } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
// Icons End

const CarBooking: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
  return (
    <>
      <div className="w-100 ReviewBookingBar">
        <div className="container text-light py-3 px-2 d-flex flex-column gap-2">
          <div className="titleReviewBooking">Review Booking</div>
          <div
            className="d-flex align-items-center column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          >
            <span>Bangalore</span>
            <FaArrowRightArrowLeft />
            <span>Puducherry, India</span>
          </div>
          <div
            className="d-flex column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          >
            <span>Round Trip</span>|
            <span>Pickup : Thu, 15 Feb 24, 12:55 PM</span>|
            <span>Drop : Sat, 17 Feb 24, 10:55 AM</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="px-lg-5 row">
          <div className="py-4 py-lg-5 col-lg-8 d-flex flex-column gap-4">
            <div className="sideBars bg-light d-flex justify-content-between">
              <div className="col-lg-3 d-flex">
                <div className="carIcon d-flex align-items-center justify-content-center">
                  <img src={carIcon} alt="caricon" />
                </div>
              </div>
              <div className="col-lg-8 d-flex">
                <div className="d-flex gap-2 flex-column w-100">
                  <div className="d-inline-flex align-items-center gap-1">
                    <span className="carName">
                      <b>Dzire, Etios</b>
                    </span>
                    <span className="similarCarName">or similar</span>
                  </div>
                  <div className="d-inline-flex">
                    <span className="d-flex gap-2" style={{ fontSize: "14px" }}>
                      <li>Sedan</li>
                      <li>AC</li>
                      <li>4 Seats</li>
                    </span>
                  </div>
                  <div className="d-flex gap-2 flex-column w-100">
                    <p className="m-0">
                      <b>Spacious Car</b>
                    </p>
                    <div className="d-flex">
                      <div className="text-primary pe-3">
                        <GrMapLocation />
                      </div>
                      <div className="d-flex font-size14 w-100">
                        <div className="col-lg-4">Extra km fare </div>
                        <div className="col-lg-8 fontInter">
                          ₹10.8/km after 755 kms
                        </div>
                      </div>
                    </div>

                    <div className="d-flex font-size14">
                      <div className="text-primary pe-3">
                        <TbClockX />
                      </div>
                      <div className="d-flex w-100">
                        <div className="col-lg-4">Cancellation </div>
                        <div className="col-lg-8">
                          <span className="text-success">Free</span> till 1 hour
                          of departure
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center w-100">
                      <div className="text-primary pe-3">
                        <FaGasPump />
                      </div>
                      <div className="d-flex w-100">
                        <div className="col-lg-4 font-size14">Amenities</div>
                        <div className="d-flex col-lg-8 text-primary gap-3 align-items-center">
                          <FaRegSnowflake />
                          <GiCharging />
                          <FaTv />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sideBars bg-light">
              <div className="h5">Driver & Cab details</div>
              <div className="font-size14">
                Cab and driver details will be shared up to 30 mins prior to
                departure.
              </div>
            </div>

            <div className="sideBars d-flex bg-light">
              <div className="left_side d-flex gap-3 flex-column col-6">
                <div className="d-flex gap-2">
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    <FaCheck />
                  </span>
                  <div>
                    <span className="h5">Inclusions</span>
                    <span className="font-size14">(Included in the Price)</span>
                  </div>
                </div>
                <div className="ps-3 font-size14 d-flex flex-column gap-3">
                  <div>
                    <GoDotFill style={{ fontSize: "11px" }} /> 750 Kms
                  </div>
                  <div>
                    <GoDotFill style={{ fontSize: "11px" }} /> Driver Allowance
                  </div>
                </div>
              </div>

              <div className="right_side col-6 d-flex gap-3 flex-column">
                <div className="d-flex gap-2">
                  <span className="text-danger">
                    <IoClose />
                  </span>
                  <div>
                    <span className="h5">Exclusions</span>
                    <span className="font-size14">(Extra Charges)</span>
                  </div>
                </div>
                <div className="font-size14 d-flex flex-column gap-3">
                  <div className="d-flex">
                    <div className="col-6">
                      <GoDotFill style={{ fontSize: "11px" }} /> Toll Charges
                    </div>
                    <div
                      className="col-6 text-end"
                      style={{ fontWeight: "500" }}
                    >
                      As applicable
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-6">
                      <GoDotFill style={{ fontSize: "11px" }} /> State Tax
                    </div>
                    <div
                      className="col-6 text-end"
                      style={{ fontWeight: "500" }}
                    >
                      As applicable
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="col-6">
                      <GoDotFill style={{ fontSize: "11px" }} /> Waiting Charges
                    </div>
                    <div
                      className="col-6 text-end"
                      style={{ fontWeight: "500" }}
                    >
                      After 45 mins,
                      <br />{" "}
                      <span style={{ fontFamily: "Inter !important" }}>₹</span>
                      100.0/hr
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-7">
                      <GoDotFill style={{ fontSize: "11px" }} /> Fare beyond 750
                      Kms
                    </div>
                    <div
                      className="col-5 text-end"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Inter !important" }}>₹ </span>
                      16/Km
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sideBars bg-light p-3">
              <div className="h5 mb-3">Trip details</div>
              <form>
                <div className="mb-3 d-flex justify-content-between">
                  <div className="col-md-7">
                    <label className="font-size14">
                      <span style={{ fontWeight: "600" }}>Pick-up Address</span>
                    </label>
                    <input
                      type="text"
                      className="form-control px-3 py-2"
                      id="validationCustom01"
                      placeholder="Enter exact pick-up address"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="font-size14">
                      <span style={{ fontWeight: "600" }}>Pick-up Time</span>
                    </label>
                    <input
                      type="text"
                      className="form-control px-3 py-2"
                      id="validationCustom01"
                      placeholder="Enter pick-up time"
                      required
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="validationCustom01" className="font-size14">
                    <span style={{ fontWeight: "600" }}>Drop-off Address </span>
                  </label>
                  <input
                    type="text"
                    className="form-control px-3 py-2"
                    id="validationCustom01"
                    placeholder="Enter drop address to know the exact fare & avoid extra charges after the trip"
                    required
                  />
                </div>
                <hr />
                <div className="row">
                  <div className="h5 mb-3">Confirm Traveller information</div>
                  <div className="col-lg-6 d-flex flex-column gap-3">
                    <div className="mb-2">
                      <label
                        htmlFor="validationCustom01"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>Name</span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="validationCustom01"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="validationCustom01"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>Email id </span>
                        <span
                          className="font-size10"
                          style={{ color: "var(--grayText)" }}
                        >
                          (Your booking confirmation will be sent here)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="validationCustom01"
                        placeholder="Enter Email ID"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <label
                        htmlFor="validationCustom01"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>
                          Contact Number
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="validationCustom01"
                        placeholder="Enter 10 digit Mobile Number"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="validationCustom01"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>
                          Alternative Contact Number
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="validationCustom01"
                        placeholder="Enter 10 digit Mobile Number"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="font-size12 mt-4">
                  By proceeding to book, I Agree to B2b Cab's
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    Privacy Policy
                  </span>
                  ,
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    User Agreement
                  </span>
                  and
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    Terms of Service
                  </span>
                </div>
              </form>
            </div>
            <div className="sideBars bg-light">
              <div className="h5 mb-3">Read before you book!</div>
              <div className="row">
                <div className="col-6 d-flex flex-column gap-3">
                  <div>
                    <div className="font-size16 fontWeight500">
                      Cab Category
                    </div>
                    <div className="font-size12 text-justify">
                      The booking will be for cab type HATCHBACK and we do not
                      commit on providing the preferred cab model (Indica, Swift
                      or similar)
                    </div>
                  </div>
                  <div>
                    <div className="font-size16 fontWeight500">
                      Hilly Regions
                    </div>
                    <div className="font-size12 text-justify">
                      AC will be switched off in hilly areas
                    </div>
                  </div>
                  <div>
                    <div className="font-size16 fontWeight500">
                      Luggage Policy
                    </div>
                    <div className="font-size12 text-justify">
                      HATCHBACK has space for 1 Luggage Bag. However depending
                      on the number of passengers, luggage can be adjusted in
                      seating area with driver consent.
                    </div>
                  </div>
                  <div>
                    <div className="font-size16 fontWeight500">
                      Driver Details
                    </div>
                    <div className="font-size12 text-justify">
                      Driver details will be shared up to 30 mins prior to
                      departure. Incase the driver/cab that reaches you
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex flex-column gap-3">
                  <div className="font-size12 text-justify">
                    for pick up is different from what we have communicated,
                    please don't board the cab and call us for assistance.
                  </div>

                  <div>
                    <div className="font-size16 fontWeight500">
                      Trip Duration
                    </div>
                    <div className="font-size12 text-justify">
                      Car can be retained till 10:00 AM, 20 Feb, post which a
                      charge of Rs 1937.5 (includes 125 Kms & 12 hrs) will be
                      levied.
                    </div>
                  </div>
                  <div>
                    <div className="font-size16 fontWeight500">Delays</div>
                    <div className="font-size12 text-justify">
                      Due to traffic or any other unavoidable reason, pickup may
                      be delayed by 30 mins.
                    </div>
                  </div>
                  <div>
                    <div className="font-size16 fontWeight500">Receipts</div>
                    <div className="font-size12 text-justify">
                      You need to collect receipts from the driver for any extra
                      charges paid directly to the driver during the trip. MMT
                      is not liable to provide invoices for such amounts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 pe-lg-0">
            <div className="py-5 position-sticky top-95">
              <div
                className="py-2 px-1 mb-3 d-flex justify-content-between align-items-center rounded"
                style={{ backgroundColor: "#c1f1dd" }}
              >
                <span style={{ color: "var(--PrimaryColor)" }}>
                  <FaCircleCheck />
                </span>
                <span className="font-size11">
                  Free Cancellation before 19 Feb 2024, 10:45 AM IST
                </span>
                <span style={{ color: "var(--PrimaryColor)" }}>
                  <BsExclamationCircle />
                </span>
              </div>

              <div className="payment sideBars">
                <button className="primaryBtn mb-3 w-100">
                  Pay <span style={{ fontFamily: "Inter !important" }}>₹</span>
                  <span>1,469</span> Now
                </button>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios2"
                          value="option2"
                          checked
                        />
                        <label>
                          <div>
                            <div className="font-size14">
                              Make part payment now
                            </div>
                            <div className="font-size12">
                              Pay the rest to the driver
                            </div>
                          </div>
                        </label>
                      </div>
                      <div style={{ fontFamily: "Inter !important" }}>
                        <b>
                          <span>₹</span> 1,450
                        </b>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios2"
                          value="option2"
                          checked
                        />
                        <div>
                          <div className="font-size14">
                            Make full payment now
                          </div>
                        </div>
                      </div>
                      <div>
                        <b>
                          <span style={{ fontFamily: "Inter !important" }}>
                            ₹
                          </span>{" "}
                          7,109
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="font-size14">Total Amount </div>
                    <div className="font-size12" style={{ color: "gray" }}>
                      inclusive of GST
                    </div>
                  </div>

                  <div className="carRate d-flex flex-column">
                    <div>
                      <p className="text-danger m-0 text-end">13% off</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="strikeDiagonal font-size12 text-secondary d-flex justify-content-center align-items-center fontInter">
                        ₹10,054
                      </div>
                      <div className="font-size25 fontWeight500 fontInter">
                        ₹ 1,150
                      </div>
                    </div>
              
                    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip
        title={
          <div className="">
            <ul className="m-0 p-0">
              <li>
                <span>Base Fare</span>
                <span>2084</span>
              </li>
              <li>
                <span>State TAX</span>
                <span>250</span>
              </li>
              <li>
                <span>Toll Charges</span>
                <span>210</span>
              </li>
              <li>
                <span>Taxes & Fees</span>
                <span>223</span>
              </li>
            </ul>
          </div>
        }
        trigger="hover"
        arrowPointAtCenter  
      >
        <span style={{ color: "var(--PrimaryColor)" }}>
          Fare Breakup
        </span>
      </Tooltip>
    </div>
                    
                    {/* <div className="font-size14 text-end position-relative">
                      
                      <span style={{ color: "var(--PrimaryColor)" }}>
                        Fare Breakup
                      </span>
                      <div className="position-absolute text-light p-2 rounded bg-dark">
                        <ul>
                          <li>
                            <span>Base Fare</span>
                            <span>2084</span>
                          </li>
                          <li>
                            <span>State TAX</span>
                            <span>250</span>
                          </li>
                          <li>
                            <span>Toll Charges</span>
                            <span>210</span>
                          </li>
                          <li>
                            <span>Taxes & Fees</span>
                            <span>223</span>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarBooking;
