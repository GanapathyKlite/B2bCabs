import React, { useState, useEffect, ChangeEvent } from "react";
import "./CSS/DashboardHero.css";
import bg from "../../../Assets/hero-banner.jpg";
import { MdLocationSearching, MdGpsFixed } from "react-icons/md";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { DatePicker } from "antd";
import { LuCalendarDays } from "react-icons/lu";
import { useAuth } from "../../Auth/AuthContext";
// import "antd/dist/reset.css";
// import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { AxiosError } from "axios";
import AutocompleteInput from "../../AutoComplete/AutocompleInput";
import { Notyf } from "notyf";

interface TabData {
  id: number;
  title: string;
  firstRadioButtonLable?: string;
  secondRadioButtonLable?: string;
  firstRadioButtonValue?: string;
  SecondRadioButtonValue?: string;
  first_input_box_placeholder: string;
  second_input_box_placeholder?: string;
  third_input_box_placeholder?: string;
  fourth_input_box_placeholder?: string;
  icon?: string;
}

const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});

interface Suggestion {
  address: string;
  city: string;
  admin: string;
  province: string;
  geocode: number;
}

interface City {
  id_city: number;
  city_name: string;
}

interface Package {
  id: string;
  route: string;
}

const { RangePicker } = DatePicker;

const tabsData: TabData[] = [
  {
    id: 1,
    title: "Airport Transfer",
    firstRadioButtonLable: "From Airport",
    secondRadioButtonLable: "To Airport",
    firstRadioButtonValue: "fromAirport",
    SecondRadioButtonValue: "toAirport",
    first_input_box_placeholder: "Current Location",
    second_input_box_placeholder: "Enter Destination",
    third_input_box_placeholder: "Pick up Date & Time",
  },
  {
    id: 2,
    title: "Rental",
    firstRadioButtonLable: "Daily Rental",
    secondRadioButtonLable: "Hourly Rental",
    firstRadioButtonValue: "dailyRental",
    SecondRadioButtonValue: "hourlyRental",
    first_input_box_placeholder: "Current Location",
    second_input_box_placeholder: "Select Package",
    third_input_box_placeholder: "Pick up Date & Time",
  },
  {
    id: 3,
    title: "Holidays Package",
    first_input_box_placeholder: "Current Location",
    second_input_box_placeholder: "Enter Destination",
    third_input_box_placeholder: "Pick up Date & Time",
    fourth_input_box_placeholder: "Select Package",
  },
];

const DashboardHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isToggled, setToggled] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  // const [inputValueOne, setInputValueOne] = useState<string>("");
  // const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [locationData, setLocationData] = useState<any>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [startCitySuggestion, setStartCitySuggestion] =
    useState<Suggestion | null>(null);
  const [endCitySuggestion, setEndCitySuggestion] = useState<Suggestion | null>(
    null
  );

  const [startSearchQuery, setStartSearchQuery] = useState<string>("");
  const [endSearchQuery, setEndSearchQuery] = useState<string>("");
  const [startFilteredCities, setStartFilteredCities] = useState<City[]>([]);
  const [endFilteredCities, setEndFilteredCities] = useState<City[]>([]);
  const [selectedStartCity, setSelectedStartCity] = useState<City | null>(null);
  const [selectedEndCity, setSelectedEndCity] = useState<City | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageId, setPackageId] = useState("");

  const {
    authToken,
    inputValueOne,
    setInputValueOne,
    inputValueTwo,
    setInputValueTwo,
    selectedDate,
    setSelectedDate,
    selectedDateRange,
    setSelectedDateRange,
    tripType,
    setTripType,
    hourTime,
    setHourTime,
  } = useAuth();

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  // const handleCurrentLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setToggled(!isToggled);
  // };
  const handleCurrentLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setToggled(!isToggled);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/place/geocode`,
            { lat: latitude.toString(), lng: longitude.toString() },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.status) {
            setLocationData(response.data.data[0]);
            setInputValueOne(response.data.data[0].address);
            setStartCitySuggestion(response.data.data[0]);
          } else {
            console.error("Geocode request failed.");
          }
        } catch (error) {
          console.error("Error fetching geocode data", error);
        } finally {
          setToggled(true);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const storedstartCitySuggestion = sessionStorage.getItem(
      "startCitySuggestion"
    );
    const storedendCitySuggestion = sessionStorage.getItem("endCitySuggestion");
    const storedholidaystartCity = sessionStorage.getItem("holidaystartCity");
    const storedholidayendCity = sessionStorage.getItem("holidayendCity");
    const storedtripType = sessionStorage.getItem("tripType");
    const storedDate = sessionStorage.getItem("selectedDate");
    const storedHourTime = sessionStorage.getItem("hourTime");
    const storedDateRange = sessionStorage.getItem("selectedDateRange");
    if (storedDateRange) {
      const parsedDates = JSON.parse(storedDateRange);
      setSelectedDateRange([dayjs(parsedDates[0]), dayjs(parsedDates[1])]);
    }
    if (storedHourTime) {
      setHourTime(storedHourTime);
    }
    if (storedDate) {
      setSelectedDate(dayjs(storedDate));
    }
    if (storedtripType) {
      setTripType(storedtripType);
    }
    if (storedstartCitySuggestion) {
      const suggestionObject = JSON.parse(storedstartCitySuggestion);
      setInputValueOne(suggestionObject.address);
      setStartCitySuggestion(suggestionObject);
    }
    if (storedendCitySuggestion) {
      const suggestionObject = JSON.parse(storedendCitySuggestion);
      setInputValueTwo(suggestionObject.address);
      setEndCitySuggestion(suggestionObject);
    }
    if (storedholidaystartCity) {
      const suggestionObject = JSON.parse(storedholidaystartCity);
      setSelectedStartCity(suggestionObject);
      setStartSearchQuery(suggestionObject.city_name);
    }
    if (storedholidayendCity) {
      const suggestionObject = JSON.parse(storedholidayendCity);
      setSelectedEndCity(suggestionObject);
      setEndSearchQuery(suggestionObject.city_name);
    }
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/city/all`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCities(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      if (selectedStartCity && selectedEndCity && selectedDateRange) {
        const requestData = {
          startCity: selectedStartCity.id_city,
          endCity: selectedEndCity.id_city,
          startDate: formattedDates?.start_date,
          endDate: formattedDates?.end_date,
        };

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/place/holidayPackage`,
            requestData,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.status) {
            if (
              response.data.data !==
              "We don't have Packages in selected cities."
            ) {
              setPackages(response.data.data);
              const storedPackageid = sessionStorage.getItem("packageId");
              if (storedPackageid) {
                setPackageId(storedPackageid);
              }
            } else {
              setPackages([]);
              setPackageId("");
            }
          }
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
    };

    fetchPackages();
  }, [selectedStartCity, selectedEndCity, selectedDateRange]);

  useEffect(() => {
    if (startSearchQuery.length > 2) {
      const filtered = cities.filter((city) =>
        city.city_name.toLowerCase().includes(startSearchQuery.toLowerCase())
      );
      setStartFilteredCities(filtered);
    } else {
      setStartFilteredCities([]);
    }
  }, [startSearchQuery, cities]);

  useEffect(() => {
    if (endSearchQuery.length > 2) {
      const filtered = cities.filter((city) =>
        city.city_name.toLowerCase().includes(endSearchQuery.toLowerCase())
      );
      setEndFilteredCities(filtered);
    } else {
      setEndFilteredCities([]);
    }
  }, [endSearchQuery, cities]);

  useEffect(() => {
    if (activeTab === 1) {
      if (selectedOption === "option1") {
        setTripType("Cab From Airport");
      } else if (selectedOption === "option2") {
        setTripType("Cab To Airport");
      }
    } else if (activeTab === 2) {
      if (selectedOption === "option1") {
        setTripType("Daily Rental");
      } else if (selectedOption === "option2") {
        setTripType("Hourly Rental");
      }
    } else if (activeTab === 3) {
      setTripType("Holidays Package");
    }
  }, [activeTab, selectedOption]);

  const handleToggle = (option: string) => {
    setSelectedOption(option);
  };
  const navigate = useNavigate();
  // const handleSubmit = async() => {
  //   navigate("/dashboard/cablist");
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    sessionStorage.setItem("tripType", tripType);
    let start_city, end_city;
    if (startCitySuggestion) {
      start_city = {
        city: startCitySuggestion.city,
        admin: startCitySuggestion.admin,
        province: startCitySuggestion.province,
      };
    }
    if (endCitySuggestion) {
      end_city = {
        city: endCitySuggestion.city,
        admin: endCitySuggestion.admin,
        province: endCitySuggestion.province,
      };
    }
    if (
      (tripType === "Cab From Airport" || tripType === "Cab To Airport") &&
      startCitySuggestion &&
      endCitySuggestion &&
      formattedDate
    ) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/price/airportPickup`,
          {
            start_city,
            end_city,
            start_date: formattedDate.start_date,
            pickup_time: formattedDate.pickup_time,
          },

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          const cardata = response.data.data;
          sessionStorage.setItem("carData", JSON.stringify(cardata));
          sessionStorage.setItem("duration", response.data.duration);
          sessionStorage.setItem("km", response.data.km);

          const canceldate = formattedDate?.start_date;
          sessionStorage.setItem("canceldate", canceldate || "");
          navigate("/dashboard/cablist",{state: {car: true}});
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          notyf.error(error.response?.data?.message);
        }
      }
    }
    if (
      tripType === "Daily Rental" &&
      startCitySuggestion &&
      endCitySuggestion &&
      formattedDates
    ) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/price/dayRental`,
          {
            start_city,
            end_city,
            start_date: formattedDates?.start_date,
            end_date: formattedDates?.end_date,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          const cardata = response.data.data;
          sessionStorage.setItem("carData", JSON.stringify(cardata));
          sessionStorage.setItem("duration", response.data.duration);
          sessionStorage.setItem("km", response.data.km);
          const canceldate = formattedDates?.start_date;
          sessionStorage.setItem("canceldate", canceldate || "");
          navigate("/dashboard/cablist",{state: {car: true}});
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          notyf.error(error.response?.data?.message);
        }
      }
    }
    if (tripType === "Hourly Rental" && startCitySuggestion && formattedDate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/price/hourRental`,
          {
            start_city,
            start_date: formattedDate.start_date,
            pickup_time: formattedDate.pickup_time,
            hour_package_type: parseInt(hourTime),
          },

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          const cardata = response.data.data;
          sessionStorage.setItem("carData", JSON.stringify(cardata));
          const canceldate = formattedDate.start_date;
          sessionStorage.setItem("canceldate", canceldate || "");

          if (hourTime === "1") {
            sessionStorage.setItem("duration", "2 hr");
            sessionStorage.setItem("km", "20");
          } else if (hourTime === "2") {
            sessionStorage.setItem("duration", "4 hr");
            sessionStorage.setItem("km", "40");
          } else if (hourTime === "3") {
            sessionStorage.setItem("duration", "6 hr");
            sessionStorage.setItem("km", "60");
          } else if (hourTime === "4") {
            sessionStorage.setItem("duration", "8 hr");
            sessionStorage.setItem("km", "80");
          } else if (hourTime === "5") {
            sessionStorage.setItem("duration", "10 hr");
            sessionStorage.setItem("km", "100");
          }
          navigate("/dashboard/cablist",{state: {car: true}});
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          notyf.error(error.response?.data?.message);
        }
      }
    }
    if (tripType === "Holidays Package" && formattedDates && packageId) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/price/holidayPackage`,
          { packageId: packageId, travel_date: formattedDates?.start_date },

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          sessionStorage.setItem("duration", "");
          sessionStorage.setItem("km", "0");
          let period = {
            noOfDays: response.data.noOfDays,
            noOfNights: response.data.noOfNights,
          };
          sessionStorage.setItem("period", JSON.stringify(period));
          const cardata = response.data.data;
          sessionStorage.setItem("carData", JSON.stringify(cardata));
          const canceldate = formattedDates?.start_date;
          sessionStorage.setItem("canceldate", canceldate || "");
          navigate("/dashboard/cablist",{state: {car: true}});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const inputFieldOne = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputOneValue = e.target.value;
    setInputValueOne(inputOneValue);
  };

  const inputFieldTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTwoValue = e.target.value;
    setInputValueTwo(inputTwoValue);
  };

  const handleStartCitySuggestionSelect = (suggestion: Suggestion) => {
    setStartCitySuggestion(suggestion);
    sessionStorage.setItem("startCitySuggestion", JSON.stringify(suggestion));
  };

  const handleEndCitySuggestionSelect = (suggestion: Suggestion) => {
    setEndCitySuggestion(suggestion);
    sessionStorage.setItem("endCitySuggestion", JSON.stringify(suggestion));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      sessionStorage.setItem("selectedDate", date.toISOString());
    } else {
      sessionStorage.removeItem("selectedDate");
    }
  };

  const handleRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setSelectedDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      sessionStorage.setItem(
        "selectedDateRange",
        JSON.stringify([dates[0].toISOString(), dates[1].toISOString()])
      );
    } else {
      sessionStorage.removeItem("selectedDateRange");
    }
  };

  const formattedDate = {
    start_date: selectedDate?.format("DD-MM-YYYY"),
    pickup_time: selectedDate?.format("h:mm A"),
  };

  const formatDateRange = (
    dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      const formattedStartDate = startDate.format("DD-MM-YYYY");
      const formattedEndDate = endDate.format("DD-MM-YYYY");
      return {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      };
    }
  };
  const formattedDates = formatDateRange(selectedDateRange);

  const handleStartSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartSearchQuery(e.target.value);
  };

  const handleEndSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndSearchQuery(e.target.value);
  };

  const handleStartCitySelect = (city: City) => {
    setSelectedStartCity(city);
    setStartSearchQuery(city.city_name);
    sessionStorage.setItem("holidaystartCity", JSON.stringify(city));
    setStartFilteredCities([]);
  };

  const handleEndCitySelect = (city: City) => {
    setSelectedEndCity(city);
    setEndSearchQuery(city.city_name);
    sessionStorage.setItem("holidayendCity", JSON.stringify(city));
    setEndFilteredCities([]);
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPackageId(e.target.value);
    sessionStorage.setItem("packageId", e.target.value);
  };

  const disabledrangeDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    const today = dayjs().startOf('day');
    const sixMonthsLater = dayjs().add(6, 'month').endOf('day');
    return current.isBefore(today) || current.isAfter(sixMonthsLater);
  };
  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
  
    return current.isBefore(dayjs().startOf('day')) || current.isAfter(dayjs().add(30, 'day').endOf('day'));
  };

  const getDisabledTime = (date: any) => {
    if (!date) return {};
  
    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();
    const isToday = date.isSame(now, 'day');
  
    if (isToday) {
      return {
        disabledHours: () => Array.from({ length: currentHour + 1 }, (_, i) => i),
        disabledMinutes: (hour: number) => {
          if (hour === currentHour + 1) {
            return Array.from({ length: currentMinute + 1 }, (_, i) => i);
          }
          return [];
        },
        disabledSeconds: () => [],
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  };

  
  return (
    <>
      <div className="hero-banner">
        <div className="overlay"></div>
        <img src={bg} alt="Hero Banner" className="video" />
      </div>
      <div className="container-lg container-fluid position-relative height">
        <div className="row justify-content-center ">
          <div className="col-lg-12 mobile_sc">
            <div className="col-md-5 col-lg-4 justify-content-around tab_box">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab_btn ${activeTab === tab.id ? "actives" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="content_box">
              {tabsData.map((tab) => (
                <form onSubmit={handleSubmit}>
                  <div
                    key={tab.id}
                    className={`content ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                  >
                    {tab.id === 3 ? (
                      <div className="d-flex text-body-secondary m-0 h5 fw-light py-1 py-sm-2">
                        Select Your Holiday's Package
                      </div>
                    ) : (
                      <>
                        <div
                          className={`row ${
                            tab.id === 3 ? "d-none" : ""
                          } text-nowrap`}
                        >
                          <div className="radio-input-wrapper d-flex col-md-5 gap-2 pb-2">
                            <label
                              className={`label px-0 px-sm-2 px-md-3 py-1 py-sm-2`}
                            >
                              <input
                                type="radio"
                                id={tab.firstRadioButtonValue}
                                className="radio-type"
                                value={tab.firstRadioButtonValue}
                                checked={selectedOption === "option1"}
                                onChange={() => handleToggle("option1")}
                              />
                              <div className="label-text">
                                {tab.firstRadioButtonLable}
                              </div>
                            </label>
                            <label
                              className={`label px-0 px-sm-2 px-md-3 py-1 py-sm-2`}
                            >
                              <input
                                type="radio"
                                id={tab.SecondRadioButtonValue}
                                className="radio-type"
                                value={tab.SecondRadioButtonValue}
                                checked={selectedOption === "option2"}
                                onChange={() => handleToggle("option2")}
                              />
                              <div className="label-text">
                                {tab.secondRadioButtonLable}
                              </div>
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row justify-content-center row-gap-3 align-items-center position-relative">
                      <div className="col-lg-3 col-md-3 z-1">
                        <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                          <div
                            className={`${tab.id === 1 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <FaPlaneArrival className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 2 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 3 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div className="autocomplete-container">
                            {/* <input
                            onChange={inputFieldOne}
                            value={inputValueOne}
                            type="text"
                            required
                            className="inputbox w-75"
                            placeholder={`${
                              tab.id === 1 && selectedOption === "option1"
                                ? "Enter Airport Name"
                                : "Enter Pickup Address"
                            }`}
                          /> */}
                            {tripType !== "Holidays Package" ? (
                              <>
                                <AutocompleteInput
                                  inputValue={inputValueOne}
                                  onChange={inputFieldOne}
                                  onSuggestionSelect={
                                    handleStartCitySuggestionSelect
                                  }
                                  placeholder={`${
                                    tab.id === 1 && selectedOption === "option1"
                                      ? "Enter Airport Name"
                                      : "Enter Pickup Address"
                                  }`}
                                  required={true}
                                  className="w-75"
                                />
                              </>
                            ) : (
                              <>
                                <input
                                  type="text"
                                  value={startSearchQuery}
                                  onChange={handleStartSearchChange}
                                  placeholder="Select start city"
                                />
                                {startFilteredCities.length > 0 && (
                                  <ul>
                                    {startFilteredCities.map((city) => (
                                      <li
                                        key={city.id_city}
                                        onClick={() =>
                                          handleStartCitySelect(city)
                                        }
                                      >
                                        {city.city_name}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            )}
                          </div>

                          {/* <button
                            className={`currentlocationbtn ${
                              selectedOption === "option1" && tab.id === 1
                                ? "invisible"
                                : "opacity-1"
                            }`}
                            onClick={handleCurrentLocation}
                          >
                            {isToggled ? (
                              <MdGpsFixed className="clicked" />
                            ) : (
                              <MdLocationSearching className="notclicked" />
                            )}
                          </button> */}
                        </div>
                      </div>
                      {/* <hr
                        className={`hrLine d-block d-sm-none d-md-none d-lg-none d-xl-none`}
                        style={{ top: tab.id === 3 ? "30%" : "50%" }}
                      /> */}

                      <div className="col-lg-3 col-md-3 z-1">
                        <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                          <div
                            className={`${tab.id === 1 ? "d-flex" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <FaPlaneDeparture className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 2 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <LuClock4 className="icon" />
                            )}
                          </div>
                          <div
                            className={`${tab.id === 3 ? "d-block" : "d-none"}`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <LuClock4 className="icon" />
                            )}
                          </div>

                          <div
                            className={`${
                              tab.id === 2 && selectedOption === "option2"
                                ? "d-none"
                                : "d-flex w-75"
                            }`}
                          >
                            {/* <input
                              type="text"
                              onChange={inputFieldTwo}
                              value={inputValueTwo}
                              required={tripType !== "Hourly Rental"}
                              className="inputbox w-100 m-0"
                              placeholder={`${
                                tab.id === 1 && selectedOption === "option2"
                                  ? "Enter Airport Name"
                                  : "Enter Drop Address"
                              }`}
                            /> */}
                            {tripType !== "Holidays Package" ? (
                              <>
                                <AutocompleteInput
                                  inputValue={inputValueTwo}
                                  onChange={inputFieldTwo}
                                  onSuggestionSelect={
                                    handleEndCitySuggestionSelect
                                  }
                                  placeholder={`${
                                    tab.id === 1 && selectedOption === "option2"
                                      ? "Enter Airport Name"
                                      : "Enter Drop Address"
                                  }`}
                                  required={tripType !== "Hourly Rental"}
                                  className="w-100 m-0"
                                />
                              </>
                            ) : (
                              <>
                                <div className="autocomplete-container">
                                  <input
                                    type="text"
                                    value={endSearchQuery}
                                    onChange={handleEndSearchChange}
                                    placeholder="Select end city"
                                  />
                                  {endFilteredCities.length > 0 && (
                                    <ul>
                                      {endFilteredCities.map((city) => (
                                        <li
                                          key={city.id_city}
                                          onClick={() =>
                                            handleEndCitySelect(city)
                                          }
                                        >
                                          {city.city_name}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div
                            className={`${
                              tab.id === 2 && selectedOption === "option2"
                                ? "d-flex w-75 justify-content-between"
                                : "d-none"
                            }`}
                          >
                            <select
                              className="inputbox m-0 w-100"
                              onChange={(e) => {
                                setHourTime(e.target.value);
                                sessionStorage.setItem(
                                  "hourTime",
                                  e.target.value
                                );
                              }}
                              value={hourTime}
                            >
                              <option value={1}>2h 20km</option>
                              <option value={2}>4h 40km</option>
                              <option value={3}>6h 60km</option>
                              <option value={4}>8h 80km</option>
                              <option value={5}>10h 100km</option>
                            </select>
                          </div>
                          <button
                            className={`currentlocationbtn ${
                              tab.id === 2 && selectedOption === "option2"
                                ? "invisible"
                                : "invisible"
                            }`}
                          >
                            <MdLocationSearching />
                          </button>
                        </div>
                      </div>
                      {/* <hr className="hrLine d-block d-sm-none" /> */}

                      {/* <div className="divline d-none d-sm-block d-md-none d-lg-none d-xl-none">
                        <hr className="hrLine" />
                      </div> */}
                      {tab.id === 1 ||
                      (tab.id === 2 && selectedOption === "option2") ? (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv px-3 py-0  m-0 d-flex align-items-center justify-content-between">
                              <LuCalendarDays />

                              {tab.id === 2 && selectedOption === "option2" ? (
                                <DatePicker
                                required
                                format="ddd, MMM D"
                                suffixIcon={null}
                                className="border-0 w-75 p-0"
                                allowClear={false}
                                disabledDate={disabledDate}
                                showNow={false}
                                onChange={handleDateChange}
                                value={selectedDate}
                              />):(<DatePicker
                                required
                                format="ddd, MMM D, h:mm A"
                                suffixIcon={null}
                                className="border-0 w-75 p-0"
                                allowClear={false}
                                disabledDate={disabledDate}
                                disabledTime={(date) => getDisabledTime(date)}
                                showTime={{
                                  use12Hours: true,
                                  format: "h:mm A",
                                }}
                                onChange={handleDateChange}
                                showNow={false}
                                value={selectedDate}
                              />)}
                             
                              <LuCalendarDays className="invisible" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv px-3 py-0  m-0 d-flex align-items-center justify-content-between">
                              <LuCalendarDays />
                              {tab.id === 2 && selectedOption === "option1" ? (
                                <RangePicker
                                required
                                format="ddd, MMM D"
                                suffixIcon={null}
                                className="border-0 w-75 p-0"
                                allowClear={false}
                                onChange={handleRangeChange}
                                disabledDate={disabledDate}
                                value={selectedDateRange}
                              />
                              ):
                              <RangePicker
                                required
                                format="ddd, MMM D"
                                suffixIcon={null}
                                className="border-0 w-75 p-0"
                                allowClear={false}
                                onChange={handleRangeChange}
                                disabledDate={disabledrangeDate}
                                value={selectedDateRange}
                              />}
                              <LuCalendarDays className="invisible" />
                            </div>
                          </div>
                        </>
                      )}

                      {tab.id === 3 ? (
                        <>
                          {/* <hr className="hrLine d-block d-sm-none" /> */}

                          {/* <div className="divline d-none d-sm-block d-md-none d-lg-none d-xl-none">
                            <hr className="hrLine" />
                          </div> */}
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                              {/* <select className="inputbox m-0 w-100">
                                <option value="1">Select Your Package</option>
                                <option value="1">
                                  Cochin - Munnar (2N) - Alleppy (1N)
                                </option>
                              </select> */}
                              {packages.length !== 0 ? (
                                <>
                                  <select
                                    className="inputbox m-0 w-100"
                                    onChange={handlePackageChange}
                                    value={packageId || ""}
                                  >
                                    <option value="">
                                      Select Your Package
                                    </option>
                                    {packages.map((pkg) => (
                                      <option key={pkg.id} value={pkg.id}>
                                        {pkg.route}
                                      </option>
                                    ))}
                                  </select>
                                </>
                              ) : (
                                <>Not available</>
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}

                      <div className="col-lg-3 col-md-3 z-1">
                        <button
                          type="submit"
                          className="text-nowrap search_btn w-100 py-lg-3 px-lg-4 py-md-2 px-md-3"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
