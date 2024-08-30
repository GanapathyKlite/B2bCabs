import React from "react";
import "./CarBooking.css";
import Footer from "../Footer/Footer";
import { Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { Modal } from "antd";

// Icons Start
import { FaArrowRightArrowLeft, FaCheck, FaCircleCheck } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TbClockX } from "react-icons/tb";
import {
  IoMdArrowRoundForward,
  IoIosArrowForward,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { SiRazorpay } from "react-icons/si";
import { BsCcCircleFill } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { FaGasPump, FaRegSnowflake, FaTv, FaMusic } from "react-icons/fa";
import { BiSolidCarGarage } from "react-icons/bi";
import { GiCharging } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { BsCurrencyRupee, BsExclamationCircle } from "react-icons/bs";
// Icons End

// mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const paymentOptions = [
  {
    paymentType: "Wallet",
    paymentIcon: <GiWallet />,
  },
  {
    paymentType: "Razorpay",
    paymentIcon: <SiRazorpay />,
  },
  {
    paymentType: "CCAvenue",
    paymentIcon: <BsCcCircleFill />,
  },
];

const CarBooking: React.FC = () => {
  const [paymentModalBoxOpen, setPaymentModalBoxOpen] =
    React.useState<boolean>(false);
  const [modalBoxLoading, setModalBoxLoading] = React.useState<boolean>(true);

  const showModalBox = () => {
    setPaymentModalBoxOpen(true);
    setModalBoxLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setModalBoxLoading(false);
    }, 20);
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  const location = useLocation();
  const car = location.state.car;
  const startcity = location.state.startcity;
  const endcity = location.state.endcity;
  const startdate = location.state.startdate;
  const enddate = location.state.enddate;
  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
  const carImage = `${imageURL}${car.image}`;
  console.log("amenities", car.description);

  const handleOpenTerms = (): void => {
    const newWindow: Window | null = window.open("", "_blank");

    if (newWindow) {
      newWindow.document.write(`<html>
        <head>
          <title>Terms and Conditions</title>
          <style>
            body {
              margin: 20px;
              padding: 0;
              color: #333;
              background-color: #f4f4f4;
              font-family: "Poppins", sans-serif
            }
            h1 {
              background-color: #089848;
              color: white;
              padding: 10px;
              text-align: center;
              margin: 0;
            }
            ul {
              margin: 0;
              padding-left: 20px;
            }
            li {
              margin-bottom: 10px;
            }
             pre {
              background-color: #fff;
              border: 1px solid #ddd;
              padding: 10px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              white-space: pre-wrap; /* Allows text to wrap */
              max-width: 100vw;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
        <h1 >Terms & Conditions</h1>
        <pre>${car.terms_condition}</pre></body></html>`);
      newWindow.document.close();
    }
  };
  const descriptionItems = car.description.split("|");
  const iconMap: { [key: string]: JSX.Element } = {
    AC: <FaRegSnowflake key="ac" />,
    Charger: <GiCharging key="charger" />,
    Music: <FaMusic key="music" />,
    Carrier: <BiSolidCarGarage key="carrier" />,
    TV: <FaTv key="tv" />,
  };
  return (
    <>
      <div className="w-100 ReviewBookingBar">
        <div className="container text-light py-3 px-2 d-flex flex-column gap-2">
          <div className="titleReviewBooking">Review Booking</div>
          <div
            className="d-flex align-items-center column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          >
            {/* <span>Bangalore</span> */}
            {startcity.city}
            {endcity ? <FaArrowRightArrowLeft /> : null}
            {/* <span>Puducherry, India</span> */}
            {endcity ? endcity.city : null}
          </div>
          <div
            className="d-flex column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          >
            {/* <span>Round Trip</span>| */}
            <span>
              Pickup :{/* Thu, 15 Feb 24, 12:55 PM */}
              {startdate}
            </span>
            {enddate ? (
              <>
                <span>
                  | Drop : {/*Sat, 17 Feb 24, 10:55 AM */}
                  {enddate}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="px-lg-5 row">
          <div className="py-4 py-lg-5 col-lg-8 d-flex flex-column gap-4">
            <div className="sideBars bg-light d-flex justify-content-between">
              <div className="col-lg-3 d-flex">
                <div className="carIcon d-flex align-items-center justify-content-center">
                  <img
                    style={{ objectFit: "contain" }}
                    src={carImage}
                    alt="caricon"
                  />
                </div>
              </div>
              <div className="col-lg-8 d-flex">
                <div className="d-flex gap-2 flex-column w-100">
                  <div className="d-inline-flex align-items-center gap-1">
                    <span className="carName">
                      <b>
                        {/* Dzire, Etios */}
                        {car.vehicle_name}
                      </b>
                    </span>
                    <span className="similarCarName">or similar</span>
                  </div>
                  <div className="d-inline-flex">
                    <span className="d-flex gap-2" style={{ fontSize: "14px" }}>
                      {/* <li>
                        Sedan
                        {car.vehicle_name}
                        </li> */}
                      {/* <li>AC</li> */}
                      <li>{car.seats} Seats</li>
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
                          {/* ₹10.8/km after 755 kms */}₹ {car.extra_km_fare}{" "}
                          /km after{" "}
                          {car.extra_duration_fare
                            ? car.extra_duration_fare
                            : car.km}{" "}
                          km
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
                          {descriptionItems.map(
                            (item: string) =>
                              iconMap[item] || <span key={item}>{item}</span>
                          )}
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
                  {/* <div>
                    <GoDotFill style={{ fontSize: "11px" }} /> 750 Kms
                  </div>
                  <div>
                    <GoDotFill style={{ fontSize: "11px" }} /> Driver Allowance
                  </div> */}
                  <div className="custom-list-style">
                    {parse(car.inclusion)}
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
                {/* <div className="font-size14 d-flex flex-column gap-3">
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
                </div> */}
                <div className="font-size14 d-flex flex-column gap-3">
                  <div className="custom-list-style">
                    {parse(car.exclusion)}
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
                  <span
                    style={{ color: "var(--PrimaryColor)", cursor: "pointer" }}
                    onClick={handleOpenTerms}
                  >
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
                  {/* <div dangerouslySetInnerHTML={{ __html: car.cancel_policy }} /> */}
                  Free Cancellation before
                  {startdate}
                  {/* 19 Feb 2024, 10:45 AM IST */}
                </span>
                <span style={{ color: "var(--PrimaryColor)" }}>
                  <Tooltip
                    title={
                      <div className="">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: car.cancel_policy,
                          }}
                        />
                      </div>
                    }
                    trigger="hover"
                    arrowPointAtCenter
                  >
                    <span style={{ color: "var(--PrimaryColor)" }}>
                      <BsExclamationCircle />
                    </span>
                  </Tooltip>
                </span>
              </div>

              <div className="payment sideBars">
                <button
                  className="primaryBtn mb-3 w-100"
                  onClick={showModalBox}
                >
                  Pay Now
                </button>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          // className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="paymentOption1"
                          value="paymentOption1"
                          checked
                        />
                        <label htmlFor="paymentOption1">
                          <div className="font-size14">
                            Make part payment now
                          </div>
                          <div className="font-size12">
                            Pay the rest to the driver
                          </div>
                        </label>
                      </div>
                      <div style={{ fontFamily: "Inter !important" }}>
                        <b>
                          <BsCurrencyRupee /> 1,450
                        </b>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="exampleRadios"
                          id="paymentOption2"
                          value="paymentOption2"
                        />
                        <label htmlFor="paymentOption2">
                          <div className="font-size14">
                            Make full payment now
                          </div>
                        </label>
                      </div>
                      <div>
                        <b>
                          <BsCurrencyRupee />
                          {car.total_price}
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
                      {/* <p className="text-danger m-0 text-end">13% off</p> */}
                    </div>
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="strikeDiagonal font-size12 text-secondary d-flex justify-content-center align-items-center fontInter">
                        <BsCurrencyRupee />
                        {car.total_price}
                      </div>
                      <div className="font-size25 fontWeight500 fontInter">
                        <BsCurrencyRupee />
                        {car.total_price}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Tooltip
                        title={
                          <div className="">
                            <ul className="m-0 p-0">
                              <li>
                                <span>Base Fare: </span>
                                <span>
                                  {car.basic_rate}
                                </span>
                              </li>
                              <li>
                                <span>Taxes & Fees: </span>
                                <span>
                                  {car.tax_amount}
                                </span>
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
                      </Tooltip> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={<p className="m-0">Select Payment Mode</p>}
        footer={null}
        loading={modalBoxLoading}
        className="selectPaymentMode col-12 col-md-6"
        // style={{ minWidth: "350", maxWidth: "550px" }}
        open={paymentModalBoxOpen}
        onCancel={() => setPaymentModalBoxOpen(false)}
      >
        <div className="paymentDetailsDiv">
          <div className="paymentDetails">
            <Accordion className="bg-transparent shadow-none w-100 flex-column">
              <AccordionSummary
                expandIcon={<IoIosArrowDropdownCircle />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="p-0 m-0 dashBoardNavBarTitle w-100"
              >
                <div className="dueAmountNowDiv">
                  <div>Due Now</div>
                  <div className="dueAmount">
                    <BsCurrencyRupee />
                    1,857
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails className="dueAmountFareBarkUp">
                <ul className="m-0 px-2 pt-2">
                  <li>
                    <span>
                      <span></span>
                      <span>Base Fare:</span>
                    </span>
                    <span className="amount">{car.basic_rate}</span>
                  </li>
                  <li>
                    <span>
                      <span></span>
                      <span>Taxes & Fees:</span>
                    </span>
                    <span className="amount">{car.tax_amount}</span>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="travelTypeDiv">
            <hr />
            <div className="travelType">Trip Type: Airport Transfers</div>
          </div>
          <div className="carBookingAddressDetailsDiv">
            <div className="carBookingAddressDetails">
              <p>
                No: 19, New Street, Rangavilas Thottam, Muthiyalpet,
                Puducherry-605003
              </p>
              <IoMdArrowRoundForward />
              <p>Chennai International Airport </p>
            </div>
            <div className="pickTimeDetails">
              Pickup on: Thu, 7 Dec 23 | 10:00 AM
            </div>
          </div>
        </div>

        <div className="paymentOption">
          <p>Pay Options</p>
          <div className="paymentOptionType">
            <ul>
              {paymentOptions.map((paymentOption, index) => (
                <li key={index}>
                  <button className="paymentOptionBtn">
                    <span>
                      {paymentOption.paymentIcon}
                      {paymentOption.paymentType}
                    </span>
                  </button>

                  <IoIosArrowForward />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default CarBooking;
