import React from "react";
import carIcon from "../../../Assets/Car_icon.svg";
import CarIconSUV from "../../../Assets/Car_icon_SUV.svg";
import { GrMapLocation } from "react-icons/gr";
import { TbClockX } from "react-icons/tb";
import { FaGasPump, FaRegSnowflake, FaTv } from "react-icons/fa";
import { GiCharging } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface Car {
  name: string;
  icon: string;
  type: string;
  seats: number;
  description: string;
  extraKmFare: string;
  cancellationPolicy: string;
  amenities: JSX.Element[];
  originalPrice: string;
  offerPrice: string;
  discount: string;
}

const cars: Car[] = [
  {
    name: "Dzire, Etios",
    icon: carIcon,
    type: "Sedan",
    seats: 4,
    description: "Spacious Car",
    extraKmFare: "₹10.8/km after 755 kms",
    cancellationPolicy: "Free till 1 hour of departure",
    amenities: [
      <FaRegSnowflake key="ac" />,
      <GiCharging key="charging" />,
      <FaTv key="tv" />,
    ],
    originalPrice: "₹10,054",
    offerPrice: "₹1,150",
    discount: "13% off",
  },
  {
    name: "Toyota Innova",
    icon: CarIconSUV,
    type: "SUV",
    seats: 6,
    description: "Large Car",
    extraKmFare: "₹10.8/km after 755 kms",
    cancellationPolicy: "Free till 1 hour of departure",
    amenities: [
      <FaRegSnowflake key="ac" />,
      <GiCharging key="charging" />,
      <FaTv key="tv" />,
    ],
    originalPrice: "₹10,054",
    offerPrice: "₹1,150",
    discount: "13% off",
  },
  {
    name: "Dzire, Etios",
    icon: carIcon,
    type: "Sedan",
    seats: 4,
    description: "Spacious Car",
    extraKmFare: "₹10.8/km after 755 kms",
    cancellationPolicy: "Free till 1 hour of departure",
    amenities: [
      <FaRegSnowflake key="ac" />,
      <GiCharging key="charging" />,
      <FaTv key="tv" />,
    ],
    originalPrice: "₹10,054",
    offerPrice: "₹1,150",
    discount: "13% off",
  },
];

const CarList: React.FC = () => {
  const navigate = useNavigate();
  const handleCabBooking = () => {
    navigate("/dashboard/cabbooking");
  };
  return (
    <div>
      <div className="d-flex flex-column gap-4">
        {cars.map((car, index) => (
          <div className="sideBars d-flex" key={index}>
            <div className="carIcon d-flex align-items-center justify-content-center">
              <img src={car.icon} alt="caricon" />
            </div>
            <div className="carData d-flex">
              <div className="d-flex gap-2 flex-column w-100">
                <div className="d-inline-flex align-items-center gap-1">
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
                    <div className="text-primary px-3">
                      <GrMapLocation />
                    </div>
                    <div className="d-flex w-75 font-size14">
                      <div className="d-flex w-50">Extra km fare </div>
                      <div className="d-flex w-50 fontInter">
                        {car.extraKmFare}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex font-size14">
                    <div className="text-primary px-3">
                      <TbClockX />
                    </div>
                    <div className="d-flex w-75">
                      <div className="d-flex w-50">Cancellation </div>
                      <div className="d-flex w-50 text-nowrap gap-1">
                        <span className="text-success">Free</span> till 1 hour
                        of departure
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-primary px-3">
                      <FaGasPump />
                    </div>
                    <div className="d-flex w-75">
                      <div className="d-flex w-50 font-size14">Amenities</div>
                      <div className="d-flex w-50 gap-3 align-items-center text-primary">
                        {car.amenities}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carRate d-flex gap-3 flex-column">
              <div>
                <p className="text-danger m-0 px-4 pt-3 text-end">
                  {car.discount}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-evenly">
                <span className="strikeDiagonal text-secondary d-flex justify-content-center align-items-center fontInter">
                  {car.originalPrice}
                </span>
                <span className="offerPrice">{car.offerPrice}</span>
              </div>
              <div className="d-flex justify-content-center">
                <button className="primaryBtn" onClick={handleCabBooking}>
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
