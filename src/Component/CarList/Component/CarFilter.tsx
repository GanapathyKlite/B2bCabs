import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { FaRegSnowflake, FaMusic, FaTv } from 'react-icons/fa';
import { GiCharging } from 'react-icons/gi';
import { BiSolidCarGarage } from 'react-icons/bi';


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

interface CarFilterProps {
  cars: Car[];
  onFilterChange: (selectedVehicleNames: string[], selectedPriceRange: [number, number], selectedAmenities: string[]) => void;
}
const amenitiesMap = {
  "1": { icon: <FaRegSnowflake key="ac" />, name: 'AC' },
  "2": { icon: <GiCharging key="charger" />, name: 'Charger' },
  "3": { icon: <FaMusic key="music" />, name: 'Music' },
  "4": { icon: <BiSolidCarGarage key="carrier" />, name: 'Carrier' },
  "5": { icon: <FaTv key="tv" />, name: 'TV' },
};

const CarFilter: React.FC<CarFilterProps> = ({ cars, onFilterChange  }) => {

  const uniqueVehicleNames = Array.from(new Set(cars.map((car) => car.vehicle_name)));
  const [selectedVehicleNames, setSelectedVehicleNames] = useState<string[]>(uniqueVehicleNames);

  const prices = cars
  .map((car) => parseFloat(car.price.replace(/,/g, '')))
  .filter((price) => !isNaN(price)); // Filter out any invalid prices

const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);
  

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange(selectedVehicleNames, priceRange, selectedAmenities);
  }, [selectedVehicleNames, priceRange, selectedAmenities]);

  const handleCheckboxChange = (vehicleName: string) => {
    let updatedSelection = [...selectedVehicleNames];

    if (updatedSelection.includes(vehicleName)) {
      updatedSelection = updatedSelection.filter((name) => name !== vehicleName);
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
      <p className="mb-2">Cab Type</p>
      <div className="d-flex flex-column gap-2">
        {uniqueVehicleNames.map((vehicleName, index) => (
          <div className="form-check d-flex justify-content-between" key={index}>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value={vehicleName}
                id={`flexCheckDefault${index}`}
                onChange={() => handleCheckboxChange(vehicleName)}
                checked={selectedVehicleNames.includes(vehicleName)}
              />
              <label
                className="form-check-label font-size14"
                htmlFor={`flexCheckDefault${index}`}
              >
                {vehicleName}
              </label>
            </div>
            <div className="text-secondary font-size12">
              ({cars.filter((car) => car.vehicle_name === vehicleName).length})
            </div>
          </div>
        ))}
      </div>

       {/* Amenities */}
       <p className="mb-2 mt-4">Amenities</p>
        <div className="d-flex flex-wrap gap-2">
          {Object.entries(amenitiesMap).map(([key, { icon, name }]) => (
            <div className="form-check d-flex align-items-center" key={key}>
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
                {icon}
                <span className="ms-2">{name}</span>
              </label>
            </div>
          ))}
        </div>


       {/* Price Range Slider */}
       <div className="mt-4">
          <p className="mb-2">Price Range</p>
          <Range
            values={priceRange}
            step={100}
            min={minPrice}
            max={maxPrice}
            onChange={handleSliderChange}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ['#ccc', '#548BF4', '#ccc'],
                      min: minPrice,
                      max: maxPrice,
                    }),
                    alignSelf: 'center',
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
                  height: '22px',
                  width: '22px',
                  borderRadius: '4px',
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 2px 6px #AAA',
                }}
              >
                <div
                  style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC',
                  }}
                />
              </div>
            )}
          />
          <div className="d-flex justify-content-between mt-2">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>


        


    </div>
      {/* <div className="pb-4">
        <p className="h5 mb-3">Select Filters</p>
        <p className="mb-2"> Cab Type</p>
        <div className="d-flex flex-column gap-2">
          <div className="form-check d-flex justify-content-between">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault1"
              />
              <label
                className="form-check-label font-size14"
                htmlFor="flexCheckDefault1"
              >
                HATCHBACK
              </label>
            </div>
            <div className="text-secondary font-size12">(5)</div>
          </div>
          <div className="form-check d-flex  justify-content-between">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault2"
              />
              <label
                className="form-check-label font-size14"
                htmlFor="flexCheckDefault2"
              >
                SEDAN
              </label>
            </div>
            <div className="text-secondary font-size12">(2)</div>
          </div>
          <div className="form-check d-flex  justify-content-between">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault3"
              />
              <label
                className="form-check-label font-size14"
                htmlFor="flexCheckDefault3"
              >
                SUV
              </label>
            </div>
            <div className="text-secondary font-size12">(1)</div>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2"> Cab Model</p>
        <div className="d-flex flex-column gap-2">
          <div className="form-check d-flex justify-content-between">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault4"
              />
              <label
                className="form-check-label font-size14"
                htmlFor="flexCheckDefault4"
              >
                Toyota Innova
              </label>
            </div>
            <div className="text-secondary font-size12">(5)</div>
          </div>
          <div className="form-check d-flex  justify-content-between">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault5"
              />
              <label
                className="form-check-label font-size14"
                htmlFor="flexCheckDefault5"
              >
                Innova Crysta
              </label>
            </div>
            <div className="text-secondary font-size12">(1)</div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CarFilter;
