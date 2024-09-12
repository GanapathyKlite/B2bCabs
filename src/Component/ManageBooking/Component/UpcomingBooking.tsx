import React, { useEffect, useState } from "react";
// import SUVCab from "../../../Assets/SUV.svg";
import { Modal } from "antd";
import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";
import resultNotFount from "../../../Assets/recordNotFound.png";
import { CiSearch } from "react-icons/ci";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../Auth/AuthContext";
import axios from "axios";

const { RangePicker } = DatePicker;

interface upcomingBooking {
  id: string;
  drop_location : string;
image : string;
package_type : string;
pickup_location : string;
pickup_time : string;
ref_no : string;
start_date : string;
vehicle_name : string;
status: number;
}

// const upcomingBookingData = [
//   {
//     cabType: "Dzire, Etios",
//     similar: "or similar",
//     bookingId: "BTU01CT0000001",
//     bookingType: "Airport Transfer",
//     bookingDate: "Tue 05, Mar 2023 7:00 PM",
//     startAddress:
//       "No: 19, new street, rangavilas thottam, Muthiyalpet, Puducherry-605003",
//     endAddress: "Elnet Software City, Tharamani, Chennai, Tamil Nadu 600113",
//   },
//   {
//     cabType: "Innova, Ertiga",
//     similar: "or similar",
//     bookingId: "BTU01CT0000002",
//     bookingType: "Daily Rental",
//     bookingDate: "Wed 06, Mar 2023 9:00 AM",
//     startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
//     endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
//   },
//   {
//     cabType: "Innova, Ertiga",
//     similar: "or similar",
//     bookingId: "BTU01CT0000003",
//     bookingType: "Hourly Rental",
//     bookingDate: "Wed 06, Mar 2023 9:00 AM",
//     startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
//     endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
//   },
//   {
//     cabType: "Innova, Ertiga",
//     similar: "or similar",
//     bookingId: "BTU01CT0000004",
//     bookingType: "Holiday Package",
//     bookingDate: "Wed 06, Mar 2023 9:00 AM",
//     startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
//     endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
//   },
// ];

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

