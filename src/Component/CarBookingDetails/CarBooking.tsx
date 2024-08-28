import React,{useState} from "react";
import "./CarBooking.css";
import carIcon from "../../Assets/Car_icon.svg";
import Footer from "../Footer/Footer";
import {  Tooltip, TimePicker } from "antd";
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

// Icons Start
import {
  FaArrowRightArrowLeft,
  FaCheck,
  FaCircleCheck,
} from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TbClockX } from "react-icons/tb";
import { FaGasPump, FaRegSnowflake, FaTv, FaMusic } from "react-icons/fa";
import { BiSolidCarGarage } from "react-icons/bi";
import { GiCharging, GiCarDoor } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
// Icons End

const CarBooking: React.FC = () => {
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
  const descriptionItems = car.description.split('|');
  const iconMap: { [key: string]: JSX.Element } = {
    AC: <FaRegSnowflake key="ac" />,
    Charger: <GiCharging key="charger" />,
    Music: <FaMusic key="music" />,
    Carrier: <BiSolidCarGarage key="carrier" />,
    TV: <FaTv key="tv" /> 
  };
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);

  const totalSeats = parseInt(car.seats.split('+')[0]);

  const maxAdults = parseInt(car.seats.split('+')[0]);

  const handleAdultChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAdults = parseInt(event.target.value);
    setAdultCount(selectedAdults);

    const maxChildren = totalSeats - selectedAdults;
    setChildCount(Math.min(childCount, maxChildren)); 
  };

  const handleChildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChildCount(parseInt(event.target.value));
  };

  const adultOptions = Array.from({ length: maxAdults + 1 }, (_, i) => i);
  const maxChildren = totalSeats - adultCount;
  const childOptions = Array.from({ length: maxChildren + 1 }, (_, i) => i);
  const isChildDropdownEnabled = adultCount > 0;

  const [selectedArrival, setSelectedArrival] = useState<string>("");
  const [arrivalDetails, setArrivalDetails] = useState({ placeholder: "Choose arrival via", label: "Arrival Details" });

  const [selectedDeparture, setSelectedDeparture] = useState<string>("");
  const [departureDetails, setDepartureDetails] = useState({ placeholder: "Choose departure via", label: "Departure Details" });

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [client_name, setClientName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [alternativeContactNumber, setAlternativeContactNumber] = useState<string>("");

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^0-9]/g, "");
    setter(filteredValue);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setClientName(filteredValue);
  };

  
  const getDetailsForSelection = (selection: string) => {
    switch (selection) {
      case "Flight":
        return { placeholder: "Enter flight details", label: "Flight Details" };
      case "Bus":
        return { placeholder: "Enter bus details", label: "Bus Details" };
      case "Train":
        return { placeholder: "Enter train details", label: "Train Details" };
      case "Residency":
        return { placeholder: "Enter residency details", label: "Residency Details" };
      default:
        return { placeholder: "Choose via", label: "" };
    }
  };

  const handleChange = (type: "arrival" | "departure", event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const details = getDetailsForSelection(value);

    if (type === "arrival") {
      setSelectedArrival(value);
      setArrivalDetails(details);
    } else if (type === "departure") {
      setSelectedDeparture(value);
      setDepartureDetails(details);
    }
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
            { startcity.city}
            {endcity ? <FaArrowRightArrowLeft /> : null}
            {/* <span>Puducherry, India</span> */}
           {endcity ? endcity.city : null} 
          </div>
          <div
            className="d-flex column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          >
            {/* <span>Round Trip</span>| */}
            <span>Pickup : 
              {/* Thu, 15 Feb 24, 12:55 PM */}
              { startdate}
              </span>
              {enddate?(<> <span>
               |  Drop : {/*Sat, 17 Feb 24, 10:55 AM */}
                { enddate}
                </span></>):null}
            
          </div>
        </div>
      </div>

      <div className="container">
        <div className="px-lg-5 row">
          <div className="py-4 py-lg-5 col-lg-8 d-flex flex-column gap-4">
            <div className="sideBars bg-light d-flex justify-content-between">
              <div className="col-lg-3 d-flex">
                <div className="carIcon d-flex align-items-center justify-content-center">
                  <img style={{objectFit: "contain"}} src={carImage} alt="caricon" />
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
                          {/* ₹10.8/km after 755 kms */}
                          ₹ {car.extra_km_fare} /km after  {" "}
                           {car.extra_duration_fare ? car.extra_duration_fare: car.km}
                           {" "}km
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
                          {/* <FaRegSnowflake />
                          <GiCharging />
                          <FaTv /> */}

                          <b>
                          {descriptionItems.map((item: string) => (
          iconMap[item] 
        ))}
      </b>

                     {/* {car.description} */}
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
                    <div className="custom-list-style">{parse (car.inclusion)}</div>
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
                <div className="custom-list-style">{parse (car.exclusion)}</div>

                </div>
                
                
              </div>
            </div>

            <div className="sideBars bg-light p-3">
              <div className="h5 mb-3">Trip details</div>
              <form>
                {/* <div className="mb-3 d-flex justify-content-between">
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
                </div> */}
                {/* <div className="">
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
                </div> */}
                <hr />
                <div className="row">
                  <div className="h5 mb-3">Confirm Traveller's information</div>
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <label
                        htmlFor="client_name"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>Primary Traveller Name</span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="client_name"
                        placeholder="Enter your full name"
                        value={client_name}
        onChange={handleNameChange}
                        required
                      />
                    </div>

                    {/* <div className="mb-2">
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
                    </div> */}
                    <div className="mb-2">
          <label htmlFor="adultCount" className="font-size14">
            <span style={{ fontWeight: "600" }}>Adult</span>
          </label>
          <select
            className="form-control px-3 py-2"
            id="adultCount"
            value={adultCount}
            onChange={handleAdultChange}
            required
          >
            {adultOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
                      <label
                        htmlFor="alternativeContactNumber"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>
                          Alternative Contact Number
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="alternativeContactNumber"
                        placeholder="Enter 10 digit Mobile Number"
                        value={alternativeContactNumber}
                        onChange={handleInputChange(setAlternativeContactNumber)}
                        maxLength={10} 
                        required
                      />
                    </div>
        
        <div className="mb-2">
                    <label className="font-size14">
                      <span style={{ fontWeight: "600" }}>Arrival Via</span>
                    </label>
                    <select
          className="form-control px-3 py-2"
          id="arrivalvia"
          value={selectedArrival}
          onChange={(e) => handleChange("arrival", e)}
          required
        >
          <option value="" disabled>Select Arrival Via</option>
          <option value="Flight">Flight</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Residency">Residency</option>
        </select>
                  </div>

                  <div className="mb-2">
                    <label className="font-size14">
                      <span style={{ fontWeight: "600" }}>Departure Via</span>
                    </label>
                    <select
          className="form-control px-3 py-2"
          id="departurevia"
          value={selectedDeparture}
          onChange={(e) => handleChange("departure", e)}
          required
        >
          <option value="" disabled>Select Departure Via</option>
          <option value="Flight">Flight</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Residency">Residency</option>
        </select>
                  </div>


                  </div>
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <label
                        htmlFor="contactNumber"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>
                          Contact Number
                        </span>
                      </label>
                      <input 
                       type="text"
                       className="form-control px-3 py-2"
                       id="contactNumber"
                       placeholder="Enter 10 digit Mobile Number"
                       value={contactNumber}
                       onChange={handleInputChange(setContactNumber)}
                       maxLength={10} 
                       required
                      />
                    </div>
                   
                    <div className="mb-2">
          <label htmlFor="childCount" className="font-size14">
            <span style={{ fontWeight: "600" }}>Child</span>
          </label>
          <select
            className="form-control px-3 py-2"
            id="childCount"
            value={childCount}
            onChange={handleChildChange}
            disabled={!isChildDropdownEnabled}
            required
          >
            {isChildDropdownEnabled ? (
              childOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))
            ) : (
              <option value="">Select Adult First</option>
            )}
          </select>
        </div>
        
        <div className="mb-2">
  <label htmlFor="pickup_time" className="font-size14">
    <span style={{ fontWeight: "600" }}>Pick-up Time</span>
  </label>
  <TimePicker
    className="form-control px-3 py-2"
    id="pickup_time"
    placeholder="Enter pick-up time"
    format="h:mm A"
    use12Hours
    required
  />
