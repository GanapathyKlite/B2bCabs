import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import CarFilter from "./CarFilter";
import CarList from "./CarList";

const CarHero: React.FC = () => {
  return (
    <>
      <div className="containers">
        <div className="row">
          <div className="col-lg-3 d-none d-md-block">
            <div className="pt-3 pb-5 position-sticky top-95">
              <div className="sideBars ">
                <CarFilter />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="pt-3 px-2 pb-4 z-n1">
              <div className="d-flex w-100 bg-success-subtle py-3 px-3 rounded align-items-center gap-3 text-success-emphasis">
                <FaCircleCheck className="opacity-50" />
                Free Cancellation before 09 Feb 2024, 12:15 PM IST
              </div>
            </div>
            <CarList />
          </div>
        </div>
      </div>
    </>
  );
};

export default CarHero;
