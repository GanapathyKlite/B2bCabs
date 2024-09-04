import React, { useState, useCallback  } from "react";
// import { FaCircleCheck } from "react-icons/fa6";
import CarFilter from "./CarFilter";
import CarList from "./CarList";
import resultNotFount from "../../../Assets/recordNotFound.png";
import "./CarHero.css";

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
  packageId: string;
  vehicle_id: string;
}
interface Period {
  noOfDays: number;
  noOfNights: number;
}

interface CarListProps {
  cars: Car[];
  duration: string;
  km: number;
  cancelDate: string;
  errorMessage: string;
  period: Period;
  start_date?: string;
  pickup_time?: string;
  startrangedate?: string;
  endrangedate?: string;
  hourTime: string;
}
const CarHero: React.FC<CarListProps> = ({ cars, duration, km, cancelDate, errorMessage, period, start_date,pickup_time, startrangedate, endrangedate, hourTime }) => {
  
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  
  const handleFilterChange = useCallback(
    (selectedVehicleNames: string[], selectedPriceRange: [number, number], selectedAmenities: string[]) => {
      let filtered = cars;

      // Filter by vehicle names
      if (selectedVehicleNames.length > 0) {
        filtered = filtered.filter((car) => selectedVehicleNames.includes(car.vehicle_name));
      }

      // Filter by price range
      filtered = filtered.filter((car) => {
        const price = parseFloat(car.price.replace(/,/g, ''));
        return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
      });

      // Filter by amenities
      filtered = filtered.filter((car) => 
        selectedAmenities.every((amenity) => car.amenities.includes(amenity))
      );

      setFilteredCars(filtered);
    },
    [cars]
  );

  return (
    <>
      <div className="containers">
        <div className="row">
          {cars.length !== 0 ?(<>
            <div className="col-lg-3 d-none d-md-block">
            <div className="pt-3 pb-5 position-sticky top-95">
              <div className="sideBars ">
                <CarFilter cars={cars} onFilterChange={handleFilterChange}/>
              </div>
            </div>
          </div>
          
            
              <div className="col-lg-9">
              {/* <div className="pt-3 px-2 pb-4 z-n1">
              <div className="d-flex w-100 bg-success-subtle py-3 px-3 rounded align-items-center gap-3 text-success-emphasis">
                <FaCircleCheck className="opacity-50" />
                Free Cancellation before {cancelDate}
              </div>
            </div> */}
              {duration.length !== 0 ?(
                <div className="pt-2 px-2 pb-4 z-n1">
                <div className="card pt-2 px-2 pb-2 z-n1">
    <p className="mb-0">Distance for selected route is {km} km |<span>  Approx : {duration}</span></p>
</div>
</div>
              ):null} 
              {period.noOfDays !== 0 && period.noOfNights !== 0?(
                <div className="pt-2 px-2 pb-4 z-n1">
                <div className="card pt-2 px-2 pb-2 z-n1">
    <p className="mb-0"> {period.noOfNights} Night ,<span> {period.noOfDays} Days</span></p>
</div>
</div>
              ):null} 

            <CarList 
            cars={filteredCars}
            duration={duration} km={km}
            pickup_time={pickup_time}
            start_date={start_date}
            startrangedate = {startrangedate}
            endrangedate= {endrangedate}
            hourTime = {hourTime}
             />
         
            </div>
          </>):(<>
            <div className="col-12 text-center my-5">
  <div className="col-12 text-center compact-container py-3 py-md-4 py-lg-5">
    <img src={resultNotFount} alt="resultNotFount" className="compact-image" />
    <div className="recordFound compact-text">No Record Found</div>
  </div>
</div>
          </>)}
         
        </div>
      </div>
    </>
  );
};

export default CarHero;
