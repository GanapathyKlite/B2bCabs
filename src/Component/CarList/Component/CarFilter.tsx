import React from "react";

const CarFilter: React.FC = () => {
  return (
    <>
      <div className="pb-4">
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
      </div>
    </>
  );
};

export default CarFilter;
