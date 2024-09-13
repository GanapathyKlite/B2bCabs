import React, { useState, useEffect, ChangeEvent } from "react";
import { FaAngleDown, FaAngleUp, FaRupeeSign } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { useAuth } from "../../Auth/AuthContext";
import dayjs, { Dayjs } from "dayjs";
import AutocompleteInput from "../../AutoComplete/AutocompleInput";
import axios from "axios";
import { AxiosError } from "axios";
import CarHero from "./CarHero";
import "./CarListNavBar.css";

interface Option {
  icon: JSX.Element;
  color: string;
  text: string;
}

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

const CarListNavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your option");
  const [carData, setCarData] = useState([]);
  const [duration, setDuration] = useState("");
  const [km, setKm] = useState(0);
  const [period, setPeriod] = useState({ noOfDays: 0, noOfNights: 0 });
  const [cities, setCities] = useState<City[]>([]);
  const [cancelDate, setCanceldate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
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
    inputValueOne,
    inputValueTwo,
    selectedDate,
    selectedDateRange,
    tripType,
    setTripType,
    setInputValueOne,
    setInputValueTwo,
    setSelectedDate,
    setSelectedDateRange,
    hourTime,
    setHourTime,
    authToken,
  } = useAuth();

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
    const storedCarData = sessionStorage.getItem("carData");
    const storedduration = sessionStorage.getItem("duration");
    const storedkm = sessionStorage.getItem("km");
    const storedPeriod = sessionStorage.getItem("period");
    const storedCanceldate = sessionStorage.getItem("canceldate");

    if (storedCanceldate) {
      setCanceldate(storedCanceldate);
    }

    if (storedPeriod) {
      const parsedperiod = JSON.parse(storedPeriod);
      setPeriod(parsedperiod);
    }

    if (storedduration) {
      setDuration(storedduration);
    }
    if (storedkm) {
      setKm(parseInt(storedkm));
    }
    if (storedCarData) {
      const parsedcarData = JSON.parse(storedCarData);
      setCarData(parsedcarData);
    }
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

  const options: Option[] = [
    { icon: <FaRupeeSign />, color: "#171515", text: "Cab From Airport" },
    { icon: <FaRupeeSign />, color: "#E1306C", text: "Cab To Airport" },
    { icon: <FaRupeeSign />, color: "#0E76A8", text: "Daily Rental" },
    { icon: <FaRupeeSign />, color: "#4267B2", text: "Hourly Rental" },
    { icon: <FaRupeeSign />, color: "#1DA1F2", text: "Holidays Package" },
  ];

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (text: string) => {
    setSelectedOption(text);
    setTripType(text);
    sessionStorage.setItem("tripType", text);
    setIsActive(false);
  };

  const inputFieldOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputOneValue = e.target.value;
    setInputValueOne(inputOneValue);
  };

  const inputFieldTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTwoValue = e.target.value;
    setInputValueTwo(inputTwoValue);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
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

  const handleStartCitySuggestionSelect = (suggestion: Suggestion) => {
    setStartCitySuggestion(suggestion);
    sessionStorage.setItem("startCitySuggestion", JSON.stringify(suggestion));
  };

  const handleEndCitySuggestionSelect = (suggestion: Suggestion) => {
    setEndCitySuggestion(suggestion);
    sessionStorage.setItem("endCitySuggestion", JSON.stringify(suggestion));
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

  const formattedDate = {
    start_date: selectedDate?.format("DD-MM-YYYY"),
    pickup_time: selectedDate?.format("h:mm A"),
  };
  const formattedDates = formatDateRange(selectedDateRange);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    setCarData([]);
    setPeriod({ noOfDays: 0, noOfNights: 0 });
    setDuration("");
    setKm(0);
    setCanceldate("");

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
          setCarData(response.data.data);
          sessionStorage.setItem("carData", JSON.stringify(response.data.data));

          setDuration(response.data.duration);
          setKm(response.data.km);
          sessionStorage.setItem("duration", response.data.duration);
          sessionStorage.setItem("km", response.data.km);
          setCanceldate(formattedDates?.start_date || "");
          sessionStorage.setItem(
            "canceldate",
            formattedDates?.start_date || ""
          );
          let period = { noOfDays: 0, noOfNights: 0 };
          sessionStorage.setItem("period", JSON.stringify(period));
        }
      } catch (error) {
        console.log(error);
        setCarData([]);
        setDuration("");
        setKm(0);
        setCanceldate("");
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message);
        }
      }
    }

    if (
      (tripType === "Cab From Airport" || tripType === "Cab To Airport") &&
      startCitySuggestion &&
      endCitySuggestion &&
      formattedDate.start_date
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
          setCarData(response.data.data);
          sessionStorage.setItem("carData", JSON.stringify(response.data.data));
          setDuration(response.data.duration);
          setKm(response.data.km);
          sessionStorage.setItem("duration", response.data.duration);
          sessionStorage.setItem("km", response.data.km);
          setCanceldate(formattedDate.start_date || "");
          sessionStorage.setItem("canceldate", formattedDate.start_date || "");
          let period = { noOfDays: 0, noOfNights: 0 };
          sessionStorage.setItem("period", JSON.stringify(period));
        }
      } catch (error) {
        setCarData([]);
        setDuration("");
        setKm(0);
        setCanceldate("");
        console.log(error);
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message);
        }
      }
    }

    if (
      tripType === "Hourly Rental" &&
      startCitySuggestion &&
      formattedDate.start_date &&
      hourTime
    ) {
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
          setCarData(response.data.data);
          sessionStorage.setItem("carData", JSON.stringify(response.data.data));
          if (hourTime === "1") {
            sessionStorage.setItem("duration", "2 hr");
            sessionStorage.setItem("km", "20");
            setDuration("2 hr");
            setKm(20);
          } else if (hourTime === "2") {
            setDuration("4 hr");
            setKm(40);
            sessionStorage.setItem("duration", "4 hr");
            sessionStorage.setItem("km", "40");
          } else if (hourTime === "3") {
            setDuration("6 hr");
            setKm(60);
            sessionStorage.setItem("duration", "6 hr");
            sessionStorage.setItem("km", "60");
          } else if (hourTime === "4") {
            setDuration("8 hr");
            setKm(80);
            sessionStorage.setItem("duration", "8 hr");
            sessionStorage.setItem("km", "80");
          } else if (hourTime === "5") {
            setDuration("10 hr");
            setKm(100);
            sessionStorage.setItem("duration", "10 hr");
            sessionStorage.setItem("km", "100");
          }
          setCanceldate(formattedDate.start_date || "");
          sessionStorage.setItem("canceldate", formattedDate.start_date || "");
          let period = { noOfDays: 0, noOfNights: 0 };
          sessionStorage.setItem("period", JSON.stringify(period));
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message);
        }

        setCarData([]);
        setDuration("");
        setKm(0);
        setCanceldate("");
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
          setCarData(response.data.data);
          sessionStorage.setItem("carData", JSON.stringify(response.data.data));
          sessionStorage.setItem("duration", "");
          sessionStorage.setItem("km", "0");
          setDuration("");
          setKm(0);
          setPeriod({
            noOfDays: response.data.noOfDays,
            noOfNights: response.data.noOfNights,
          });
          let period = {
            noOfDays: response.data.noOfDays,
            noOfNights: response.data.noOfNights,
          };
          sessionStorage.setItem("period", JSON.stringify(period));
          setCanceldate(formattedDates?.start_date || "");
          sessionStorage.setItem(
            "canceldate",
            formattedDates?.start_date || ""
          );
        }
      } catch (error) {
        setCarData([]);
        setCanceldate("");
        setDuration("");
        setKm(0);
        console.log(error);
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message);
        }
      }
    }
  };

  const swapValues = () => {
    setInputValueOne(inputValueTwo);
    setInputValueTwo(inputValueOne);

    setStartCitySuggestion(endCitySuggestion);
    setEndCitySuggestion(startCitySuggestion);
  };

  const swapCityValues = () => {
    setStartSearchQuery(endSearchQuery);
    setEndSearchQuery(startSearchQuery);
    setSelectedStartCity(selectedEndCity);
    setSelectedEndCity(selectedStartCity);
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPackageId(e.target.value);
    sessionStorage.setItem("packageId", e.target.value);
  };

  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;

    return (
      current.isBefore(dayjs().startOf("day")) ||
      current.isAfter(dayjs().add(30, "day").endOf("day"))
    );
  };

  const getDisabledTime = (date: any) => {
    if (!date) return {};

    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();
    const isToday = date.isSame(now, "day");

    if (isToday) {
      return {
        disabledHours: () =>
          Array.from({ length: currentHour + 1 }, (_, i) => i),
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

  const disabledrangeDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    const today = dayjs().startOf("day");
    const sixMonthsLater = dayjs().add(6, "month").endOf("day");
    return current.isBefore(today) || current.isAfter(sixMonthsLater);
  };

  return (
    <>
      <div className="edit_search position-sticky d-none d-md-block top0">
        <div className="container">
          <form onSubmit={handleSearch}>
            <div className="row justify-content-evenly">
              <div
                className={`p-0 col-lg-2 select-menu ${
                  isActive ? "active" : ""
                }`}
              >
                <div className="select-btn" onClick={toggleDropdown}>
                  <div className="d-flex label">Trip Type</div>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    {tripType ? (
                      <span className="sBtn-text">{tripType}</span>
                    ) : (
                      <span className="sBtn-text">{selectedOption}</span>
                    )}

                    {isActive ? <FaAngleUp /> : <FaAngleDown />}
                  </div>
                </div>

                <ul className="options">
                  {options.map((option, index) => (
                    <li
                      className="option"
                      key={index}
                      onClick={() => handleOptionClick(option.text)}
                    >
                      <i
                        className={`bx ${option.icon}`}
                        style={{ color: option.color }}
                      ></i>
                      <span className="option-text">{option.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tripType !== "Holidays Package" ? (
                <>
                  <div className="pe-0 ps-1 col-lg-2">
                    <div className="d-flex justify-content-between align-items-start fromPlace">
                      <div className="d-flex label">FROM</div>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        {/* <input
                    type="text"
                    placeholder="Input One"
                    className="hiddenInputBox"
                    value={inputValueOne}
                    onChange={inputFieldOne}
                  /> */}
                        <input
                          value={inputValueOne}
                          onChange={inputFieldOne}
                          placeholder={`${
                            tripType === "Cab From Airport"
                              ? "Enter Airport Name"
                              : "Enter Pickup Address"
                          }`}
                          required
                          // onSuggestionSelect={handleStartCitySuggestionSelect}
                          className="hiddenInputBox"
                        />

<div className="popularCityListDiv">
                              {startFilteredCities.length > 0 ? (
                                <ul className="p-0 m-0 d-flex flex-column">
                                  {startFilteredCities.map((city) => (
                                    <li
                                      key={city.id_city}
                                      onClick={() =>
                                        handleStartCitySelect(
                                          city,
                                          endSearchInputRef
                                        )
                                      }
                                    >
                                      <GoLocation />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: startCityHighlightText(
                                            city.city_name,
                                            startSearchQuery
                                          ),
                                        }}
                                      ></p>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <>
                                  {tripType === "Cab From Airport" ? (
                                    <>
                                      {suggestions.length > 0 ? (
                                        <ul className="p-0 m-0 d-flex flex-column">
                                          {suggestions.length > 0 ? (
                                            <ul className="p-0 m-0 d-flex flex-column">
                                              {suggestions.map(
                                                (suggestion, index) => (
                                                  <li
                                                    key={index}
                                                    onClick={() =>
                                                      handleStartCitySuggestionSelect(
                                                        suggestion
                                                      )
                                                    }
                                                  >
                                                    <GoLocation />

                                                    {/* <p>{suggestion.address}</p> */}
                                                    <p
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          startCityHighlightText(
                                                            suggestion.address,
                                                            inputValueOne
                                                          ),
                                                      }}
                                                    ></p>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          ) : null}
                                        </ul>
                                      ) : null}{" "}
                                    </>
                                  ) : null}
                                  {tripType !== "Holidays Package" &&
                                  tripType !== "Cab From Airport" ? (
                                    <>
                                      <span>POPULAR CITY</span>
                                      <ul className="p-0 m-0">
                                        {popularCities.map(
                                          (popularCitie, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleStartCitySelect(
                                                  popularCitie,
                                                  endSearchInputRef
                                                )
                                              }
                                            >
                                              <GoLocation />
                                              <p>{popularCitie.city_name}</p>
                                            </li>
                                          )
                                        )}
                                      </ul>{" "}
                                    </>
                                  ) : null}
                                </>
                              )}
                            </div>
                      </div>
                    </div>
                  </div>
                  <div className="arrows">
                    {tripType !== "Hourly Rental" ? (
                      <LuArrowLeftRight
                        style={{ cursor: "pointer" }}
                        onClick={swapValues}
                      />
                    ) : null}
                  </div>
                  {tripType !== "Hourly Rental" ? (
                    <div className="p-0 col-lg-2">
                      <div className="d-flex justify-content-between align-items-start fromPlace">
                        <div className="d-flex label">TO</div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                          {/* <input
        type="text"
        placeholder="Input Two"
        className="hiddenInputBox"
        value={inputValueTwo}
        onChange={inputFieldTwo}
      /> */}
                          <AutocompleteInput
                            inputValue={inputValueTwo}
                            onChange={inputFieldTwo}
                            placeholder={`${
                              tripType === "Cab To Airport"
                                ? "Enter Airport Name"
                                : "Enter drop Address"
                            }`}
                            required
                            onSuggestionSelect={handleEndCitySuggestionSelect}
                            className="hiddenInputBox"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-0 col-lg-2">
                      <div className="d-flex justify-content-between align-items-start fromPlace">
                        <div className="d-flex label">Per Hour</div>
                        <div className="d-flex justify-content-between align-items-center w-100">
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
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="pe-0 ps-1 col-lg-2">
                    <div className="d-flex justify-content-between align-items-start fromPlace">
                      <div className="d-flex label">Start City</div>
                      <div className="d-flex justify-content-between align-items-center w-100">
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
                                onClick={() => handleStartCitySelect(city)}
                              >
                                {city.city_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="arrows">
                    <LuArrowLeftRight
                      style={{ cursor: "pointer" }}
                      onClick={swapCityValues}
                    />
                  </div>
                  <div className="p-0 col-lg-2">
                    <div className="d-flex justify-content-between align-items-start fromPlace">
                      <div className="d-flex label">End City</div>
                      <div className="d-flex justify-content-between align-items-center w-100">
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
                                onClick={() => handleEndCitySelect(city)}
                              >
                                {city.city_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div
                className={`pe-0 ps-1 ${
                  tripType === "Holidays Package" ? "col-lg-2" : "col-lg-3"
                }`}
              >
                <div className="d-flex justify-content-between position-relative align-items-start fromPlace p-0">
                  <div
                    className="d-flex label position-absolute z-3"
                    style={{ left: "10px", top: "5px" }}
                  >
                    PICK-UP DATE
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-100 datePickerDiv">
                    {tripType === "Holidays Package" ? (
                      <RangePicker
                        value={selectedDateRange}
                        allowClear={false}
                        required
                        disabledDate={disabledrangeDate}
                        onChange={handleRangeChange}
                      />
                    ) : tripType === "Daily Rental" ? (
                      <RangePicker
                        allowClear={false}
                        value={selectedDateRange}
                        required
                        disabledDate={disabledDate}
                        onChange={handleRangeChange}
                      />
                    ) : (
                      <>
                        {tripType === "Hourly Rental" ? (
                          <DatePicker
                            value={selectedDate}
                            required
                            allowClear={false}
                            showNow={false}
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                            className="custom-date-picker"
                          />
                        ) : (
                          <DatePicker
                            value={selectedDate}
                            required
                            onChange={handleDateChange}
                            showTime={{ use12Hours: true, format: "h:mm A" }}
                            allowClear={false}
                            showNow={false}
                            disabledDate={disabledDate}
                            disabledTime={(date) => getDisabledTime(date)}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {tripType === "Holidays Package" ? (
                <>
                  <div className="col-lg-2 col-md-3 z-1">
                    <div className="inputdiv px-3 py-lg-3 py-md-2 m-0 d-flex align-items-center justify-content-between">
                      {packages.length !== 0 ? (
                        <>
                          <select
                            className="inputbox m-0 w-100"
                            onChange={handlePackageChange}
                            value={packageId || ""}
                          >
                            <option value="">Select Your Package</option>
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
              <div className="col-lg-1 d-flex align-items-center searchBtnDiv">
                <button
                  className="primaryBtn"
                  // onClick={handleSearch}
                >
                  <span>SEARCH</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <CarHero
        cars={carData}
        duration={duration}
        start_date={formattedDate.start_date}
        endrangedate={formattedDates?.end_date}
        hourTime={hourTime}
        pickup_time={formattedDate.pickup_time}
        startrangedate={formattedDates?.start_date}
        km={km}
        period={period}
        cancelDate={cancelDate}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default CarListNavBar;