const disabledDate = (current: dayjs.Dayjs) => {
  // Can not select days before today
  return current && current < dayjs().startOf("day");
};
const UpcomingBooking: React.FC = () => {
  const {userData, authToken} = useAuth();
  const [upcomingBookingData, setupcomingBookingData] = useState<upcomingBooking[]>([]);
  const [originalUpcomingBookingData, setOriginalUpcomingBookingData] = useState<upcomingBooking[]>([]);
  const [bookingid, setbookingid] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [selectedDates, setSelectedDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [filteredByDateData, setFilteredByDateData] = useState<upcomingBooking[]>([]);

  const fetchupBooking = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/client/upComingBooking/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.status) {
        setupcomingBookingData(response.data.data);
        setOriginalUpcomingBookingData(response.data.data);
        setFilteredByDateData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchupBooking();
  }, []);

  const [reasonModalBoxOpen, setReasonModalBoxOpen] =
    React.useState<boolean>(false);

  const [editModalBox, setEditModalBox] = React.useState<boolean>(false);

  const [selectedBookingIndex, setSelectedBookingIndex] = React.useState<
    number | null
  >(null);

  const handleCancelClick = (index: number) => {
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

  const handleCancelBtn = async() => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/client/cancel/${parseInt(bookingid)}`,
        {cancel_reason: cancelReason},
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        }
      );
      if(response.data.status){
        notyf.success("Request sent successfully. We will update you soon.");
        setReasonModalBoxOpen(false);
        fetchupBooking();
      }
    } catch (err) {
      notyf.error("Error occured in cancel booking")
      console.log(err);
    }
  };

  const selectedBooking =
    selectedBookingIndex !== null
      ? upcomingBookingData[selectedBookingIndex]
      : null;

  const [searchUpcomingBooking, setSetsearchUpcomingBooking] =
    React.useState<string>("");

    const handleFilter = () => {
      const [startDate, endDate] = selectedDates.map(date => date ? dayjs(date, "DD/MM/YYYY") : null);
      let filteredData = originalUpcomingBookingData;
      const filteredByDate = filteredData.filter((booking) => {
        const bookingDate = dayjs(booking.start_date, "DD-MM-YYYY");
        return (startDate && endDate)
          ? (bookingDate.isSame(startDate, 'day') || bookingDate.isAfter(startDate, 'day')) &&
            (bookingDate.isSame(endDate, 'day') || bookingDate.isBefore(endDate, 'day'))
          : true;
      });
  
      setupcomingBookingData(filteredByDate);
      setFilteredByDateData(filteredByDate);
    };
    
    
    
    
    

  // const filterUpcomingBooking = upcomingBookingData.filter(
  //   (UpcomingData) =>
  //     UpcomingData.vehicle_name
  //       .toLowerCase()
  //       .includes(searchUpcomingBooking.toLowerCase()) ||
  //     UpcomingData.ref_no
  //       .toLowerCase()
  //       .includes(searchUpcomingBooking.toLowerCase()) ||
  //     UpcomingData.package_type
  //       .toLowerCase()
  //       .includes(searchUpcomingBooking.toLowerCase()) ||
  //     UpcomingData.start_date
  //       .toLowerCase()
  //       .includes(searchUpcomingBooking.toLowerCase()) ||
  //     UpcomingData.pickup_location
  //       .toLowerCase()
  //       .includes(searchUpcomingBooking.toLowerCase()) ||
  //     UpcomingData.drop_location
  //       .toLowerCase()
  //       .includes(searchUpcomingBooking.toLowerCase())
  // );

  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`; 
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (dates) {
      setSelectedDates(dates);
    } else {
      setSelectedDates([null, null]);
      setupcomingBookingData(originalUpcomingBookingData);
        setFilteredByDateData(originalUpcomingBookingData);
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSetsearchUpcomingBooking(query);

    const dataToFilter = selectedDates[0] || selectedDates[1] ? filteredByDateData : originalUpcomingBookingData;

    const filteredByText = dataToFilter.filter((booking) =>
      booking.vehicle_name.toLowerCase().includes(query) ||
      booking.ref_no.toLowerCase().includes(query) ||
      booking.package_type.toLowerCase().includes(query) ||
      booking.start_date.toLowerCase().includes(query) ||
      booking.pickup_location.toLowerCase().includes(query) ||
      booking.drop_location.toLowerCase().includes(query)
    );

    setupcomingBookingData(filteredByText);
    if (query === "") {
      setupcomingBookingData(selectedDates[0] && selectedDates[1] ? filteredByDateData : originalUpcomingBookingData);
    }
  };
  return (
    <>
      <div className="px-1 pt-3">
        <div className="d-flex gap-4 pb-2">
          <RangePicker format="DD/MM/YYYY" onChange={handleDateChange} disabledDate={disabledDate} />

          <button onClick={handleFilter} className="primaryBtn px-5">SEARCH</button>
        </div>
        <div className="searchBarDiv" style={{ height: "58px" }}>
          <input
            type="text"
            style={{ height: "100%" }}
            value={searchUpcomingBooking}
            // onChange={(e) => setSetsearchUpcomingBooking(e.target.value)}
            onChange={handleTextInputChange}
            placeholder="Quick Search"
          />
          <CiSearch />
        </div>
      </div>
      <div className="d-flex flex-column gap-4 pt-2 pb-3">
        {upcomingBookingData.length === 0 ? (
          <div className="transactionList bg-secondary-subtle d-flex align-items-center justify-content-center py-4 rounded-4">
            <div className="resultNotFount w-50 d-flex align-items-center justify-content-center row-gap-2 flex-column">
              <img src={resultNotFount} alt="resultNotFount" />
              <div className="recordFound">No Record Found</div>
            </div>
          </div>
        ) : (
          <>
            {upcomingBookingData.map((booking, index) => (
              <div
                key={index}
                className="upcomingBookingList border p-2 p-md-4"
              >
                <div className="BGCircle"></div>

                <div className="upcomingBookingDetailsListDiv">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex column-gap-3">
                      <div className="border upcomingBookingCabImg">
                        <img
                        //  src={SUVCab}
                         src={`${imageURL}${booking.image}`}
                          alt="" className="w-100" />
                      </div>

                      <div className="upcomingBookingCabType">
                        <span>{booking.vehicle_name}</span>
                        {/* <span>{booking.similar}</span> */}
                        <span>or similar</span>
                      </div>
                    </div>
                    <div className="upcomingBookingCabDetails">
                      <span>{booking.ref_no}</span>
                      <span>{booking.package_type}</span>
                      <span>{ dayjs(booking.start_date, "DD-MM-YYYY").format("ddd D, MMM YYYY")} {booking.pickup_time}</span>
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
                        <p>{booking.pickup_location}</p>
                        <p>{booking.drop_location}</p>
                      </div>
                    </div>
                    {booking.status === 0 ? (<>
                      <div className="upcomingBookingDetailsBtnDiv col-12 col-lg-3">
                      <button onClick={() =>{ 
                        handleCancelClick(index)
                        setbookingid(booking.id)}}>
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          handleEditClick(index, booking.package_type)
                        }
                      >
                        Edit
                      </button>
                    </div>
                    </>): null}

                    {booking.status === 2 ? (<>
                      <div className="upcomingBookingDetailsBtnDiv col-12 col-lg-3">
                      
                      <button
                      >
                        Waiting for Approve
                      </button>
                    </div>
                    </>): null}
                    
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <Modal
        footer={null}
        title={<p>Cancel Booking</p>}
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
            value={cancelReason}
            onChange={(e)=>{setCancelReason(e.target.value)}}
              placeholder="Enter Your Reason*"
              className="form-control border border-secondary rounded-3 p-3 w-100 upcomingBookingTextArea"
            />
          </div>
          {/* <button
            className="changeStayDate rounded-3 p-3"
            onClick={changeStayDate}
          >
            CHANGE STAY DATES
          </button> */}
          <button disabled={!cancelReason} className="px-3 pt-3 cancelBooking" onClick={handleCancelBtn}>
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
          selectedBooking.package_type === "Airport Transfer" && (
            <div className="d-flex flex-column row-gap-3">Airport Transfer</div>
          )}
        {selectedBooking && selectedBooking.package_type === "Daily Rental" && (
          <div className="d-flex flex-column row-gap-3">Daily Rental</div>
        )}
        {selectedBooking && selectedBooking.package_type === "Hourly Rental" && (
          <div className="d-flex flex-column row-gap-3">Hourly Rental</div>
        )}
        {selectedBooking &&
          selectedBooking.package_type === "Holiday Package" && (
            <div className="d-flex flex-column row-gap-3">Holiday Package</div>
          )}
      </Modal>
    </>
  );
};

export default UpcomingBooking;
