import React from "react";
import SUVCab from "../../Assets/SUV.svg";
import "./UpcomingBooking.css";
import { Modal } from "antd";
import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";

const upcomingBookingData = [
  {
    cabType: "Dzire, Etios",
    similar: "or similar",
    bookingId: "BTU01CT0000001",
    bookingType: "Airport Transfer",
    bookingDate: "Tue 05, Mar 2023 7:00 PM",
    startAddress:
      "No: 19, new street, rangavilas thottam, Muthiyalpet, Puducherry-605003",
    endAddress: "Elnet Software City, Tharamani, Chennai, Tamil Nadu 600113",
  },
  {
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000002",
    bookingType: "Daily Rental",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
  {
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000003",
    bookingType: "Hourly Rental",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
  {
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000004",
    bookingType: "Holiday Package",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
];

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

const UpcomingBooking: React.FC = () => {
  const [reasonModalBoxOpen, setReasonModalBoxOpen] =
    React.useState<boolean>(false);

  const [editModalBox, setEditModalBox] = React.useState<boolean>(false);

  const [selectedBookingIndex, setSelectedBookingIndex] = React.useState<
    number | null
  >(null);

  const handleCancelClick = (index: number) => {
    console.log("Cancel button clicked for index:", index);
    setSelectedBookingIndex(index);
    setReasonModalBoxOpen(true);
  };

  const handleEditClick = (index: number, bookingType: string) => {
    setEditModalBox(true);
    setSelectedBookingIndex(index);

    if (bookingType === "Airport Transfer") {
      console.log("Airport Transfer");
    } else if (bookingType === "Daily Rental") {
      console.log("Daily Rental");
    } else if (bookingType === "Hourly Rental") {
      console.log("Hourly Rental");
    } else if (bookingType === "Holiday Package") {
      console.log("Holiday Package");
    }
  };

  const navigate = useNavigate();

  const changeStayDate = () => {
    setReasonModalBoxOpen(false);
    navigate("/dashboard");
  };

  const handleCancelBtn = () => {
    setReasonModalBoxOpen(false);
    notyf.success("Request sent successfully. We will update you soon.");
  };

  const selectedBooking =
    selectedBookingIndex !== null
      ? upcomingBookingData[selectedBookingIndex]
      : null;

  return (
    <>
      <div className="d-flex flex-column gap-4 py-3">
        {upcomingBookingData.map((booking, index) => (
          <div key={index} className="upcomingBookingList border p-2 p-md-4">
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
                <div className="upcomingBookingDetailsBtnDiv col-12 col-lg-3">
                  <button onClick={() => handleCancelClick(index)}>
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditClick(index, booking.bookingType)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        footer={null}
        title={<p>Canceled Booking</p>}
        open={reasonModalBoxOpen} // This should control the visibility of the modal
        onCancel={() => setReasonModalBoxOpen(false)} // This should close the modal
      >
        <div className="d-flex flex-column row-gap-3">
          <div className="d-flex flex-column row-gap-1">
            <label className="canceledBookingModalBox" htmlFor="email_id">
              <span className="text-success">
                Enter Your Reason for cancelling this booking
              </span>
              <span>
                This information will help us in providing better experience
              </span>
            </label>
            <textarea
              placeholder="Enter Your Reason"
              className="form-control border border-secondary rounded-3 p-3 w-100 upcomingBookingTextArea"
            />
          </div>
          <button
            className="changeStayDate rounded-3 p-3"
            onClick={changeStayDate}
          >
            CHANGE STAY DATES
          </button>
          <button className="px-3 pt-3 cancelBooking" onClick={handleCancelBtn}>
            I want to Cancel the Booking
          </button>
        </div>
      </Modal>

      <Modal
        footer={null}
        title={<p>Edit Booking</p>}
        open={editModalBox}
        onCancel={() => setEditModalBox(false)}
      >
        {selectedBooking &&
          selectedBooking.bookingType === "Airport Transfer" && (
            <div className="d-flex flex-column row-gap-3">Airport Transfer</div>
          )}
        {selectedBooking && selectedBooking.bookingType === "Daily Rental" && (
          <div className="d-flex flex-column row-gap-3">Daily Rental</div>
        )}
        {selectedBooking && selectedBooking.bookingType === "Hourly Rental" && (
          <div className="d-flex flex-column row-gap-3">Hourly Rental</div>
        )}
        {selectedBooking &&
          selectedBooking.bookingType === "Holiday Package" && (
            <div className="d-flex flex-column row-gap-3">Holiday Package</div>
          )}
      </Modal>
    </>
  );
};

export default UpcomingBooking;
