import React from "react";
// import SUVCab from "../../Assets/SUV.svg";
import "./DriverStatus.css";
import Footer from "../Footer/Footer";
import { FaCircleInfo } from "react-icons/fa6";
import { Modal } from "antd";
import resultNotFount from "../../Assets/recordNotFound.png";
import { Notyf } from "notyf";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

// Initialize Notyf instance with updated configuration
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

const DriverDetailsDatas = [
  {
    guestName: "Ganapathy",
    driverStatus: "assigned",
    cabType: "Dzire, Etios",
    similar: "or similar",
    bookingId: "BTU01CT0000087",
    driverName: "Mano",
    driverContactNumber: "1234567890",
    driverAlterContactNumber: "0987654321",
    vehicleNo: "TN18AC5858",
    bookingType: "Airport Transfer",
    bookingDate: "Tue 05, Mar 2023 7:00 PM",
    startAddress:
      "No: 19, new street, rangavilas thottam, Muthiyalpet, Puducherry-605003",
    endAddress: "Elnet Software City, Tharamani, Chennai, Tamil Nadu 600113",
  },
  {
    guestName: "Dinesh",
    driverStatus: "assigned",
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000098",
    driverName: "Ganapathy",
    driverContactNumber: "1234567890",
    driverAlterContactNumber: "0987654321",
    vehicleNo: "TN18AC5858",
    bookingType: "Daily Rental",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
  {
    guestName: "Mano",
    driverStatus: "unassigned",
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000098",
    driverName: "Ganapathy",
    driverContactNumber: "1234567890",
    driverAlterContactNumber: "0987654321",
    vehicleNo: "TN18AC5858",
    bookingType: "Daily Rental",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
];

const DriverStatus: React.FC = () => {
  const [driverDetailsModalBox, setDriverDetailsModalBox] =
    React.useState<boolean>(false);

  const [selectedBooking, setSelectedBooking] = React.useState<
    (typeof DriverDetailsDatas)[0] | null
  >(null);

  const [searchDriverStatus, setSearchDriverStatus] =
    React.useState<string>("");

  const handleDriverDetailsModalBox = (index: number) => {
    setSelectedBooking(DriverDetailsDatas[index]);
    setDriverDetailsModalBox(true);
  };

  const handleSendSMS = () => {
    notyf.success(
      "Message sent. Your message has been sent. We'll get back to you soon."
    );
  };

  const navigate = useNavigate();
  const handleBreadCrumbClick = (path: string) => {
    navigate(path);
  };

  const filterDriverDetails = DriverDetailsDatas.filter(
    (DriverDetailsData) =>
      DriverDetailsData.guestName
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase()) ||
      DriverDetailsData.driverStatus
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase()) ||
      DriverDetailsData.bookingId
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase()) ||
      DriverDetailsData.bookingType
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase()) ||
      DriverDetailsData.bookingDate
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase()) ||
      DriverDetailsData.startAddress
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase()) ||
      DriverDetailsData.endAddress
        .toLowerCase()
        .includes(searchDriverStatus.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="row align-items-center justify-content-center pt-3">
          <div className="col-12 col-md-9 col-lg-7 d-flex justify-content-between align-items-center">
            <div className="breadcrumbDiv">
              <span onClick={() => handleBreadCrumbClick("/dashboard")}>
                Dashboard
              </span>
              <IoIosArrowForward /> <span>Drive Details</span>
            </div>
            <div className="signUpTitle">Driver Details</div>
          </div>
        </div>
        <div className="row row-gap-3 align-items-center justify-content-center pt-2 pb-3">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="row row-gap-3 align-items-center">
              <div
                className="searchBarDiv col-12 px-1"
                style={{ height: "58px" }}
              >
                <input
                  type="text"
                  style={{ height: "100%" }}
                  placeholder="Quick Search"
                  value={searchDriverStatus}
                  onChange={(e) => setSearchDriverStatus(e.target.value)}
                />
                <CiSearch style={{ right: "7%" }} />
              </div>
              {filterDriverDetails.length === 0 ? (
                <div className="transactionList bg-secondary-subtle d-flex align-items-center justify-content-center py-4 rounded-4">
                  <div className="resultNotFount w-50 d-flex align-items-center justify-content-center row-gap-2 flex-column">
                    <img src={resultNotFount} alt="resultNotFount" />
                    <div className="recordFound">No Record Found</div>
                  </div>
                </div>
              ) : (
                <>
                  {filterDriverDetails.map((booking, index) => (
                    <div
                      key={index}
                      className="upcomingBookingList border p-2 p-md-4"
                    >
                      <div className="BGCircle"></div>

                      <div className="upcomingBookingDetailsListDiv">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex column-gap-3">
                            <div className="upcomingBookingCabType">
                              <span>Guest Name: {booking.guestName}</span>

                              <span className={`driverNameSpan`}>
                                Driver Status:
                                <span
                                  className="driverStatusDetails"
                                  style={{
                                    color:
                                      booking.driverStatus === "assigned"
                                        ? "var(--PrimaryColor)"
                                        : "#ff4444",
                                  }}
                                >
                                  {booking.driverStatus}
                                  {booking.driverStatus === "assigned" ? (
                                    <span
                                      onClick={() =>
                                        handleDriverDetailsModalBox(index)
                                      }
                                    >
                                      <FaCircleInfo />
                                    </span>
                                  ) : (
                                    " "
                                  )}
                                </span>
                              </span>
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
                          <div className="driverSMSDetailsBtnDiv col-12 col-lg-3">
                            <button onClick={handleSendSMS}>Send SMS</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedBooking && (
        <Modal
          footer={null}
          title={<p>Driver Details</p>}
          open={driverDetailsModalBox}
          onCancel={() => setDriverDetailsModalBox(false)}
        >
          <div className="d-flex flex-column row-gap-3">
            <div className="d-flex flex-column row-gap-1">
              <div className="d-flex justify-content-between">
                <div>Driver Name :</div>
                <div className="driverNameDiv">
                  {selectedBooking.driverName}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Contact Number :</div>
                <div>{selectedBooking.driverContactNumber}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Alter Contact No. :</div>
                <div>{selectedBooking.driverAlterContactNumber}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Vehicle No. :</div>
                <div>{selectedBooking.vehicleNo}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Vehicle Type :</div>
                <div>{selectedBooking.cabType}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
};
export default DriverStatus;
