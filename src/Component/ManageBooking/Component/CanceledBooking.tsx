import React, { useEffect, useState } from "react";
import SUVCab from "../../../Assets/SUV.svg";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { DatePicker } from "antd";
import { CiSearch } from "react-icons/ci";
import resultNotFount from "../../../Assets/recordNotFound.png";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContext";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

// const upcomingBookingData = [
//   {
//     cabType: "Dzire, Etios",
//     similar: "or similar",
//     bookingId: "BTU01CT0000087",
//     bookingType: "Airport Transfer",
//     bookingDate: "Tue 05, Mar 2023 7:00 PM",
//     startAddress:
//       "No: 19, new street, rangavilas thottam, Muthiyalpet, Puducherry-605003",
//     endAddress: "Elnet Software City, Tharamani, Chennai, Tamil Nadu 600113",
//   },
//   {
//     cabType: "Innova, Ertiga",
//     similar: "or similar",
//     bookingId: "BTU01CT0000098",
//     bookingType: "Daily Rental",
//     bookingDate: "Wed 06, Mar 2023 9:00 AM",
//     startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
//     endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
//   },
// ];

interface CanceledBooking {
  drop_location : string;
image : string;
package_type : string;
pickup_location : string;
pickup_time : string;
ref_no : string;
start_date : string;
vehicle_name : string;
}

const CanceledBooking: React.FC = () => {
  const [searchCanceledBooking, setSearchCanceledBooking] =
    React.useState<string>("");
    const {userData, authToken} = useAuth();
    const [selectedDates, setSelectedDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
    const [cancelBookingDatas, setcancelBookingData] = useState<CanceledBooking[]>([]);
  const [originalcancelBookingData, setOriginalcancelBookingData] = useState<CanceledBooking[]>([]);

    useEffect(() => {
      const fetchcancelBooking = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/client/cancelledBooking/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            },
          }
        );
        if(response.data.status){
          setcancelBookingData(response.data.data)
          setOriginalcancelBookingData(response.data.data);
  
        }
      } catch (err) {
        console.log(err);
      }
      
    }
    fetchcancelBooking();
  
    },[]);
    const handleDateChange = (
      dates: [Dayjs | null, Dayjs | null] | null,
      dateStrings: [string, string]
    ) => {
      if (dates) {
        setSelectedDates(dates);
      } else {
        setSelectedDates([null, null]);
      }
    };

 

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchCanceledBooking(query);

    const filteredByText = originalcancelBookingData.filter((booking) =>
      booking.vehicle_name.toLowerCase().includes(query.toLowerCase()) ||
      booking.ref_no.toLowerCase().includes(query.toLowerCase()) ||
      booking.package_type.toLowerCase().includes(query.toLowerCase()) ||
      booking.start_date.toLowerCase().includes(query.toLowerCase()) ||
      booking.pickup_location.toLowerCase().includes(query.toLowerCase()) ||
      booking.drop_location.toLowerCase().includes(query.toLowerCase())
    );

    setcancelBookingData(filteredByText);
  };

  const handleFilter = () => {
    const [startDate, endDate] = selectedDates.map(date => date ? dayjs(date, "DD/MM/YYYY") : null);
    let filteredData = originalcancelBookingData;
    const filteredByDate = filteredData.filter((booking) => {
      const bookingDate = dayjs(booking.start_date, "DD-MM-YYYY");
      return (startDate && endDate)
        ? (bookingDate.isSame(startDate, 'day') || bookingDate.isAfter(startDate, 'day')) &&
          (bookingDate.isSame(endDate, 'day') || bookingDate.isBefore(endDate, 'day'))
        : true;
    });

    setcancelBookingData(filteredByDate);
  };

  return (
    <>
      <div className="px-1 pt-3">
        <div className="d-flex gap-4 pb-2">
          <RangePicker format="DD/MM/YYYY" onChange={handleDateChange} />

          <button onClick={handleFilter} className="primaryBtn px-5">SEARCH</button>
        </div>
        <div className="searchBarDiv" style={{ height: "58px" }}>
          <input
            type="text"
            style={{ height: "100%" }}
            value={searchCanceledBooking}
            // onChange={(e) => setSearchCanceledBooking(e.target.value)}
            onChange={handleTextInputChange}
            placeholder="Quick Search"
          />
          <CiSearch />
        </div>
      </div>

      <div className="d-flex flex-column gap-4 pt-2 pb-3  ">
        {cancelBookingDatas.length === 0 ? (
          <div className="transactionList bg-secondary-subtle d-flex align-items-center justify-content-center py-4 rounded-4">
            <div className="resultNotFount w-50 d-flex align-items-center justify-content-center row-gap-2 flex-column">
              <img src={resultNotFount} alt="resultNotFount" />
              <div className="recordFound">No Record Found</div>
            </div>
          </div>
        ) : (
          <>
            {cancelBookingDatas.map((booking, index) => (
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
