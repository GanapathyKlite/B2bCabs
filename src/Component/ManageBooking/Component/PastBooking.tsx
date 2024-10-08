import React, { useEffect, useState } from "react";
// import SUVCab from "../../../Assets/SUV.svg";
import { CiSearch } from "react-icons/ci";
import { DatePicker } from "antd";
import resultNotFount from "../../../Assets/recordNotFound.png";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContext";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface PastBooking {
  drop_location: string;
  image: string;
  package_type: string;
  pickup_location: string;
  pickup_time: string;
  ref_no: string;
  start_date: string;
  vehicle_name: string;
}

const disabledDate = (current: dayjs.Dayjs) => {
  return current && current > dayjs().startOf("day");
};

const PastBooking: React.FC = () => {
  const [searchPastBooking, setSearchPastBooking] = React.useState<string>("");
  const [pastBookingDatas, setPastBookingData] = useState<PastBooking[]>([]);
  const [originalPastBookingData, setOriginalPastBookingData] = useState<PastBooking[]>([]);
  const [dateFilteredData, setDateFilteredData] = useState<PastBooking[]>([]);
  const [selectedDates, setSelectedDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const { userData, authToken } = useAuth();

  useEffect(() => {
    const fetchPastBooking = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/client/pastBooking/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            },
          }
        );
        if (response.data.status) {
          setPastBookingData(response.data.data);
          setOriginalPastBookingData(response.data.data);
          setDateFilteredData(response.data.data); 
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPastBooking();
  }, []);

  const handleFilter = () => {
    const [startDate, endDate] = selectedDates.map(date => date ? dayjs(date, "DD/MM/YYYY") : null);
    let filteredData = originalPastBookingData;

    const filteredByDate = filteredData.filter((booking) => {
      const bookingDate = dayjs(booking.start_date, "DD-MM-YYYY");
      return (startDate && endDate)
        ? (bookingDate.isSame(startDate, 'day') || bookingDate.isAfter(startDate, 'day')) &&
          (bookingDate.isSame(endDate, 'day') || bookingDate.isBefore(endDate, 'day'))
        : true;
    });

    setDateFilteredData(filteredByDate); 
    setPastBookingData(filteredByDate); 
  };

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (dates) {
      setSelectedDates(dates);
    } else {
      setSelectedDates([null, null]);
      setDateFilteredData(originalPastBookingData); 
      setPastBookingData(originalPastBookingData);
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchPastBooking(query);

    const baseData = selectedDates[0] && selectedDates[1] ? dateFilteredData : originalPastBookingData;
    
    const filteredByText = baseData.filter((booking) =>
      booking.vehicle_name.toLowerCase().includes(query) ||
      booking.ref_no.toLowerCase().includes(query) ||
      booking.package_type.toLowerCase().includes(query) ||
      booking.start_date.toLowerCase().includes(query) ||
      booking.pickup_location.toLowerCase().includes(query) ||
      booking.drop_location.toLowerCase().includes(query)
    );

    setPastBookingData(filteredByText);

    if (query === "") {
      setPastBookingData(selectedDates[0] && selectedDates[1] ? dateFilteredData : originalPastBookingData);
    }
  };

  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
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
            value={searchPastBooking}
            onChange={handleTextInputChange}
            placeholder="Quick Search"
          />
          <CiSearch />
        </div>
      </div>
      <div className="d-flex flex-column gap-4 pt-2 pb-3">
        {pastBookingDatas.length === 0 ? (
          <div className="transactionList bg-secondary-subtle d-flex align-items-center justify-content-center py-4 rounded-4">
            <div className="resultNotFount w-50 d-flex align-items-center justify-content-center row-gap-2 flex-column">
              <img src={resultNotFount} alt="resultNotFount" />
              <div className="recordFound">No Record Found</div>
            </div>
          </div>
        ) : (
          <>
            {pastBookingDatas.map((booking, index) => (
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
                          // src={SUVCab}
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
                      <span>{dayjs(booking.start_date, "DD-MM-YYYY").format("ddd D, MMM YYYY")} {booking.pickup_time}</span>
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
                    <div className="completedBookingDetailsText col-12 col-lg-3">
                      Completed
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

export default PastBooking;
