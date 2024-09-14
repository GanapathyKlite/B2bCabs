import React, { useEffect, useState } from "react";
import carIcon from "../../../Assets/Car_icon.svg";
import CarIconSUV from "../../../Assets/Car_icon_SUV.svg";
import { GrMapLocation } from "react-icons/gr";
import { BiSolidCarGarage } from "react-icons/bi";
import { TbClockX } from "react-icons/tb";
import { FaGasPump, FaRegSnowflake, FaTv, FaMusic } from "react-icons/fa";
import { GiCharging, GiCarDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContext";
import { Modal } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import resultNotFount from "../../../Assets/recordNotFound.png";
import "./CarHero.css";
import { BsCurrencyRupee } from "react-icons/bs";

interface Car {
  name: string;
  icon: string;
  type: string;
  seats: number;
  description: string;
  extraKmFare: string;
  cancellationPolicy: string;
  // amenities: JSX.Element[];
  amenities: string[];
  originalPrice: string;
  offerPrice: string;
  discount: string;
  price: string;
  vehicle_name: string;
  images: string;
}

// const cars: Car[] = [
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Toyota Innova",
//     icon: CarIconSUV,
//     type: "SUV",
//     seats: 6,
//     description: "Large Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Toyota Innova",
//     icon: CarIconSUV,
//     type: "SUV",
//     seats: 6,
//     description: "Large Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Toyota Innova",
//     icon: CarIconSUV,
//     type: "SUV",
//     seats: 6,
//     description: "Large Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Toyota Innova",
//     icon: CarIconSUV,
//     type: "SUV",
//     seats: 6,
//     description: "Large Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
//   {
//     name: "Dzire, Etios",
//     icon: carIcon,
//     type: "Sedan",
//     seats: 4,
//     description: "Spacious Car",
//     extraKmFare: "10.8/km after 755 kms",
//     cancellationPolicy: "Free till 1 hour of departure",
//     amenities: [
//       <FaRegSnowflake key="ac" />,
//       <GiCharging key="charging" />,
//       <FaTv key="tv" />,
//     ],
//     originalPrice: "10,054",
//     offerPrice: "1,150",
//     discount: "13% off",
//   },
// ];

interface CarListProps {
  cars: Car[];
  duration: string;
  km: number;
  start_date?: string;
  pickup_time?: string;
  startrangedate?: string;
  endrangedate?: string;
  hourTime: string;
}

const CarList: React.FC<CarListProps> = ({
  cars,
  duration,
  km,
  start_date,
  pickup_time,
  startrangedate,
  endrangedate,
  hourTime,
}) => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedtripType = sessionStorage.getItem("tripType");
    if (storedtripType) {
      setTripType(storedtripType);
    }
  }, []);

  const handleCabBooking = async (car: any) => {
    let start_city, end_city;
    const storedstartCitySuggestion = sessionStorage.getItem(
      "startCitySuggestion"
    );
    const storedendCitySuggestion = sessionStorage.getItem("endCitySuggestion");

    if (storedstartCitySuggestion) {
      const suggestionObject = JSON.parse(storedstartCitySuggestion);
      start_city = {
        city: suggestionObject.city,
        admin: suggestionObject.admin,
        province: suggestionObject.province,
      };
    }
    if (storedendCitySuggestion) {
      const suggestionObject = JSON.parse(storedendCitySuggestion);
      end_city = {
        city: suggestionObject.city,
        admin: suggestionObject.admin,
        province: suggestionObject.province,
      };
    }

    if(tripType === "Cab From Airport" || tripType === "Cab To Airport"){
   try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/price/airportPickup/selectedPrice`,
     { start_city, end_city,"duration": duration ,"km": km,"vehicle_id":car.vehicle_id,"start_date":start_date,
       "pickup_time":pickup_time}
       ,
     {
       headers: {
         Authorization: `Bearer ${authToken}`,
         "Content-Type": "application/json",
       },
     }
   );
   if (response.data.status) {
    navigate("/dashboard/cabbooking",{state: {car: response.data.data,startcity: start_city, endcity: end_city, startdate: start_date,pickuptime: pickup_time ,tripType : "Airport Pickup"}});
   } 

   } catch (error) {
    console.log(error);
    
   }}
   if(tripType === "Daily Rental"){
    try {
     const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/price/dayRental/selectedPrice`,
      { start_city, end_city,"duration": duration ,"km": km,"vehicle_id":car.vehicle_id,"start_date":startrangedate,
        "end_date":endrangedate}
        ,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },

          }
        );
        if (response.data.status) {
          navigate("/dashboard/cabbooking", {
            state: {
              car: response.data.data,
              startcity: start_city,
              endcity: end_city,
              startdate: startrangedate,
              enddate: endrangedate,
              tripType: "Day Rental",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (tripType === "Hourly Rental") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/price/hourRental/selectedPrice`,
          {
            start_city,
            duration: duration,
            km: km,
            vehicle_id: car.vehicle_id,
            start_date: start_date,
            pickup_time: pickup_time,
            hour_package_type: parseInt(hourTime),
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          navigate("/dashboard/cabbooking", {
            state: {
              car: response.data.data,
              startcity: start_city,
              startdate: start_date,
              tripType: "Hour Rental",
              hour_rental_type: hourTime,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (tripType === "Holidays Package") {
      let packageId;
      try {
        const storedPackageid = sessionStorage.getItem("packageId");
        if (storedPackageid) {
          packageId = storedPackageid;
        }
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/price/holidayPackage/selectedPrice`,
          {
            packageId: packageId,
            vehicle_id: car.vehicle_id,
            travel_date: startrangedate,
          },

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          navigate("/dashboard/cabbooking", {
            state: {
              car: response.data.data,
              // startcity: start_city, endcity: end_city,
              startdate: startrangedate,
              enddate: endrangedate,
              tripType: "Holiday Package",
              seats: car.seats,
              packageId: packageId,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const amenitiesMap: { [key: string]: { icon: JSX.Element; name: string } } = {
    "1": { icon: <FaRegSnowflake key="ac" />, name: "AC" },
    "2": { icon: <GiCharging key="charger" />, name: "Charger" },
    "3": { icon: <FaMusic key="music" />, name: "Music" },
    "4": { icon: <BiSolidCarGarage key="carrier" />, name: "Carrier" },
    "5": { icon: <FaTv key="tv" />, name: "TV" },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const itinerary = [
    {
      day: "Day 1",
      from: 10,
      to: 93,
      from_name: "Pondicherry",
      to_name: "Yercaud",
      km: "236",
      duration: "4 hr 53 min",
      itinerary:
        "Morning pick-up from Pondicherry & drive to Yercaud Hotel. On arrival check into the hotel. fresh up then visiting places Emerald lake, Botanical garden, Kiliyur falls, Lady's Seat, Pagoda point, Sheoy temple, Local town hotel for overnight stay...\n\n",
    },
    {
      day: "Day 2",
      from: 93,
      to: 10,
      from_name: "Yercaud",
      to_name: "Pondicherry",
      km: "236",
      duration: "4 hr 53 min",
      itinerary:
        "Morning at leisure. After breakfast, Anna Park, Arthur's seat, Silk farm, Rose Garden, Bears cave & Bears Hill etc. The Yercaud boathouse provides an ample opportunity to enjoy the scenic beauty of the hilly terrain through boat riding which one shouldn't miss when visiting Yercaud (on direct pay basis) You can also do \"Dirt Biking\" in a place close to Grange Resorts. It is around 4 kms from the lake. In the evening come back and overnight stay at the hotel.\nAfter breakfast check out from the hotel and drive to Pondicherry for your onward destination with lots of beautiful memories.\n\n",
    },
  ];
  return (
    <div>
      <div className="d-flex flex-column gap-4 px-2 pb-3">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div className="sideBars row align-items-center row-gap-4" key={index}>
              <div className="carIcon d-flex col-2 align-items-center justify-content-start justify-content-md-center">
                <img
                  style={{ objectFit: "contain" }}
                  src={`${import.meta.env.VITE_API_IMG_URL}${car.images}`}
                  alt="caricon"
                />
              </div>
              <div className="col-12 col-md-7">
                <div className="d-flex gap-2 flex-column w-100">
                  <div className="d-inline-flex flex-column flex-md-row align-items-lg-center gap-1">
                    <span className="carName">
                      <b>{car.vehicle_name}</b>
                    </span>
                    <span className="similarCarName">or similar</span>
                  </div>
                  <div className="d-inline-flex">
                    <span className="d-flex gap-2" style={{ fontSize: "14px" }}>
                      {/* <li>{car.vehicle_name}</li>
                    <li>AC</li> */}
                      <li>{car.seats} Seats</li>
                    </span>
                  </div>
                  <div className="d-flex gap-2 flex-column w-100">
                    <p className="m-0">
                      <b>{car.description}</b>
                    </p>
                    {/* <div className="d-flex">
                    <div className="text-success pe-3">
                      <GrMapLocation />
                    </div>
                    <div className="d-flex col-11 col-md-8 font-size14">
                      <div className="d-flex col-5">Extra km fare </div>
                      <div className="d-flex col-7 fontInter">
                        {car.extraKmFare}
                      </div>
                    </div>
                  </div> */}
                    {/* <div className="d-flex font-size14">
                    <div className="text-success pe-3">
                      <TbClockX />
                    </div>
                    <div className="d-flex col-11 col-md-8">
                      <div className="d-flex col-5">Cancellation </div>
                      <div className="col-7 gap-7">
                        <span className="text-success">Free</span> till 1 hour
                        of departure
                      </div>
                    </div>
                  </div> */}
                    <div className="d-flex align-items-center">
                      {/* <div className="text-success pe-3">
                      <FaGasPump />
                    </div> */}
                      <div className="d-flex col-12 col-md-8">
                        <div className="d-flex col-5 font-size14">
                          Amenities
                        </div>
                        {/* <div className="d-flex col-6 gap-3 align-items-center text-success">
                        {car.amenities.map((amenity) => amenitiesMap[amenity] || null)}
                      </div> */}
                        <div className="d-flex flex-wrap gap-3 align-items-center text-success">
                          {car.amenities.map((amenity) => (
                            <div
                              key={amenity}
                              className="icon-container d-flex flex-column align-items-center"
                            >
                              {amenitiesMap[amenity]?.icon || null}
                              {/* <div className="text-center">{amenitiesMap[amenity]?.name || 'Unknown'}</div> */}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* {tripType === "Holidays Package" ? (<div className="itinerary">
   <span onClick={handleOpenModal }>itinerary</span>  </div>):null} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-5 col-lg-3 d-flex row-gap-2 flex-column">
                {/* <div>
                <p className="text-danger m-0 px-lg-4 pt-md-3 text-end">
                  <FaIndianRupeeSign />
                  {car.discount}
                </p>
              </div> */}
                <div className="d-flex align-items-center justify-content-end pe-2">
                  {/* <span className="strikeDiagonal text-secondary d-flex justify-content-center align-items-center fontInter">
                  <FaIndianRupeeSign />
                  {car.price}
                </span> */}
                  <span></span>
                  <span className="offerPrice">
                    <BsCurrencyRupee />
                    {car.price}
                  </span>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="primaryBtn"
                    onClick={() => handleCabBooking(car)}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="col-12 text-center my-5">
              <div className="col-12 text-center compact-container py-3 py-md-4 py-lg-5">
                <img
                  src={resultNotFount}
                  alt="resultNotFount"
                  className="compact-image"
                />
                <div className="recordFound compact-text">No Record Found</div>
              </div>
            </div>
          </>
        )}
        {/* {cars.map((car, index) => (
          <div
            className="sideBars d-flex flex-column row-gap-4 flex-md-rowsideBars d-flex flex-column flex-md-row position-relative"
            key={index}
          >
            <div className="carIcon d-flex align-items-center justify-content-start justify-content-md-center">
              <img src={car.icon} alt="caricon" />
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex gap-2 flex-column w-100">
                <div className="d-inline-flex flex-column flex-md-row align-items-lg-center gap-1">
                  <span className="carName">
                    <b>{car.name}</b>
                  </span>
                  <span className="similarCarName">or similar</span>
                </div>
                <div className="d-inline-flex">
                  <span className="d-flex gap-2" style={{ fontSize: "14px" }}>
                    <li>{car.type}</li>
                    <li>AC</li>
                    <li>{car.seats} Seats</li>
                  </span>
                </div>
                <div className="d-flex gap-2 flex-column w-100">
                  <p className="m-0">
                    <b>{car.description}</b>
                  </p>
                  <div className="d-flex">
                    <div className="text-success pe-3">
                      <GrMapLocation />
                    </div>
                    <div className="d-flex col-11 col-md-8 font-size14">
                      <div className="d-flex col-5">Extra km fare </div>
                      <div className="d-flex col-7 fontInter">
                        {car.extraKmFare}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex font-size14">
                    <div className="text-success pe-3">
                      <TbClockX />
                    </div>
                    <div className="d-flex col-11 col-md-8">
                      <div className="d-flex col-5">Cancellation </div>
                      <div className="col-7 gap-7">
                        <span className="text-success">Free</span> till 1 hour
                        of departure
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-success pe-3">
                      <FaGasPump />
                    </div>
                    <div className="d-flex col-11 col-md-8">
                      <div className="d-flex col-5 font-size14">Amenities</div>
                      <div className="d-flex col-6 gap-3 align-items-center text-success">
                        {car.amenities}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-5 col-lg-3 d-flex row-gap-2 flex-column position-absolute"
              style={{ right: "10px", top: "15px" }}
            >
              <div>
                <p className="text-danger m-0 px-lg-4 pt-md-3 text-end">
                  <FaIndianRupeeSign />
                  {car.discount}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between justify-content-lg-evenly">
                <span className="strikeDiagonal text-secondary d-flex justify-content-center align-items-center fontInter">
                  <FaIndianRupeeSign />
                  {car.originalPrice}
                </span>
                <span className="offerPrice">
                  <FaIndianRupeeSign />
                  {car.offerPrice}
                </span>
              </div>
              <div className="d-flex justify-content-end">
                <button className="primaryBtn" onClick={handleCabBooking}>
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))} */}

        <Modal
          title={<p className="m-0">Itenerary</p>}
          footer={null}
          className="selectPaymentMode col-12 col-md-6"
          // style={{ minWidth: "350", maxWidth: "550px" }}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="paymentDetailsDiv">
            <div className="left_side d-flex gap-3 flex-column">
              {/* <div className="h5">Itinerary</div> */}
              <div className="font-size14">
                Day Wise Details of your package
              </div>
              <div>
                {itinerary.map((item: any, index: number) => (
                  <>
                    <Accordion
                      key={index}
                      defaultExpanded={index === 0}
                      disableGutters
                      sx={{
                        marginBottom: 0,
                        padding: 0,
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
        </Modal>
      </div>
    </div>
  );
};

export default CarList;
