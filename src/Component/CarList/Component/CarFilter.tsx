import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { FaRegSnowflake, FaMusic, FaTv } from "react-icons/fa";
import { GiCharging } from "react-icons/gi";
import { BiSolidCarGarage } from "react-icons/bi";
import "./CarFilter.css";
import { translate } from "react-range/lib/utils";
import { BsCurrencyRupee } from "react-icons/bs";

interface Car {
  name: string;
  icon: string;
  type: string;
  seats: number;
  description: string;
  extraKmFare: string;
  cancellationPolicy: string;
  amenities: string[];
  originalPrice: string;
  offerPrice: string;
  discount: string;
  price: string;
  vehicle_name: string;
  images: string;
}

interface CarFilterProps {
  cars: Car[];
  onFilterChange: (
    selectedVehicleNames: string[],
    selectedPriceRange: [number, number],
    selectedAmenities: string[]
  ) => void;
}
const amenitiesMap = {
  "1": { icon: <FaRegSnowflake key="ac" />, name: "AC" },
  "2": { icon: <GiCharging key="charger" />, name: "Charger" },
  "3": { icon: <FaMusic key="music" />, name: "Music" },
  "4": { icon: <BiSolidCarGarage key="carrier" />, name: "Carrier" },
  "5": { icon: <FaTv key="tv" />, name: "TV" },
};

const CarFilter: React.FC<CarFilterProps> = ({ cars, onFilterChange }) => {
  const prices = cars
    .map((car) => parseFloat(car.price.replace(/,/g, "")))
    .filter((price) => !isNaN(price));

  const initialMinPrice = prices.length > 0 ? Math.min(...prices) : 0;
  let initialMaxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  if (initialMinPrice === initialMaxPrice) {
    initialMaxPrice = initialMaxPrice + 1;
  }

  const uniqueVehicleNames = Array.from(
    new Set(cars.map((car) => car.vehicle_name))
  );
  const [selectedVehicleNames, setSelectedVehicleNames] =
    useState<string[]>(uniqueVehicleNames);

  const [temporaryMinPrice, setTemporaryMinPrice] =
    useState<number>(initialMinPrice);
  const [temporaryMaxPrice, setTemporaryMaxPrice] =
    useState<number>(initialMaxPrice);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMinPrice,
    initialMaxPrice,
  ]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    const filteredCars = cars.filter(
      (car) =>
        selectedVehicleNames.includes(car.vehicle_name) &&
        (selectedAmenities.length === 0 ||
          selectedAmenities.every((amenity) => car.amenities.includes(amenity)))
    );

    const filteredPrices = filteredCars
      .map((car) => parseFloat(car.price.replace(/,/g, "")))
      .filter((price) => !isNaN(price));

    if (filteredPrices.length > 0) {
      const minPrice = Math.min(...filteredPrices);
      const maxPrice = Math.max(...filteredPrices);

      setTemporaryMinPrice(minPrice);
      setTemporaryMaxPrice(maxPrice);

      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([initialMinPrice, initialMaxPrice]);
    }
  }, [selectedVehicleNames, selectedAmenities, cars]);

  useEffect(() => {
    onFilterChange(selectedVehicleNames, priceRange, selectedAmenities);
  }, [selectedVehicleNames, priceRange, selectedAmenities]);

  const handleCheckboxChange = (vehicleName: string) => {
    let updatedSelection = [...selectedVehicleNames];
    if (updatedSelection.includes(vehicleName)) {
      updatedSelection = updatedSelection.filter(
        (name) => name !== vehicleName
      );
    } else {
      updatedSelection.push(vehicleName);
    }
    setSelectedVehicleNames(updatedSelection);
  };

  const handleSliderChange = (values: number[]) => {
    if (values.length === 2) {
      setPriceRange([values[0], values[1]]);
    }
  };

  const handleAmenityChange = (amenity: string) => {
    let updatedSelection = [...selectedAmenities];
    if (updatedSelection.includes(amenity)) {
      updatedSelection = updatedSelection.filter((item) => item !== amenity);
    } else {
      updatedSelection.push(amenity);
    }
    setSelectedAmenities(updatedSelection);
  };

  return (
    <>
      <div className="pb-4">
        <p className="h5 mb-3">Select Filters</p>

        {/* Price Range Slider */}
        <div className="mt-4">
          <p className="mb-2 h6">Price Range</p>
          <Range
            values={priceRange}
            step={100}
            min={temporaryMinPrice}
            max={temporaryMaxPrice}
            onChange={handleSliderChange}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: "var(--PrimaryColor)",
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "22px",
                  width: "22px",
                  borderRadius: "50px",
                  outline: "none",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              >
                <div
                  style={{
                    height: "15px",
                    width: "15px",
                    borderRadius: "50px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    transition: "0.2s linear",
                    backgroundColor: isDragged ? "var(--PrimaryColor)" : "#CCC",
                  }}
                />
              </div>
            )}
          />
          <div className="d-flex justify-content-between mt-2">
            <span className="d-flex align-items-center">
              <BsCurrencyRupee />
              {priceRange[0].toLocaleString()}
            </span>
            <span className="d-flex align-items-center">
              <BsCurrencyRupee />
              {priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
        <hr />

        <p className="mb-2 h6">Cab Type</p>
        <div className="d-flex flex-column gap-2">
          {uniqueVehicleNames.map((vehicleName, index) => (
            <div className="d-flex justify-content-between" key={index}>
              <div className="checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={vehicleName}
                  id={`flexCheckDefault${index}`}
                  onChange={() => handleCheckboxChange(vehicleName)}
                  checked={selectedVehicleNames.includes(vehicleName)}
                />
                <label htmlFor={`flexCheckDefault${index}`} className="cbx">
                  <div
                    className={`flip ${
                      selectedVehicleNames.includes(vehicleName)
                        ? "checked"
                        : ""
                    }`}
                  >
                    <div className="front"></div>
                    <div className="back">
                      <svg viewBox="0 0 16 14" height="10" width="15">
                        <path d="M2 8.5L6 12.5L14 1.5"></path>
                      </svg>
                    </div>
                  </div>
                </label>
                <label
                  className="vehicleType"
                  htmlFor={`flexCheckDefault${index}`}
                >
                  {vehicleName}
                </label>
              </div>
              {/* <div className="text-secondary font-size12">
              ({cars.filter((car) => car.vehicle_name === vehicleName).length})
            </div> */}
            </div>
          ))}
        </div>

        <hr />

        {/* Amenities */}
        <p className="mb-2 mt-4 h6">Amenities</p>
        <ul className="amenities-list">
          {Object.entries(amenitiesMap).map(([key, { icon, name }]) => (
            <li className="amenity-item" key={key}>
              <input
                className="form-check-input"
                type="checkbox"
                value={key}
                id={`amenityCheck${key}`}
                onChange={() => handleAmenityChange(key)}
                checked={selectedAmenities.includes(key)}
              />
              <label
                className="form-check-label d-flex align-items-center ms-2"
                htmlFor={`amenityCheck${key}`}
              >
                <span className="icon-container">{icon}</span>
                <span className="amenity-name ms-2">{name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CarFilter;
