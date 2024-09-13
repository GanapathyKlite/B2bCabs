import React, { useState, useCallback } from "react";
// import { FaCircleCheck } from "react-icons/fa6";
import CarFilter from "./CarFilter";
import CarList from "./CarList";
import resultNotFount from "../../../Assets/recordNotFound.png";
import { Modal } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
const CarHero: React.FC<CarListProps> = ({
  cars,
  duration,
  km,
  cancelDate,
  errorMessage,
  period,
  start_date,
  pickup_time,
  startrangedate,
  endrangedate,
  hourTime,
}) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = useCallback(
    (
      selectedVehicleNames: string[],
      selectedPriceRange: [number, number],
      selectedAmenities: string[]
    ) => {
      let filtered = cars;

      // If no vehicle names are selected, return an empty array
      if (selectedVehicleNames.length === 0) {
        setFilteredCars([]);
        return;
      }

      // Filter by vehicle names
      if (selectedVehicleNames.length > 0) {
        filtered = filtered.filter((car) =>
          selectedVehicleNames.includes(car.vehicle_name)
        );
      }

      // Filter by price range
      filtered = filtered.filter((car) => {
        const price = parseFloat(car.price.replace(/,/g, ""));
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="containers">
        <div className="row">
          {cars.length !== 0 ? (
            <>
              <div className="col-lg-3 d-none d-md-block">
                <div className="pt-3 pb-5 position-sticky top-95">
                  <div className="sideBars ">
                    <CarFilter
                      cars={cars}
                      onFilterChange={handleFilterChange}
                    />
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
                {duration.length !== 0 ? (
                  <div className="pt-3 px-3 z-n1">
                    <div className=" pt-2 px-2 pb-2 z-n1 ">
                      <p className="mb-0">
                        Distance for selected route is{" "}
                        <span style={{ fontWeight: 600 }}>{km} km </span>|
                        Approx :{" "}
                        <span style={{ fontWeight: 600 }}> {duration}</span>
                      </p>
                    </div>
                  </div>
                ) : null}
                {period.noOfDays !== 0 && period.noOfNights !== 0 ? (
                  <div className="pt-3 px-3 pb-3 z-n1">
                    <div className=" pt-2 px-2 pb-2 z-n1">
                      <p className="mb-0 fontWeight500">
                        {" "}
                        {period.noOfNights} Nights |{" "}
                        <span> {period.noOfDays} Days</span>
                        <span
                          style={{ float: "right" }}
                          className="itinerary"
                          onClick={handleOpenModal}
                        >
                          itinerary
                        </span>
                      </p>
                    </div>
                  </div>
                ) : null}

                <CarList
                  cars={filteredCars}
                  duration={duration}
                  km={km}
                  pickup_time={pickup_time}
                  start_date={start_date}
                  startrangedate={startrangedate}
                  endrangedate={endrangedate}
                  hourTime={hourTime}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-12 text-center my-5">
                <div className="col-12 text-center compact-container py-3 py-md-4 py-lg-5">
                  <img
                    src={resultNotFount}
                    alt="resultNotFount"
                    className="compact-image"
                  />
                  <div className="recordFound compact-text">
                    No Record Found
                  </div>
                </div>
              </div>
            </>
          )}
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
    </>
  );
};

export default CarHero;
