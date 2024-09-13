import React, { useState, useRef, useEffect } from "react";
import "./CarBooking.css";
import Footer from "../Footer/Footer";
import { useAuth } from "../Auth/AuthContext";
import { Tooltip, TimePicker } from "antd";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { Modal } from "antd";
import axios from "axios";
import { AxiosError } from "axios";
import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";

// Icons Start
import { FaArrowRightArrowLeft, FaCheck, FaCircleCheck } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
// import { TbClockX } from "react-icons/tb";
import {
  IoMdArrowRoundForward,
  IoIosArrowForward,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { SiRazorpay } from "react-icons/si";
import { BsCcCircleFill } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { FaRegSnowflake, FaTv, FaMusic } from "react-icons/fa";
import { BiSolidCarGarage } from "react-icons/bi";
import { GiCharging } from "react-icons/gi";
import dayjs, { Dayjs } from "dayjs";
import { IoClose } from "react-icons/io5";
import { BsCurrencyRupee, BsExclamationCircle } from "react-icons/bs";
// Icons End

// mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
  types: [
    {
      type: "success",
      className: "custom-success-notification",
    },
    {
      type: "error",
      className: "custom-error-notification",
    },
  ],
});

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
  const { authToken, userData, setUserData } = useAuth();
  const [paymentModalBoxOpen, setPaymentModalBoxOpen] =
    React.useState<boolean>(false);
  const [walletModalBoxOpen, setwalletModalBoxOpen] =
    React.useState<boolean>(false);
  const [modalBoxLoading, setModalBoxLoading] = React.useState<boolean>(true);
  const [holidaystartcityid, setholidaystartcityid] = useState("");
  const [holidayendcityid, setholidayendcityid] = useState("");
  const [Razorpay] = useRazorpay();
  const modalBoxInputRef = useRef<HTMLInputElement>(null);
  const [walletcash, setwalletcash] = useState(userData.currentBalance);

  const showModalBox = () => {
    setPaymentModalBoxOpen(true);
    setModalBoxLoading(true);

    setTimeout(() => {
      setModalBoxLoading(false);
    }, 20);
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  useEffect(() => {
    const storedholidaystartCity = sessionStorage.getItem("holidaystartCity");
    const storedholidayendCity = sessionStorage.getItem("holidayendCity");
    if (storedholidaystartCity) {
      const suggestionObject = JSON.parse(storedholidaystartCity);
      setholidaystartcityid(suggestionObject.id_city);
    }
    if (storedholidayendCity) {
      const suggestionObject = JSON.parse(storedholidayendCity);
      setholidayendcityid(suggestionObject.id_city);
    }
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.car) {
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  const car = location.state?.car;

  if (!car) {
    return null;
  }
  const startcity = location.state.startcity;
  const endcity = location.state.endcity;
  const startdate = location.state.startdate;
  const enddate = location.state.enddate;
  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
  const carImage = `${imageURL}${car.image}`;
  const tripType = location.state.tripType;
  const seats = location.state.seats;
  const packageId = location.state.packageId;
  const hourTime = location.state.hour_rental_type;

  const formattedDate = dayjs(startdate, "DD-MM-YYYY").format(
    "ddd, DD MMM YYYY"
  );

  const handleOpenTerms = (): void => {
    const newWindow: Window | null = window.open("", "_blank");

    if (newWindow) {
      newWindow.document.write(`<html>
        <head>
          <title>Terms and Conditions</title>
           <link rel="icon" type="image/svg+xml" href="/favicon.png" />
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
              font-family: "Poppins", sans-serif !important;
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
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);

  const totalSeats = seats
    ? parseInt(seats.split("+")[0])
    : parseInt(car.seats?.split("+")[0]);

  const maxAdults = seats
    ? parseInt(seats.split("+")[0])
    : parseInt(car.seats?.split("+")[0]);

  const handleAdultChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAdults = parseInt(event.target.value);
    setAdultCount(selectedAdults);

    const maxChildren = totalSeats - selectedAdults;
    setChildCount(Math.min(childCount, maxChildren));

    setError((prevErrors) => ({
      ...prevErrors,
      adultCount: selectedAdults > 0 ? "" : prevErrors.adultCount,
    }));
  };

  const handleChildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChildCount(parseInt(event.target.value));
  };

  const adultOptions = Array.from({ length: maxAdults + 1 }, (_, i) => i);
  const maxChildren = totalSeats - adultCount;
  const childOptions = Array.from({ length: maxChildren + 1 }, (_, i) => i);
  const isChildDropdownEnabled = adultCount > 0;

  const [selectedArrival, setSelectedArrival] = useState<string>("");
  const [arrivalDetails, setArrivalDetails] = useState({
    placeholder: "Choose arrival via",
    label: "Arrival Details",
  });

  const [selectedDeparture, setSelectedDeparture] = useState<string>("");
  const [departureDetails, setDepartureDetails] = useState({
    placeholder: "Choose departure via",
    label: "Departure Details",
  });

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [client_name, setClientName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [contactNoCountryCode, setContactNoCountryCode] = useState("+91");
  const [alternativeContactNumber, setAlternativeContactNumber] =
    useState<string>("");
  const [alternateNoCountryCode, setAlternateNoCountryCode] = useState("+91");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [pickupTime, setPickupTime] = useState<Dayjs | null>(null);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [vehicleType, setVehicleType] = useState("");

  const [selectedOption, setSelectedOption] = useState("paymentOption2");
  const [totalamount, settotalamount] = useState("");
  const [addCashModalBox, setAddCashModalBox] = useState(false);
  const [addamount, setaddAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("razorpay");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addCashModalBoxOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setAddCashModalBox(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const validateForm = () => {
    const newError: { [key: string]: string } = {};

    const isNameValid = client_name.trim() !== "";
    const isContactValid = contactNumber.length > 9;
    // const isAlternateValid = AlternateNumber.length >9;
    const isAdultCountValid = adultCount > 0;
    const isArrivalViaValid = selectedArrival.trim() !== "";
    const isDepartureViaValid = selectedDeparture.trim() !== "";
    const isPickupTimeValid = pickupTime !== null;
    const isPickupAddressValid = pickupAddress !== "";
    const isDropAddressValid = dropAddress !== "";

    if (!isNameValid) {
      newError.clientName = "Name is required";
    }
    if (!isContactValid) {
      newError.contactNumber = "Contact Number must be 10 digits";
    }
    // if (!isAlternateValid) {
    //   newError.contactNumber = 'Alternate Number must be 10 digits';
    // }
    if (!isAdultCountValid) {
      newError.adultCount = "Adult count is required";
    }
    if (!isArrivalViaValid) {
      newError.arrivalVia = "Arrival Via is required";
    }
    if (!isDepartureViaValid) {
      newError.departureVia = "Departure Via is required";
    }
    if (!isPickupTimeValid) {
      newError.pickupTime = "Pick-up time is required";
    }
    if (!isPickupAddressValid) {
      newError.pickupAddress = "Pick-up address is required";
    }
    if (!isDropAddressValid) {
      newError.dropAddress = "Drop address is required";
    }
    if (!isAgreed) {
      newError.isAgreed = "You must agree to the terms to proceed";
    }

    setError(newError);
    setIsFormValid(Object.keys(newError).length === 0);
    return Object.keys(newError).length === 0;
  };

  const validateField = (field: string) => {
    const newError = { ...error };

    switch (field) {
      case "client_name":
        if (client_name.trim() === "") {
          newError.clientName = "Name is required";
        } else {
          delete newError.clientName;
        }
        break;

      case "contactNumber":
        if (contactNumber.length !== 10) {
          newError.contactNumber = "Contact Number must be 10 digits";
        } else {
          delete newError.contactNumber;
        }
        break;

      case "AlternateNumber":
        if (
          alternativeContactNumber.length > 0 &&
          alternativeContactNumber.length < 10
        ) {
          newError.alternativeContactNumber =
            "Alternate Number must be 10 digits";
        } else if (alternativeContactNumber === contactNumber) {
          newError.alternativeContactNumber =
            "Alternate Number cannot be the same as Contact Number";
        } else {
          delete newError.alternativeContactNumber;
        }
        break;

      case "adultCount":
        if (adultCount <= 0) {
          newError.adultCount = "Adult count is required";
        } else {
          delete newError.adultCount;
        }
        break;

      case "arrivalVia":
        if (selectedArrival.trim() === "") {
          newError.arrivalVia = "Arrival Via is required";
        } else {
          delete newError.arrivalVia;
        }
        break;

      case "departureVia":
        if (selectedDeparture.trim() === "") {
          newError.departureVia = "Departure Via is required";
        } else {
          delete newError.departureVia;
        }
        break;

      case "pickupTime":
        if (pickupTime === null) {
          newError.pickupTime = "Pick-up time is required";
        } else {
          delete newError.pickupTime;
        }
        break;

      case "pickupAddress":
        if (pickupAddress.trim() === "") {
          newError.pickupAddress = "Pick-up address is required";
        } else {
          delete newError.pickupAddress;
        }
        break;

      case "dropAddress":
        if (dropAddress.trim() === "") {
          newError.dropAddress = "Drop address is required";
        } else {
          delete newError.dropAddress;
        }
        break;

      case "isAgreed":
        if (!isAgreed) {
          newError.isAgreed = "You must agree to the terms to proceed";
        } else {
          delete newError.isAgreed;
        }
        break;

      default:
        break;
    }

    setError(newError); // Update the error state
  };

  const handleCancel = () => {
    setAddCashModalBox(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
    if (error.isAgreed) {
      setError((prev) => ({ ...prev, isAgreed: "" }));
    }
  };

  const handlePickupAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPickupAddress(value);

    setError((prevErrors) => ({
      ...prevErrors,
      pickupAddress: value.trim() ? "" : prevErrors.pickupAddress,
    }));
  };

  const handledropAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDropAddress(value);

    setError((prevErrors) => ({
      ...prevErrors,
      dropAddress: value.trim() ? "" : prevErrors.dropAddress,
    }));
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const filteredValue = value.replace(/[^0-9]/g, "");
      setter(filteredValue);

      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setClientName(filteredValue);
    if (client_name.trim() !== "") {
      setError((prev) => ({ ...prev, clientName: "" }));
    }
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
        return {
          placeholder: "Enter residency details",
          label: "Residency Details",
        };
      default:
        return { placeholder: "Choose via", label: "" };
    }
  };
  useEffect(() => {
    if (touched.pickupTime) {
      if (pickupTime === null) {
        setError((prev) => ({
          ...prev,
          pickupTime: "Pick-up time is required",
        }));
      } else {
        setError((prev) => {
          const { pickupTime, ...rest } = prev;
          return rest;
        });
      }
    }
  }, [pickupTime, touched.pickupTime]);

  useEffect(() => {
    if (car.vehicle_name == "Suv") {
      setVehicleType("1");
    } else if (car.vehicle_name == "Sedan") {
      setVehicleType("2");
    } else if (car.vehicle_name == "Large Coach") {
      setVehicleType("4");
    } else if (car.vehicle_name == "Hatchback") {
      setVehicleType("5");
    } else if (car.vehicle_name == "Mini Coach") {
      setVehicleType("6");
    } else if (car.vehicle_name == "Tempo Traveller") {
      setVehicleType("7");
    }
  }, []);

  const handleTimeChange = (time: Dayjs | null) => {
    setPickupTime(time);
  };

  const handleFocus = () => {
    setTouched((prev) => ({ ...prev, pickupTime: true }));
  };

  const handleChange = (
    type: "arrival" | "departure",
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const details = getDetailsForSelection(value);

    if (type === "arrival") {
      setSelectedArrival(value);
      setArrivalDetails(details);

      setError((prevErrors) => ({
        ...prevErrors,
        arrivalVia: value ? "" : prevErrors.arrivalVia,
      }));
    } else if (type === "departure") {
      setSelectedDeparture(value);
      setDepartureDetails(details);
    }
  };

  const handlePayNow = () => {
    setTouched(prev => ({ ...prev, pickupTime: true }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const isValid = validateForm();
    if (isValid) {
      showModalBox();
      
    }
  };

  const profileImage = `${imageURL}${userData.logo}`;

  const handlePayment = async (paymentType: string) => {
    if (paymentType === "Wallet") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/payment/wallet`,
          {
            amount: amount,
            is_recharge: false,
            agent_id: parseInt(userData.id ?? "0"),
            holiday_package_id: packageId ? parseInt(packageId) : 0,
            client_name: client_name,
            contact_no: contactNumber,
            contact_no_country_code: contactNoCountryCode,
            al_contact_no: alternativeContactNumber,
            al_contact_no_country_code: alternateNoCountryCode,
            package_type: tripType,
            arrival: car.start_city
              ? car.start_city.toString()
              : holidaystartcityid,
            arrival_via: selectedArrival,
            arrival_details: pickupAddress,
            departure: car.end_city
              ? car.end_city.toString()
              : holidayendcityid,
            departure_via: selectedDeparture,
            departure_details: dropAddress,
            vehicle_type: vehicleType,
            is_gst: car.tax_amount !== "0" ? true : false,
            no_of_adult: adultCount,
            no_of_kids: childCount,
            infant: 0,
            no_of_days: parseInt(car.no_of_days),
            start_date: startdate,
            end_date: enddate ? enddate : startdate,
            trip_date: { "1": startdate, "2": enddate ? enddate : startdate },
            start_city: {
              "1": car.itinerary ? car.itinerary[0].from_name : startcity.city,
              "2": car.itinerary
                ? car.itinerary[0].to_name
                : endcity?.city || "",
            },
            end_city: {
              "1": car.itinerary
                ? car.itinerary[0].to_name
                : endcity?.city || "",
              "2": car.itinerary ? car.itinerary[0].from_name : startcity.city,
            },
            itinerary: car.itinerary ? car.itinerary : "",
            payment_type: "Wallet",
            pickup_location: pickupAddress,
            drop_location: dropAddress,
            pickup_time: formattedPickupTime,
            hour_rental_type: hourTime ? hourTime : "0",
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200 && response.data.status) {
          notyf.success("Payment Successful");
          navigate("/dashboard");
          let sessionDataString = sessionStorage.getItem("userData");
          if (sessionDataString !== null) {
            let sessionData = JSON.parse(sessionDataString);
            sessionData.currentBalance = response.data.message.current_balance;
            sessionStorage.setItem("userData", JSON.stringify(sessionData));
            setUserData(sessionData);
          }
        }
      } catch (error) {
        notyf.error("Something went wrong");
        console.log(error);
      }
    } else if (paymentType === "Razorpay") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/razorpay/create/orderId`,
          {
            amount: amount,
            is_recharge: false,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200 && response.data.status) {
          const { orderId, receipt } = response.data.data;

          const options = {
            key: "rzp_test_FIbXKAkHk9VvXS",
            amount: amount.toString(),
            currency: "INR",
            name: "Klite cabs",
            description: "Credits towards consultation",
            image: profileImage,
            order_id: orderId,
            handler: async function (response: any) {
              let razorpay_order_id = response.razorpay_order_id;
              let razorpay_signature = response.razorpay_signature;
              let razorpay_payment_id = response.razorpay_payment_id;

              try {
                const response = await axios.post(
                  `${
                    import.meta.env.VITE_API_BASE_URL
                  }/razorpay/capture-payment`,
                  {
                    receipt: receipt,
                    amount: amount,
                    is_recharge: false,
                    razorpay_order_id: razorpay_order_id,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,

                    agent_id: parseInt(userData.id ?? "0"),
                    holiday_package_id: packageId ? parseInt(packageId) : 0,
                    client_name: client_name,
                    contact_no: contactNumber,
                    contact_no_country_code: contactNoCountryCode,
                    al_contact_no: alternativeContactNumber,
                    al_contact_no_country_code: alternateNoCountryCode,
                    package_type: tripType,
                    arrival: car.start_city
                      ? car.start_city.toString()
                      : holidaystartcityid,
                    arrival_via: selectedArrival,
                    arrival_details: pickupAddress,
                    departure: car.end_city
                      ? car.end_city.toString()
                      : holidayendcityid,
                    departure_via: selectedDeparture,
                    departure_details: dropAddress,
                    vehicle_type: vehicleType,
                    is_gst: car.tax_amount !== "0" ? true : false,
                    no_of_adult: adultCount,
                    no_of_kids: childCount,
                    infant: 0,
                    no_of_days: parseInt(car.no_of_days),
                    start_date: startdate,
                    end_date: enddate ? enddate : startdate,
                    trip_date: {
                      "1": startdate,
                      "2": enddate ? enddate : startdate,
                    },
                    start_city: {
                      "1": car.itinerary
                        ? car.itinerary[0].from_name
                        : startcity.city,
                      "2": car.itinerary
                        ? car.itinerary[0].to_name
                        : endcity?.city || "",
                    },
                    end_city: {
                      "1": car.itinerary
                        ? car.itinerary[0].to_name
                        : endcity?.city || "",
                      "2": car.itinerary
                        ? car.itinerary[0].from_name
                        : startcity.city,
                    },
                    itinerary: car.itinerary ? car.itinerary : "",
                    payment_type: "Wallet",
                    pickup_location: pickupAddress,
                    drop_location: dropAddress,
                    pickup_time: formattedPickupTime,
                    hour_rental_type: hourTime ? hourTime : "0",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                if (response.status === 200 && response.data.status) {
                  notyf.success("Payment Successful");
                  navigate("/dashboard");
                }
              } catch (error) {
                notyf.error("Something went wrong");
                console.log(error, "error");
              }
            },
            prefill: {
              name: userData.name || "",
              email: userData.email || "",
              contact: userData.mobile || "",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new Razorpay(options);

          rzp1.on("payment.failed", function (response: any) {
            console.log(response.error.reason);

            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
          });

          rzp1.open();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          notyf.error("Network error");
        }
        console.log(error, "error");
      }
    } else if (paymentType === "CCAvenue") {
      console.log("cc avenue payment");
    }
  };

  const formattedPickupTime = pickupTime?.format("h:mm A");
  const amount = totalamount
    ? parseFloat(totalamount.replace(/,/g, ""))
    : parseFloat(car.total_price.replace(/,/g, ""));

  const handleWalletclick = () => {
    setwalletModalBoxOpen(true);
    setPaymentModalBoxOpen(false);
  };

  const handleAddCash = () => {
    // setShowOffcanvas(false);
    setAddCashModalBox(true);
  };

  const handleaddPayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (selectedPaymentMethod === "razorpay") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/razorpay/create/orderId`,
          {
            amount: addamount,
            is_recharge: true,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200 && response.data.status) {
          const { orderId, receipt } = response.data.data;

          const options = {
            key: "rzp_test_FIbXKAkHk9VvXS",
            amount: addamount,
            currency: "INR",
            name: "Klite cabs",
            description: "Credits towards consultation",
            image: profileImage,
            order_id: orderId,
            handler: async function (response: any) {
              let razorpay_order_id = response.razorpay_order_id;
              let razorpay_signature = response.razorpay_signature;
              let razorpay_payment_id = response.razorpay_payment_id;

              try {
                setLoading(false);
                setAddCashModalBox(false);

                const response = await axios.post(
                  `${
                    import.meta.env.VITE_API_BASE_URL
                  }/razorpay/capture-payment`,
                  {
                    receipt: receipt,
                    amount: addamount,
                    is_recharge: true,
                    razorpay_order_id: razorpay_order_id,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    agent_id: userData.id,
                    payment_type: "Razorpay",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                if (response.status === 200 && response.data.status) {
                  notyf.success("Amount added to Wallet successfully");
                  setwalletcash(response.data.message.CurrentBalance);
                  let sessionDataString = sessionStorage.getItem("userData");
                  if (sessionDataString !== null) {
                    let sessionData = JSON.parse(sessionDataString);
                    sessionData.currentBalance =
                      response.data.message.CurrentBalance;
                    sessionStorage.setItem(
                      "userData",
                      JSON.stringify(sessionData)
                    );
                    setUserData(sessionData);
                  }
                }
              } catch (error) {
                setLoading(false);
                setAddCashModalBox(false);
                console.log(error, "error");
              }
            },
            prefill: {
              name: userData.name || "",
              email: userData.email || "",
              contact: userData.mobile || "",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new Razorpay(options);

          rzp1.on("payment.failed", function (response: any) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
          });

          rzp1.open();
        }
      } catch (error) {
        setLoading(false);
        setAddCashModalBox(false);
        if (error instanceof AxiosError) {
          notyf.error(
            error.response?.data?.message?.error?.description || "Network error"
          );
        }
        console.log(error, "error");
      }
    } else if (selectedPaymentMethod === "ccavenue") {
    }
    setLoading(false);
    setAddCashModalBox(false);
  };

  const disabledTime = () => {
    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();

    return {
      disabledHours: () => Array.from({ length: currentHour + 1 }, (_, i) => i),
      disabledMinutes: (hour: number) => {
        if (hour === currentHour + 1) {
          return Array.from({ length: currentMinute + 1 }, (_, i) => i);
        }
        return [];
      },
      disabledSeconds: () => [],
    };
  };
  return (
    <>
      <div className="w-100 ReviewBookingBar">
        <div className="container text-light py-3 px-2 d-flex flex-column gap-2">
          <div className="titleReviewBooking">
            {/* Review Booking  */}
            {tripType}{" "}
          </div>
          <div
            className="d-flex align-items-center column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          >
            {/* <span>Bangalore</span> */}
            {car.route ? car.route : null}
            {startcity?.city}
            {endcity ? <FaArrowRightArrowLeft /> : null}
            {/* <span>Puducherry, India</span> */}
            {endcity ? endcity.city : null}

            <span>| Pickup : {startdate}</span>
            {enddate ? (
              <>
                <span>| Drop : {enddate}</span>
              </>
            ) : null}
          </div>
          <div
            className="d-flex column-gap-3 font-size14"
            style={{ fontWeight: "var(--font300)" }}
          ></div>
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
                  </div>
                  <div className="d-inline-flex">
                    <span className="similarCarName">or similar</span>
                    {/* <span className="d-flex gap-2" style={{ fontSize: "14px" }}> */}
                    {/* <li>
                        Sedan
                        {car.vehicle_name}
                        </li> */}
                    {/* <li>AC</li> */}
                    {/* <li>{seats ? seats : car.seats} Seats</li> */}
                    {/* </span> */}
                  </div>
                  <div className="d-flex gap-2 flex-column w-100">
                    {/* <p className="m-0">
                      <b>Spacious Car</b>
                    </p> */}
                    {car.extra_km_fare !== undefined ? (
                      <>
                        <div className="d-flex">
                          <div className="text-primary pe-3">
                            <GrMapLocation />
                          </div>
                          <div className="d-flex font-size14 w-100">
                            <div className="col-lg-4">Extra km fare </div>
                            <div className="col-lg-8 fontInter">
                              ₹ {car.extra_km_fare} /km after{" "}
                              {car.extra_duration_fare
                                ? car.extra_duration_fare
                                : car.km}
                              km
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {/* <div className="d-flex font-size14">
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
                    </div> */}

                    {/* <div className="d-flex align-items-center w-100"> */}
                    {/* <div className="text-primary pe-3">
                        <FaGasPump />
                      </div> */}
                    <div className="d-flex font-size14 w-100">
                      {/* <div className="col-lg-4 font-size14">Amenities</div> */}
                      {/* <div className="d-flex col-lg-8 text-primary gap-3 align-items-center"> */}

                      {/* <b>
                          {descriptionItems.map((item: string) => (
          iconMap[item] 
        ))}
      </b> */}

                      {car.description}

                      {/* </div> */}
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="sideBars bg-light">
              <div className="h5">Driver & Cab details</div>
              <div className="font-size14">
                Cab and driver details will be shared up to 30 mins prior to
                departure.
              </div>
            </div> */}

            {car.itinerary ? (
              <>
                <div className="sideBars d-flex bg-light">
                  <div className="left_side d-flex gap-3 flex-column">
                    <div className="h5">Itinerary</div>
                    <div className="font-size14">
                      Day Wise Details of your package
                    </div>
                    <div>
                      {car.itinerary.map((item: any, index: number) => (
                        <>
                          <Accordion
                            key={index}
                            defaultExpanded={index === 0}
                            disableGutters
                            sx={{
                              marginBottom: 0, // Remove margin
                              padding: 0, // Remove padding
                              boxShadow: "none",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index}-content`}
                              id={`panel${index}-header`}
                              sx={{ backgroundColor: "lightgrey" }}
                            >
                              <Typography variant="subtitle1">
                                {item.from_name} - {item.to_name}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{
                                    width: "40%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRight: "1px solid black",
                                  }}
                                >
                                  <Typography variant="body1">
                                    <strong>{item.day}</strong>
                                  </Typography>
                                  <Typography variant="body1">
                                    <strong>{item.duration}</strong>
                                  </Typography>
                                </div>
                                <div style={{ width: "60%", padding: "10px" }}>
                                  <Typography variant="body1">
                                    {item.itinerary}
                                  </Typography>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}

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

              <hr />
              <form ref={formRef}>
                <div className="row">
                  <div className="h5 mb-3">Confirm Traveller's information</div>
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <label htmlFor="client_name" className="font-size14">
                        <span style={{ fontWeight: "600" }}>
                          Primary Traveller Name
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        id="client_name"
                        placeholder="Enter your full name"
                        value={client_name}
                        onChange={handleNameChange}
                        onBlur={() => validateField("client_name")}
                        required
                      />
                      {error.clientName && (
                        <div className="text-danger mt-2">
                          {error.clientName}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label htmlFor="adultCount" className="font-size14">
                        <span style={{ fontWeight: "600" }}>Adult</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          className="form-control px-3 py-2"
                          id="adultCount"
                          value={adultCount}
                          onChange={handleAdultChange}
                          onBlur={() => validateField("adultCount")}
                          required
                        >
                          {adultOptions.map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <IoIosArrowDown className="dropdown-arrow" />
                      </div>
                      {error.adultCount && (
                        <div className="text-danger mt-2">
                          {error.adultCount}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label htmlFor="contactNumber" className="font-size14">
                        <span style={{ fontWeight: "600" }}>
                          Contact Number
                        </span>
                      </label>

                      <div className="row">
                        <div className="col-3">
                          <select
                            className="form-control px-3 py-2"
                            value={contactNoCountryCode}
                            onChange={(e) =>
                              setContactNoCountryCode(e.target.value)
                            }
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+90">+90</option>
                            <option value="+92">+92</option>
                            <option value="+94">+94</option>
                            <option value="+60">+60</option>
                            <option value="+61">+61</option>
                            <option value="+33">+33</option>
                          </select>
                        </div>

                        <div className="col-9">
                          <input
                            type="text"
                            className="form-control px-3 py-2"
                            id="contactNumber"
                            placeholder="Enter Mobile Number"
                            value={contactNumber}
                            onChange={handleInputChange(
                              setContactNumber,
                              "contactNumber"
                            )}
                            onBlur={() => validateField("contactNumber")}
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>

                      {error.contactNumber && (
                        <div className="text-danger mt-2">
                          {error.contactNumber}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label className="font-size14">
                        <span style={{ fontWeight: "600" }}>Arrival Via</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          className="form-control px-3 py-2"
                          id="arrivalvia"
                          value={selectedArrival}
                          onChange={(e) => handleChange("arrival", e)}
                          onBlur={() => validateField("arrivalVia")}
                          required
                        >
                          <option value="" disabled>
                            Select Arrival Via
                          </option>
                          <option value="Flight">Flight</option>
                          <option value="Bus">Bus</option>
                          <option value="Train">Train</option>
                          <option value="Residency">Residency</option>
                        </select>
                        <IoIosArrowDown className="dropdown-arrow" />
                      </div>
                      {error.arrivalVia && (
                        <div className="text-danger mt-2">
                          {error.arrivalVia}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label className="font-size14">
                        <span style={{ fontWeight: "600" }}>Departure Via</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          className="form-control px-3 py-2"
                          id="departurevia"
                          value={selectedDeparture}
                          onChange={(e) => handleChange("departure", e)}
                          onBlur={() => validateField("departureVia")}
                          required
                        >
                          <option value="" disabled>
                            Select Departure Via
                          </option>
                          <option value="Flight">Flight</option>
                          <option value="Bus">Bus</option>
                          <option value="Train">Train</option>
                          <option value="Residency">Residency</option>
                        </select>
                        <IoIosArrowDown className="dropdown-arrow" />
                      </div>
                      {error.departureVia && (
                        <div className="text-danger mt-2">
                          {error.departureVia}
                        </div>
                      )}
                    </div>

                   
                  </div>
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <label htmlFor="pickup_time" className="font-size14">
                        <span style={{ fontWeight: "600" }}>Pick-up Time</span>
                      </label>
                      <TimePicker
                        className="form-control px-3 py-2"
                        id="pickup_time"
                        placeholder="Enter pick-up time"
                        showNow={false}
                        allowClear={false}
                        value={pickupTime}
                        style={{ height: "38px" }}
                        onChange={handleTimeChange}
                        onFocus={handleFocus}
                        disabledTime={disabledTime}
                        // onBlur={()=>validateField("pickupTime")}
                        format="h:mm A"
                        use12Hours
                        required
                      />
                      {touched.pickupTime && error.pickupTime && (
                        <div className="text-danger mt-2">
                          {error.pickupTime}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label htmlFor="childCount" className="font-size14">
                        <span style={{ fontWeight: "600" }}>Child</span>
                      </label>
                      <div className="select-wrapper">
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
                        <IoIosArrowDown className="dropdown-arrow" />
                      </div>
                    </div>

                    <div className="mb-2 mt-2">
                      <label
                        htmlFor="alternativeContactNumber"
                        className="font-size14"
                      >
                        <span style={{ fontWeight: "600" }}>
                          Alternative Contact Number (optional)
                        </span>
                      </label>
                      <div className="row">
                        <div className="col-3">
                          <select
                            className="form-control px-3 py-2"
                            value={alternateNoCountryCode}
                            onChange={(e) =>
                              setAlternateNoCountryCode(e.target.value)
                            }
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+90">+90</option>
                            <option value="+92">+92</option>
                            <option value="+94">+94</option>
                            <option value="+60">+60</option>
                            <option value="+61">+61</option>
                            <option value="+33">+33</option>
                          </select>
                        </div>

                        <div className="col-9">
                          <input
                            type="text"
                            className="form-control px-3 py-2"
                            id="alternativeContactNumber"
                            placeholder="Enter Alternate Number"
                            value={alternativeContactNumber}
                            onBlur={() => validateField("AlternateNumber")}
                            onChange={handleInputChange(
                              setAlternativeContactNumber,
                              "alternativeContactNumber"
                            )}
                            maxLength={10}
                          />
                        </div>
                      </div>
                      {error.alternativeContactNumber &&
                        alternativeContactNumber.length > 1 && (
                          <div className="text-danger mt-2">
                            {error.alternativeContactNumber}
                          </div>
                        )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label className="font-size14">
                        <span style={{ fontWeight: "600" }}>
                          {arrivalDetails.label}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        placeholder={arrivalDetails.placeholder}
                        value={pickupAddress}
                        onChange={handlePickupAddressChange}
                        onBlur={() => validateField("pickupAddress")}
                        readOnly={!selectedArrival}
                        required
                      />
                      {error.pickupAddress && (
                        <div className="text-danger mt-2">
                          {error.pickupAddress}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 mt-2">
                      <label className="font-size14">
                        <span style={{ fontWeight: "600" }}>
                          {departureDetails.label}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control px-3 py-2"
                        placeholder={departureDetails.placeholder}
                        value={dropAddress}
                        onChange={handledropAddressChange}
                        onBlur={() => validateField("dropAddress")}
                        readOnly={!selectedDeparture}
                        required
                      />
                      {error.dropAddress && (
                        <div className="text-danger mt-2">
                          {error.dropAddress}
                        </div>
                      )}
                    </div>

                   
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <input
                    type="checkbox"
                    id="agreeCheckbox"
                    checked={isAgreed}
                    onChange={handleCheckboxChange}
                    onBlur={() => validateField("isAgreed")}
                    style={{ marginRight: "8px" }}
                  />
                  <label
                    htmlFor="agreeCheckbox"
                    className="font-size12 ml-2"
                    onClick={handleOpenTerms}
                    style={{ color: "var(--PrimaryColor)", cursor: "pointer" }}
                  >
                    I Agree all the Terms and Conditions
                  </label>
                </div>
                {error.isAgreed && (
                  <div className="text-danger mt-2">{error.isAgreed}</div>
                )}
                <div className="font-size12 ml-2">
                  {" "}
                  By proceeding to book, I Agree to B2b Cab's
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    {" "}
                    Privacy Policy
                  </span>
                  ,
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    {" "}
                    User Agreement
                  </span>{" "}
                  and
                  <span style={{ color: "var(--PrimaryColor)" }}>
                    {" "}
                    Terms of Service
                  </span>
                </div>
              </form>
            </div>
            {/* <div className="sideBars bg-light">
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
            </div> */}
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
                <span className="font-size14">
                  Cancellation
                  {/* before
                  {startdate} */}
                </span>
                <span style={{ color: "var(--PrimaryColor)" }}>
                  <Tooltip
                    title={
                      <div className="custom-list-style">
                        {parse(car.cancel_policy)}
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
                  onClick={handlePayNow}
                  style={{
                    opacity:
                      client_name &&
                      selectedArrival &&
                      selectedDeparture &&
                      isAgreed &&
                      pickupAddress &&
                      dropAddress &&
                      pickupTime &&
                      adultCount &&
                      contactNumber
                        ? 1
                        : 0.5,
                    cursor:
                      client_name &&
                      selectedArrival &&
                      selectedDeparture &&
                      isAgreed &&
                      pickupAddress &&
                      dropAddress &&
                      pickupTime &&
                      adultCount &&
                      contactNumber
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  Pay Now
                  {/* <span style={{ fontFamily: "Inter !important" }}>₹</span>
                  <span>1,469</span> */}
                </button>
                <div className="d-flex flex-column gap-3">
                  {tripType === "Holiday Package" ? (
                    <>
                      <div>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentOptions"
                              id="paymentOption1"
                              value="paymentOption1"
                              checked={selectedOption === "paymentOption1"}
                              onChange={(e) => {
                                setSelectedOption(e.target.value);
                                settotalamount((amount / 2).toLocaleString());
                              }}
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
                              <BsCurrencyRupee />
                              {(
                                parseFloat(car.total_price.replace(/,/g, "")) /
                                2
                              ).toLocaleString()}
                            </b>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentOptions"
                              id="paymentOption2"
                              value="paymentOption2"
                              checked={selectedOption === "paymentOption2"}
                              onChange={(e) => {
                                setSelectedOption(e.target.value);
                                settotalamount(car.total_price);
                              }}
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
                    </>
                  ) : null}
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
                      {/* <div className="strikeDiagonal font-size12 text-secondary d-flex justify-content-center align-items-center fontInter">
                        <BsCurrencyRupee />
                        {car.total_price}
                      </div> */}
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
                      <Tooltip
                        title={
                          <div className="">
                            <ul className="m-0 p-0">
                              <li>
                                <span>Basic Fare: </span>
                                <span>
                                  <BsCurrencyRupee />
                                  {car.basic_rate}
                                </span>
                              </li>
                              <li>
                                <span>Taxes & Fees: </span>
                                <span>
                                  <BsCurrencyRupee />
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
                // expandIcon={<IoIosArrowDropdownCircle />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="p-0 m-0 dashBoardNavBarTitle w-100"
              >
                <div className="dueAmountNowDiv">
                  <div>Due Now</div>
                  <div className="dueAmount">
                    <BsCurrencyRupee />
                    {totalamount ? totalamount : car.total_price}
                  </div>
                </div>
              </AccordionSummary>
              {/* <AccordionDetails className="dueAmountFareBarkUp">
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
              </AccordionDetails> */}
            </Accordion>
          </div>
          <div className="travelTypeDiv">
            <hr />
            <div className="travelType">Trip Type: {tripType}</div>
          </div>
          <div className="carBookingAddressDetailsDiv">
            <div className="carBookingAddressDetails">
              <p>
                {/* No: 19, New Street, Rangavilas Thottam, Muthiyalpet,
                Puducherry-605003 */}
                {pickupAddress}
              </p>
              <IoMdArrowRoundForward />
              <p>
                {/* Chennai International Airport  */}
                {dropAddress}
              </p>
            </div>
            <div className="pickTimeDetails">
              Pickup on: {formattedDate} | {pickupTime?.format("h:mm A")}
              {/* Thu, 7 Dec 23 | 10:00 AM */}
            </div>
          </div>
        </div>

        <div className="paymentOption">
          <p>Pay Options</p>
          <div className="paymentOptionType">
            <ul>
              {/* {paymentOptions.map((paymentOption, index) => (
                <li key={index}  onClick={()=>{handlePayment(paymentOption.paymentType)}}>
                  <button className="paymentOptionBtn"
                  
                   >
                    <span>
                      {paymentOption.paymentIcon}
                      {paymentOption.paymentType}
                    </span>
                  </button>

                  <IoIosArrowForward />
                </li>
              ))} */}

              <li onClick={handleWalletclick}>
                {" "}
                <button className="paymentOptionBtn">
                  <span>
                    <GiWallet /> Wallet
                  </span>
                </button>{" "}
                <IoIosArrowForward />
              </li>
              <li
                onClick={() => {
                  handlePayment("Razorpay");
                }}
              >
                {" "}
                <button className="paymentOptionBtn">
                  <span>
                    <SiRazorpay /> Razorpay
                  </span>
                </button>{" "}
                <IoIosArrowForward />
              </li>
              <li
                onClick={() => {
                  handlePayment("CCAvenue");
                }}
              >
                {" "}
                <button className="paymentOptionBtn">
                  <span>
                    <BsCcCircleFill /> CCAvenue
                  </span>
                </button>{" "}
                <IoIosArrowForward />
              </li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        title={<p className="m-0">Wallet</p>}
        footer={null}
        loading={modalBoxLoading}
        className="selectPaymentMode col-12 col-md-6"
        // style={{ minWidth: "350", maxWidth: "550px" }}
        open={walletModalBoxOpen}
        onCancel={() => {
          setwalletModalBoxOpen(false);
          setPaymentModalBoxOpen(true);
        }}
      >
        <div className="paymentDetailsDiv">
          <div className="walletDetails">
            <div className="mb-3">
              Current Balance{" "}
              <span style={{ float: "right" }}>
                <BsCurrencyRupee />{" "}
                <strong>{Number(walletcash).toLocaleString()}</strong>{" "}
              </span>{" "}
            </div>
            <div className="mb-3">
              Due amount{" "}
              <span style={{ float: "right" }}>
                <BsCurrencyRupee />{" "}
                <strong>{totalamount ? totalamount : car.total_price} </strong>
              </span>
            </div>
            {Number(walletcash) -
              Number((totalamount || car.total_price).replace(/,/g, "")) <
            0 ? (
              <div style={{ color: "red" }}>Insufficient funds</div>
            ) : (
              <div>
                Remaining Balance
                <span style={{ float: "right" }}>
                  <BsCurrencyRupee />{" "}
                  <strong>
                    {(
                      Number(walletcash) -
                      Number((totalamount || car.total_price).replace(/,/g, ""))
                    ).toLocaleString()}{" "}
                  </strong>
                </span>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-between mt-3">
              <button className="primaryBtn" onClick={handleAddCash}>
                <IoAddCircle />
                &nbsp; Add
              </button>
              {Number(walletcash) -
                Number((totalamount || car.total_price).replace(/,/g, "")) >
              0 ? (
                <button
                  className="primaryBtn"
                  onClick={() => handlePayment("Wallet")}
                >
                  Pay
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Add Cash"
        footer={null}
        centered
        open={addCashModalBox}
        onOk={addCashModalBoxOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={400}
      >
        <div className="row align-items-center justify-content-center row-gap-3">
          <div className="col-12 addCashModalBoxDiv">
            <input
              type="text"
              value={addamount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setaddAmount(value);
                }
              }}
              className="w-100"
              ref={modalBoxInputRef}
            />
          </div>

          <div className="col-6 d-flex align-items-center column-gap-2">
            <input
              type="radio"
              checked={selectedPaymentMethod === "razorpay"}
              name="paymentType"
              id="razorPayRadioBtn"
              value="razorpay"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="razorPayRadioBtn">Razor Pay</label>
          </div>
          <div className="col-6 d-flex align-items-center column-gap-2">
            <input
              type="radio"
              name="paymentType"
              id="ccAvenueRadioBtn"
              value="ccavenue"
              checked={selectedPaymentMethod === "ccavenue"}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="ccAvenueRadioBtn">C C Avenue</label>
          </div>
          <div className="col-6">
            <button
              className="primaryBtn w-100"
              disabled={!addamount || loading || addamount === "0"}
              onClick={handleaddPayment}
              style={{
                backgroundColor:
                  !addamount || addamount === "0" ? "grey" : "#089848",
                width: "100px",
              }}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "SUBMIT"
              )}
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default CarBooking;