</div>
                    

        {/* <div className="mb-2">
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
                  </div> */}
                   
                   <div className="mb-2 mt-3">
          <label className="font-size14">
            <span style={{ fontWeight: "600" }}>{arrivalDetails.label}</span>
          </label>
          <input
            type="text"
            className="form-control px-3 py-2"
            placeholder={arrivalDetails.placeholder}
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            readOnly={!selectedArrival}
          />
        </div>

        <div className="mb-2 mt-3">
          <label className="font-size14">
            <span style={{ fontWeight: "600" }}>{departureDetails.label}</span>
          </label>
          <input
            type="text"
            className="form-control px-3 py-2"
            placeholder={departureDetails.placeholder}
            value={dropAddress}
            onChange={(e) => setDropAddress(e.target.value)}
            readOnly={!selectedDeparture}
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
                <span className="font-size11" >
                  {/* <div dangerouslySetInnerHTML={{ __html: car.cancel_policy }} /> */}
                  Free Cancellation before 
                  { startdate}
                  {/* 19 Feb 2024, 10:45 AM IST */}
                </span>
                <span style={{ color: "var(--PrimaryColor)" }}>
                <Tooltip
        title={
          <div className="">
            <div dangerouslySetInnerHTML={{ __html: car.cancel_policy }} />
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
                          {/* 7,109 */}
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
                        ₹ 
                        {/* 10,054 */}
                        {car.total_price}
                      </div>
                      <div className="font-size25 fontWeight500 fontInter">
                        {/* ₹ 1,150 */}
                        ₹  {car.total_price}
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
                <span>Base Fare: </span>
                <span>
                  {/* 2084 */}
                  {car.basic_rate}
                  </span>
              </li>
              {/* <li>
                <span>State TAX</span>
                <span>250</span>
              </li>
              <li>
                <span>Toll Charges</span>
                <span>210</span>
              </li> */}
              <li>
                <span>Taxes & Fees: </span>
                <span>
                  {/* 223 */}
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
