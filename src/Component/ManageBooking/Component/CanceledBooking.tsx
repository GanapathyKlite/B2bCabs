import React from "react";
import SUVCab from "../../../Assets/SUV.svg";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { DatePicker } from "antd";
import { CiSearch } from "react-icons/ci";
import resultNotFount from "../../../Assets/recordNotFound.png";

const { RangePicker } = DatePicker;

const upcomingBookingData = [
  {
    cabType: "Dzire, Etios",
    similar: "or similar",
    bookingId: "BTU01CT0000087",
    bookingType: "Airport Transfer",
    bookingDate: "Tue 05, Mar 2023 7:00 PM",
    startAddress:
      "No: 19, new street, rangavilas thottam, Muthiyalpet, Puducherry-605003",
    endAddress: "Elnet Software City, Tharamani, Chennai, Tamil Nadu 600113",
  },
  {
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000098",
    bookingType: "Daily Rental",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
];

const CanceledBooking: React.FC = () => {
  const [searchCanceledBooking, setSearchCanceledBooking] =
    React.useState<string>("");

  const filterCanceledBooking = upcomingBookingData.filter(
    (UpcomingData) =>
      UpcomingData.cabType
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase()) ||
      UpcomingData.similar
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase()) ||
      UpcomingData.bookingId
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase()) ||
      UpcomingData.bookingType
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase()) ||
      UpcomingData.bookingDate
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase()) ||
      UpcomingData.startAddress
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase()) ||
      UpcomingData.endAddress
        .toLowerCase()
        .includes(searchCanceledBooking.toLowerCase())
  );

  return (
    <>
      <div className="px-1 pt-3">
        <div className="d-flex gap-4 pb-2">
          <RangePicker format="DD/MM/YYYY" />

          <button className="primaryBtn px-5">SEARCH</button>
        </div>
        <div className="searchBarDiv" style={{ height: "58px" }}>
          <input
            type="text"
            style={{ height: "100%" }}
            value={searchCanceledBooking}
            onChange={(e) => setSearchCanceledBooking(e.target.value)}
            placeholder="Quick Search"
          />
          <CiSearch />
        </div>
      </div>

      <div className="d-flex flex-column gap-4 pt-2 pb-3  ">
        {filterCanceledBooking.length === 0 ? (
          <div className="transactionList bg-secondary-subtle d-flex align-items-center justify-content-center py-4 rounded-4">
            <div className="resultNotFount w-50 d-flex align-items-center justify-content-center row-gap-2 flex-column">
              <img src={resultNotFount} alt="resultNotFount" />
              <div className="recordFound">No Record Found</div>
            </div>
          </div>
        ) : (
          <>
            {filterCanceledBooking.map((booking, index) => (
              <div
                key={index}
                className="upcomingBookingList border p-2 p-md-4"
              >
                <div className="BGCircle"></div>

                <div className="upcomingBookingDetailsListDiv">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex column-gap-3">
                      <div className="border upcomingBookingCabImg">
                        <img src={SUVCab} alt="" className="w-100" />
                      </div>

                      <div className="upcomingBookingCabType">
                        <span>{booking.cabType}</span>
                        <span>{booking.similar}</span>
                      </div>
                    </div>
                    <div className="upcomingBookingCabDetails">
                      <span>{booking.bookingId}</span>
                      <span>{booking.bookingType}</span>
                      <span>{booking.bookingDate}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row row-gap-3">
                    <div className="d-flex column-gap-3 col-12 col-lg-9">
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <span className="addressStartAndEndCircle"></span>
                        <span className="dashLine"></span>
                        <span className="addressStartAndEndCircle"></span>
                      </div>
                      <div className="upcomingBookingAddressDetails col-11">
                        <p>{booking.startAddress}</p>
                        <p>{booking.endAddress}</p>
                      </div>
                    </div>
                    <div className="canceledBookingText col-12 col-lg-3">
                      Canceled &nbsp; <BsFillExclamationCircleFill />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CanceledBooking;
