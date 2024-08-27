import React from "react";
import SUVCab from "../../Assets/SUV.svg";
import "./DriverStatus.css";
import Footer from "../Footer/Footer";
import { FaCircleInfo } from "react-icons/fa6";
import { Modal } from "antd";
import { Notyf } from "notyf";

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

const upcomingBookingData = [
  {
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
    (typeof upcomingBookingData)[0] | null
  >(null);

  const handleDriverDetailsModalBox = (index: number) => {
    setSelectedBooking(upcomingBookingData[index]);
    setDriverDetailsModalBox(true);
  };

  const handleSendSMS = () => {
    notyf.success(
      "Message sent. Your message has been sent. We'll get back to you soon."
    );
  };
  return (
    <>
      <div className="container">
        <div className="row row-gap-3 align-items-center justify-content-center py-3">
          <div className="col-12 col-md-8 DashBoardNavBarListTitle">
            Driver Details
          </div>
          {upcomingBookingData.map((booking, index) => (
            <div key={index} className="col-12 col-md-8 mb-3">
              <div className="upcomingBookingList border p-2 p-md-4">
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
                        <span className="driverNameSpan">
                          {booking.driverName}
                          <span
                            onClick={() => handleDriverDetailsModalBox(index)}
                          >
                            <FaCircleInfo />
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
            </div>
          ))}
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
                <div className="driverNameSpan">
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
