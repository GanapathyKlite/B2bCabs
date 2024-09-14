import React, { useState, useEffect, ChangeEvent } from "react";
import "./CSS/DashboardHero.css";
import bg from "../../../Assets/hero-banner.jpg";
import { FaPlaneArrival } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { DatePicker } from "antd";
import { LuCalendarDays } from "react-icons/lu";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { AxiosError } from "axios";
import { Notyf } from "notyf";
import { IoIosArrowDown } from "react-icons/io";
import { TbArrowsExchange2 } from "react-icons/tb";
import { GoLocation } from "react-icons/go";

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
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [cities, setCities] = useState<City[]>([]);
  const [startCitySuggestion, setStartCitySuggestion] =
    useState<Suggestion | null>(null);
  const [endCitySuggestion, setEndCitySuggestion] = useState<Suggestion | null>(
    null
  );
  const startInputDivRef = React.useRef<HTMLDivElement>(null);
  const endInputDivRef = React.useRef<HTMLInputElement>(null);
  const [searchStartInputBox, setSearchStartInputBox] =
    React.useState<boolean>(false);
  const [searchEndInputBox, setSearchEndInputBox] =
    React.useState<boolean>(false);
  const [isRotated, setIsRotated] = React.useState<boolean>(false);

  const [startSearchQuery, setStartSearchQuery] = useState<string>("");
  const [endSearchQuery, setEndSearchQuery] = useState<string>("");
  const [startFilteredCities, setStartFilteredCities] = useState<City[]>([]);
  const [endFilteredCities, setEndFilteredCities] = useState<City[]>([]);
  const [selectedStartCity, setSelectedStartCity] = useState<City | null>(null);
  const [selectedEndCity, setSelectedEndCity] = useState<City | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageId, setPackageId] = useState("");

  const [isStartReadOnly, setIsStartReadOnly] = React.useState<boolean>(true);
  const [isEndReadOnly, setIsEndReadOnly] = React.useState<boolean>(true);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

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
      // const parsedDates = JSON.parse(storedDateRange);
      // setSelectedDateRange([dayjs(parsedDates[0]), dayjs(parsedDates[1])]);
    }
    if (storedHourTime) {
      setHourTime(storedHourTime);
    }
    if (storedDate) {
      // setSelectedDate(dayjs(storedDate));
    }
    if (storedtripType) {
      setTripType(storedtripType);
    }
    if (storedstartCitySuggestion) {
      const suggestionObject = JSON.parse(storedstartCitySuggestion);
      // setInputValueOne(suggestionObject.address);
      setStartCitySuggestion(suggestionObject);
    }
    if (storedendCitySuggestion) {
      const suggestionObject = JSON.parse(storedendCitySuggestion);
      // setInputValueTwo(suggestionObject.address);
      setEndCitySuggestion(suggestionObject);
    }
    if (storedholidaystartCity) {
      // const suggestionObject = JSON.parse(storedholidaystartCity);
      // setSelectedStartCity(suggestionObject);
      // setStartSearchQuery(suggestionObject.city_name);
    }
    if (storedholidayendCity) {
      // const suggestionObject = JSON.parse(storedholidayendCity);
      // setSelectedEndCity(suggestionObject);
      // setEndSearchQuery(suggestionObject.city_name);
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
            if (Array.isArray(response.data.data)) {
              setPackages(response.data.data);
              // const storedPackageid = sessionStorage.getItem("packageId");
              // if (storedPackageid) {
              //   setPackageId(storedPackageid);
              // }

              //Another response
              //"We don't have packages for the number of days you have selected.\nInstead, you can go with the following itineraries for different durations:\nPondicherry- 2N Yercaud -Pondicherry (2 days)\nPondicherry- Hokennkal 1N- Pondicherry (2 days)\n"
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
      console.log(filtered);

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

    setInputValueOne(inputValueTwo);
    setInputValueTwo(inputValueOne);
    setStartCitySuggestion(endCitySuggestion);
    sessionStorage.setItem(
      "startCitySuggestion",
      JSON.stringify(endCitySuggestion)
    );
    setEndCitySuggestion(startCitySuggestion);
    sessionStorage.setItem(
      "endCitySuggestion",
      JSON.stringify(startCitySuggestion)
    );
  };
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    sessionStorage.setItem("tripType", tripType);
    sessionStorage.removeItem("period");
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
          !selectedDate
            ? sessionStorage.setItem("selectedDate", defaultDate.toISOString())
            : null;
          sessionStorage.setItem("carData", JSON.stringify(cardata));
          sessionStorage.setItem("duration", response.data.duration);
          sessionStorage.setItem("km", response.data.km);

          // const canceldate = formattedDate?.start_date;
          // sessionStorage.setItem("canceldate", canceldate || "");
          navigate("/dashboard/cablist", { state: { car: true } });
        }
      } catch (error) {
        setLoading(false);
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
          navigate("/dashboard/cablist", { state: { car: true } });
        }
      } catch (error) {
        setLoading(false);
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
          // const canceldate = formattedDate.start_date;
          // sessionStorage.setItem("canceldate", canceldate || "");

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
          navigate("/dashboard/cablist", { state: { car: true } });
        }
      } catch (error) {
        setLoading(false);
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
          const period = {
            noOfDays: response.data.noOfDays,
            noOfNights: response.data.noOfNights,
          };
          sessionStorage.setItem("period", JSON.stringify(period));
          const cardata = response.data.data;
          sessionStorage.setItem("carData", JSON.stringify(cardata));
          const canceldate = formattedDates?.start_date;
          sessionStorage.setItem("canceldate", canceldate || "");
          navigate("/dashboard/cablist", { state: { car: true } });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleStartCitySuggestionSelect = (suggestion: Suggestion) => {
    setStartCitySuggestion(suggestion);
    setInputValueOne(suggestion.address);
    sessionStorage.setItem("startCitySuggestion", JSON.stringify(suggestion));
    setSearchStartInputBox(false);
    if (endSearchInputRef2.current) {
      endSearchInputRef2.current.focus();
    }
  };

  const handleEndCitySuggestionSelect = (suggestion: Suggestion) => {
    setEndCitySuggestion(suggestion);
    setInputValueTwo(suggestion.address);
    sessionStorage.setItem("endCitySuggestion", JSON.stringify(suggestion));
    setSearchEndInputBox(false);
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
  const defaultDate = dayjs().add(1, "hour");
  const formattedDate = {
    start_date: selectedDate
      ? selectedDate.format("DD-MM-YYYY")
      : defaultDate.format("DD-MM-YYYY"),
    pickup_time: selectedDate
      ? selectedDate.format("h:mm A")
      : defaultDate.format("h:mm A"),
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

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPackageId(e.target.value);
    sessionStorage.setItem("packageId", e.target.value);
  };

  const startSearchInputRef = React.useRef<HTMLInputElement>(null);
  const startSearchInputRef2 = React.useRef<HTMLInputElement>(null);
  const endSearchInputRef = React.useRef<HTMLInputElement>(null);
  const endSearchInputRef2 = React.useRef<HTMLInputElement>(null);

  const handleStartCitySelect = (
    city: City,
    endSearchInputRef: React.RefObject<HTMLInputElement>
  ) => {
    setSelectedStartCity(city);
    setStartSearchQuery(city.city_name);
    sessionStorage.setItem("holidaystartCity", JSON.stringify(city));
    setStartFilteredCities([]);
    setSearchStartInputBox(false);
    // Move focus to the end location input
    if (endSearchInputRef.current) {
      endSearchInputRef.current.focus();
    }
  };

  const handleEndCitySelect = (city: City) => {
    setSelectedEndCity(city);
    setEndSearchQuery(city.city_name);
    sessionStorage.setItem("holidayendCity", JSON.stringify(city));
    setEndFilteredCities([]);
    setSearchEndInputBox(false);
  };

  const handleOpenSearchInputBox = () => {
    setSearchStartInputBox((prevState) => !prevState);
  };
  const handleOpenEndInputBox = () => {
    setSearchEndInputBox((prevState) => !prevState);
  };

  const handleClickOutsideStartCity = (event: MouseEvent) => {
    if (
      startInputDivRef.current &&
      !startInputDivRef.current.contains(event.target as Node) &&
      event.target instanceof HTMLElement &&
      !event.target.closest("#startCitySearchDiv")
    ) {
      setSearchStartInputBox(false);
      setIsStartReadOnly(true);
    } else {
      setIsStartReadOnly(false);
    }
  };

  const handleClickOutsideEndCity = (event: MouseEvent) => {
    if (
      endInputDivRef.current &&
      !endInputDivRef.current.contains(event.target as Node) &&
      event.target instanceof HTMLElement &&
      !event.target.closest("#endCitySearchDiv")
    ) {
      setSearchEndInputBox(false);
      setIsEndReadOnly(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideStartCity);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideStartCity);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideEndCity);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEndCity);
    };
  }, []);

  useEffect(() => {
    if (searchStartInputBox) {
      setIsStartReadOnly(false);
    } else {
      setIsStartReadOnly(true);
    }
    if (searchEndInputBox) {
      setIsEndReadOnly(false);
    } else {
      setIsEndReadOnly(true);
    }
  }, [searchStartInputBox, searchEndInputBox]);

  const handleStartSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartSearchQuery(e.target.value);
  };
  const handleEndSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndSearchQuery(e.target.value);
  };

  const popularCities: City[] = [
    {
      id_city: 11,
      city_name: "Chennai / Madras",
    },
    {
      id_city: 10,
      city_name: "Pondicherry",
    },
    {
      id_city: 75,
      city_name: "Bangalore",
    },
    {
      id_city: 58,
      city_name: "Cochin",
    },
    {
      id_city: 27,
      city_name: "Coimbatore",
    },
    {
      id_city: 100,
      city_name: "Delhi",
    },
    {
      id_city: 228,
      city_name: "Shimla  ",
    },
  ];

  const popularAirports = [
    {
      address:
        "Chennai International Airport (MAA), Airport Road, Meenambakkam, Chennai, Tamil Nadu, India",
      city: "Chennai",
      admin: "Tamil Nadu",
      province: "India",
      geocode: 1,
    },
    {
      address:
        "Indira Gandhi International Airport (DEL), New Delhi, Delhi, India",
      city: "New Delhi",
      admin: "Delhi",
      province: "India",
      geocode: 1,
    },
    {
      address:
        "Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM), Mumbai, Maharashtra, India",
      city: "Mumbai",
      admin: "Maharashtra",
      province: "India",
      geocode: 1,
    },
    {
      address:
        "Rajiv Gandhi International Airport (HYD), Shamshabad, Hyderabad, Telangana, India",
      city: "Hyderabad",
      admin: "Telangana",
      province: "India",
      geocode: 1,
    },
    {
      address:
        "Goa International Airport (GOI), Airport Road, Dabolim, Goa, India",
      city: "Dabolim",
      admin: "Goa",
      province: "India",
      geocode: 1,
    },
    {
      address:
        "Cochin International Airport (COK), Airport Road, Nedumbassery, Kochi, Kerala, India",
      city: "Kochi",
      admin: "Kerala",
      province: "India",
      geocode: 1,
    },
  ];

  const RecentSearches = [
    {
      address: "Pondicherry, Puducherry, India",
      city: "Pondicherry",
      admin: "Puducherry",
      province: "India",
      geocode: 1,
    },
    {
      address: "Chennai, Tamil Nadu, India",
      city: "Chennai",
      admin: "Tamil Nadu",
      province: "India",
      geocode: 1,
    },
    {
      address: "Coimbatore, Tamil Nadu, India",
      city: "Coimbatore",
      admin: "Tamil Nadu",
      province: "India",
      geocode: 1,
    },
    {
      address: "Bangalore, Karnataka, India",
      city: "Bangalore",
      admin: "Karnataka",
      province: "India",
      geocode: 1,
    },
  ];

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  };

  const startCityHighlightText = (text: string, query: string) => {
    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, "i");
    return text.replace(regex, "<span class='citySearchText'>$1</span>");
  };

  const endCityHighlightText = (text: string, query: string) => {
    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, "i");
    return text.replace(regex, "<span class='citySearchText'>$1</span>");
  };

  const handleLocationChangerArrow = () => {
    if (startSearchQuery !== "" || endSearchQuery !== "") {
      setIsRotated(!isRotated);
      setStartSearchQuery(endSearchQuery);
      setEndSearchQuery(startSearchQuery);
    }
    if (inputValueOne && inputValueTwo) {
      if (selectedOption === "option1") {
        handleToggle("option2");
      } else {
        handleToggle("option1");
      }
    }
  };
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]);
  const fetchSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/place/autocomplete`,
          { address: query },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setSuggestions(response.data.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      }
    } else {
      setSuggestions([]);
    }
  };
  const fetchSuggestions2 = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/place/autocomplete`,
          { address: query },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setSuggestions2(response.data.data);
        } else {
          setSuggestions2([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      }
    } else {
      setSuggestions2([]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueOne(value);
    fetchSuggestions(value);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueTwo(value);
    fetchSuggestions2(value);
  };
  // const handleSuggestionClick = (suggestion: Suggestion) => {
  //   onChange({ target: { value: suggestion.address } } as React.ChangeEvent<HTMLInputElement>);
  //   setSuggestions([]);
  //   if (onSuggestionSelect) {
  //       onSuggestionSelect(suggestion);
  //     }
  // };

  const disabledrangeDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    const today = dayjs().startOf("day");
    const sixMonthsLater = dayjs().add(6, "month").endOf("day");
    return current.isBefore(today) || current.isAfter(sixMonthsLater);
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
                          <div className="radio-input-wrapper d-flex col-md-4">
                            <label
                              className={`label px-2 px-md-3 py-1 py-sm-2`}
                            >
                              <input
                                type="radio"
                                id={tab.firstRadioButtonValue}
                                className="radio-type"
                                value={tab.firstRadioButtonValue}
                                checked={selectedOption === "option1"}
                                onChange={() => {
                                  handleToggle("option1");
                                }}
                              />
                              <div className="label-text">
                                {tab.firstRadioButtonLable}
                              </div>
                            </label>
                            <label
                              className={`label px-2 px-md-3 py-1 py-sm-2`}
                            >
                              <input
                                type="radio"
                                id={tab.SecondRadioButtonValue}
                                className="radio-type"
                                value={tab.SecondRadioButtonValue}
                                checked={selectedOption === "option2"}
                                onChange={() => {
                                  handleToggle("option2");
                                }}
                              />
                              <div className="label-text">
                                {tab.secondRadioButtonLable}
                              </div>
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row justify-content-center row-gap-3 align-items-center">
                      <div className="col-12 col-md-3 position-relative user-select-none">
                        <div
                          id="startCitySearchDiv"
                          className="inputdiv"
                          ref={startInputDivRef}
                        >
                          {tripType === "Holidays Package" ? (
                            <>
                              <input
                                type="text"
                                ref={startSearchInputRef}
                                value={startSearchQuery}
                                autoComplete="off"
                                readOnly={isStartReadOnly}
                                placeholder={`${
                                  tab.id === 1 && selectedOption === "option1"
                                    ? "Pickup Airport Location"
                                    : "Pickup Location"
                                }`}
                                className="mainInputBox"
                                onChange={handleStartSearchChange}
                                onClick={handleOpenSearchInputBox}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                onChange={handleChange}
                                type="text"
                                required
                                className="mainInputBox"
                                ref={startSearchInputRef2}
                                readOnly={isStartReadOnly}
                                value={inputValueOne}
                                autoComplete="off"
                                placeholder={`${
                                  tab.id === 1 && selectedOption === "option1"
                                    ? "Pickup Airport Location"
                                    : "Pickup Location"
                                }`}
                                // onChange={handleStartSearchChange}
                                onClick={handleOpenSearchInputBox}
                              />
                            </>
                          )}

                          <div
                            className={`${
                              tab.id === 1 ? "d-block" : "d-none"
                            } dashboardIcon`}
                          >
                            {selectedOption === "option1" ? (
                              <FaPlaneArrival className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div
                            className={`${
                              tab.id === 2 ? "d-block" : "d-none"
                            } dashboardIcon`}
                          >
                            <GrLocation className="icon" />
                          </div>
                          <div
                            className={`${
                              tab.id === 3 ? "d-block" : "d-none"
                            } dashboardIcon`}
                          >
                            <GrLocation className="icon" />
                          </div>
                          <div
                            className={`citySearchHiddenBox ${
                              searchStartInputBox
                                ? "citySearchHiddenBoxShow"
                                : ""
                            }`}
                          >
                            <div className="popularCityListDiv">
                              {tripType === "Cab From Airport" ? (
                                <>
                                  {suggestions.length > 0 ? (
                                    <ul className="p-0 m-0 d-flex flex-column">
                                      {suggestions.map((suggestion, index) => (
                                        <li
                                          key={index}
                                          onClick={() =>
                                            handleStartCitySuggestionSelect(
                                              suggestion
                                            )
                                          }
                                        >
                                          <GoLocation />
                                          <p
                                            style={{ overflow: "hidden" }}
                                            dangerouslySetInnerHTML={{
                                              __html: startCityHighlightText(
                                                suggestion.address,
                                                inputValueOne
                                              ),
                                            }}
                                          ></p>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <>
                                      <span>POPULAR AIRPORTS</span>
                                      <ul className="p-0 m-0">
                                        {popularAirports.map(
                                          (popularairport, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleStartCitySuggestionSelect(
                                                  popularairport
                                                )
                                              }
                                            >
                                              <GoLocation />
                                              <p>{popularairport.address}</p>
                                            </li>
                                          )
                                        )}
                                      </ul>{" "}
                                    </>
                                  )}{" "}
                                </>
                              ) : null}
                              {tripType === "Cab To Airport" ? (
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
                                                <p
                                                  style={{ overflow: "hidden" }}
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
                                  ) : (
                                    <>
                                      <span>RECENT SEARCHES</span>
                                      <ul className="p-0 m-0">
                                        {RecentSearches.map(
                                          (recentsearch, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleStartCitySuggestionSelect(
                                                  recentsearch
                                                )
                                              }
                                            >
                                              <GoLocation />
                                              <p>{recentsearch.address}</p>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </>
                                  )}{" "}
                                </>
                              ) : null}
                              {tripType === "Holidays Package" ? (
                                <>
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
                                      </ul>
                                    </>
                                  )}
                                </>
                              ) : null}
                              {/* {tripType === "Cab To Airport" && inputValueOne.length < 3 ? (<><span>RECENT SEARCHES</span>
                                        <ul className="p-0 m-0">
                                          {RecentSearches.map(
                                            (recentsearch, index) => (

                                              <li
                                                key={index}
                                                onClick={() =>
                                                  handleStartCitySuggestionSelect(
                                                    suggestion
                                                  )
                                                }
                                              >
                                                <GoLocation />
                                                <p
                                                  style={{ overflow: "hidden" }}
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

                                        </ul></>): null} */}
                            </div>
                          </div>
                          {tab.id === 2 && selectedOption === "option2" ? (
                            <></>
                          ) : (
                            <div
                              className={`locationChangerArrowIcon`}
                              onClick={handleLocationChangerArrow}
                            >
                              <TbArrowsExchange2
                                className={`${isRotated ? "rotate" : ""}`}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-3 user-select-none">
                        <div
                          id="endCitySearchDiv"
                          className="inputdiv"
                          ref={endInputDivRef}
                        >
                          <div
                            className={`${
                              tab.id === 1 ? "d-block" : "d-none"
                            } dashboardIcon`}
                          >
                            {selectedOption === "option1" ? (
                              <GrLocation className="icon" />
                            ) : (
                              <FaPlaneArrival className="icon" />
                            )}
                          </div>
                          <div
                            className={`${
                              tab.id === 2 ? "d-block" : "d-none"
                            } dashboardIcon`}
                          >
                            {selectedOption === "option2" ? (
                              <LuClock4 className="icon" />
                            ) : (
                              <GrLocation className="icon" />
                            )}
                          </div>
                          <div
                            className={`${
                              tab.id === 3 ? "d-block" : "d-none"
                            } dashboardIcon`}
                          >
                            <GrLocation className="icon" />
                          </div>

                          {tab.id === 2 && selectedOption === "option2" ? (
                            <div
                              className="select-container"
                              style={{ position: "relative" }}
                            >
                              <select
                                id="mySelectBox"
                                className={`mainInputBox m-0 w-100 custom-select ${
                                  isSelectOpen ? "open" : ""
                                }`}
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                                onBlur={() => setIsSelectOpen(false)}
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
                              <IoIosArrowDown
                                className={`dropdown-arrow ${
                                  isSelectOpen ? "" : ""
                                }`}
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "31%",
                                  transition: "transform 0.3s ease",
                                  pointerEvents: "none",
                                }}
                              />
                            </div>
                          ) : (
                            <>
                              {tripType === "Holidays Package" ? (
                                <input
                                  type="text"
                                  autoComplete="off"
                                  ref={endSearchInputRef}
                                  readOnly={isEndReadOnly}
                                  placeholder={`${
                                    tab.id === 1 && selectedOption === "option1"
                                      ? "Drop Location"
                                      : "Drop Airport Location"
                                  }`}
                                  className="mainInputBox"
                                  onChange={handleEndSearchChange}
                                  onClick={handleOpenEndInputBox}
                                  value={endSearchQuery}
                                />
                              ) : (
                                <input
                                  onChange={handleChange2}
                                  type="text"
                                  required
                                  className="mainInputBox"
                                  ref={endSearchInputRef2}
                                  readOnly={isEndReadOnly}
                                  value={inputValueTwo}
                                  autoComplete="off"
                                  placeholder={`${
                                    tab.id === 1 && selectedOption === "option1"
                                      ? "Drop Location"
                                      : "Drop Airport Location"
                                  }`}
                                  // onChange={handleStartSearchChange}
                                  onClick={handleOpenEndInputBox}
                                />
                              )}
                            </>
                          )}

                          <div
                            className={`citySearchHiddenBox ${
                              searchEndInputBox ? "citySearchHiddenBoxShow" : ""
                            }`}
                          >
                            <div className="popularCityListDiv">
                              {tripType === "Cab From Airport" ? (
                                <>
                                  {suggestions2.length > 0 ? (
                                    <ul className="p-0 m-0 d-flex flex-column">
                                      {suggestions2.length > 0 ? (
                                        <ul className="p-0 m-0 d-flex flex-column">
                                          {suggestions2.map(
                                            (suggestion, index) => (
                                              <li
                                                key={index}
                                                onClick={() =>
                                                  handleEndCitySuggestionSelect(
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
                                                        inputValueTwo
                                                      ),
                                                  }}
                                                ></p>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : null}
                                    </ul>
                                  ) : (
                                    <>
                                      <span>RECENT SEARCHES</span>
                                      <ul className="p-0 m-0">
                                        {RecentSearches.map(
                                          (recentsearch, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleEndCitySuggestionSelect(
                                                  recentsearch
                                                )
                                              }
                                            >
                                              <GoLocation />
                                              <p>{recentsearch.address}</p>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </>
                                  )}{" "}
                                </>
                              ) : tripType === "Cab To Airport" ? (
                                <>
                                  {suggestions2.length > 0 ? (
                                    <ul className="p-0 m-0 d-flex flex-column">
                                      {suggestions2.length > 0 ? (
                                        <ul className="p-0 m-0 d-flex flex-column">
                                          {suggestions2.map(
                                            (suggestion, index) => (
                                              <li
                                                key={index}
                                                onClick={() =>
                                                  handleEndCitySuggestionSelect(
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
                                                        inputValueTwo
                                                      ),
                                                  }}
                                                ></p>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : null}
                                    </ul>
                                  ) : (
                                    <>
                                      <span>POPULAR AIRPORTS</span>
                                      <ul className="p-0 m-0">
                                        {popularAirports.map(
                                          (popularairport, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleEndCitySuggestionSelect(
                                                  popularairport
                                                )
                                              }
                                            >
                                              <GoLocation />
                                              <p>{popularairport.address}</p>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </>
                                  )}
                                </>
                              ) : null}
                              {tripType === "Holidays Package" ? (
                                <>
                                  {endFilteredCities.length > 0 ? (
                                    <ul className="p-0 m-0 d-flex flex-column">
                                      {endFilteredCities.map((city) => (
                                        <li
                                          key={city.id_city}
                                          onClick={() =>
                                            handleEndCitySelect(city)
                                          }
                                        >
                                          <GoLocation />
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: endCityHighlightText(
                                                city.city_name,
                                                endSearchQuery
                                              ),
                                            }}
                                          ></p>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <>
                                      <span>POPULAR CITY</span>
                                      <ul className="p-0 m-0">
                                        {popularCities.map(
                                          (popularCitie, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleEndCitySelect(
                                                  popularCitie
                                                )
                                              }
                                            >
                                              <GoLocation />
                                              <p>{popularCitie.city_name}</p>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </>
                                  )}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {tab.id === 1 ||
                      (tab.id === 2 && selectedOption === "option2") ? (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv datePickerSingle py-0 m-0 d-flex align-items-center justify-content-between">
                              <div className="datePickerIcon">
                                <LuCalendarDays />
                              </div>

                              {tab.id === 2 && selectedOption === "option2" ? (
                                <DatePicker
                                  required
                                  format="ddd, MMM D"
                                  suffixIcon={null}
                                  className="border-0 w-100 singleDatePicker"
                                  allowClear={false}
                                  disabledDate={disabledDate}
                                  showNow={false}
                                  onChange={handleDateChange}
                                  value={selectedDate}
                                />
                              ) : (
                                <DatePicker
                                  required
                                  format="ddd, MMM D, h:mm A"
                                  suffixIcon={null}
                                  className="border-0 w-100 singleDatePicker"
                                  allowClear={false}
                                  disabledDate={disabledDate}
                                  disabledTime={(date) => getDisabledTime(date)}
                                  showTime={{
                                    use12Hours: true,
                                    format: "h:mm A",
                                  }}
                                  onChange={handleDateChange}
                                  showNow={false}
                                  value={
                                    selectedDate
                                      ? selectedDate
                                      : dayjs().add(1, "hour")
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv datePickerSingle py-0  m-0 d-flex align-items-center justify-content-between">
                              <div className="datePickerIcon">
                                <LuCalendarDays />
                              </div>

                              {tab.id === 2 && selectedOption === "option1" ? (
                                <RangePicker
                                  required
                                  format="ddd, MMM D"
                                  suffixIcon={null}
                                  className="border-0 w-100"
                                  allowClear={false}
                                  onChange={handleRangeChange}
                                  disabledDate={disabledDate}
                                  value={selectedDateRange}
                                />
                              ) : (
                                <RangePicker
                                  required
                                  format="ddd, MMM D"
                                  suffixIcon={null}
                                  className="border-0 w-100"
                                  allowClear={false}
                                  onChange={handleRangeChange}
                                  disabledDate={disabledrangeDate}
                                  value={selectedDateRange}
                                />
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {tab.id === 3 ? (
                        <>
                          <div className="col-lg-3 col-md-3 z-1">
                            <div className="inputdiv m-0 d-flex align-items-center justify-content-between">
                              <div className="holidayIcon">
                                <svg
                                  version="1.1"
                                  id="Layer_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 122.88 84.05"
                                >
                                  <g>
                                    <path d="M24.68,53.73v26.71h3.56l4.69-5.15h-2.49v-3.15h7.7l-8.68-9.63l2.34-2.1l5.26,5.82V66h12.87c0.56,0,1.06,0.3,1.34,0.75 l3.8,5.38h7.15c0.47,0,0.9,0.21,1.19,0.54l7.83,7.76h13.2c6.28-18.2,10.48-39.14,5.06-55.53c-9.72,4.42-12.05,15.57-13.22,29.13 l0,0c-3.79-9.4-6.16-17.98-0.81-27.68c-5.11,0.55-9.91,3.58-15.01,8.25c4.22-9.03,11.05-15.9,23.24-14.35 c-6.79-4.55-14.85-3.79-22.63-1.97c8.11-8.53,16.89-12.12,27.44-2.43C88.86,10,86.42,4.9,83.21,0c6.84,2.71,11.95,5.69,10.35,18.06 c11.67-9.86,24.74-5.68,29.32,11.59c-8.55-7.57-17.67-11.41-27.4-8.4c17.01,6.37,21.56,16.17,14.4,29.53 c-5.11-12.88-10.44-21-16.42-24.77c3.77,9.5,6.92,25.44,0.83,54.42h15.74v3.61H0v-3.61h21.3V53.73H1.43 c-0.67,0-1.23-0.54-1.23-1.23c0-0.04,0-0.08,0.01-0.12c0.05-6.11,2.6-11.64,6.7-15.64c4.04-3.94,9.59-6.41,15.71-6.5 c0.12-0.04,0.25-0.06,0.38-0.06c0.13,0,0.26,0.02,0.38,0.06c6.09,0.11,11.6,2.58,15.62,6.5c4.12,4.03,6.68,9.6,6.7,15.76 c0,0.68-0.54,1.22-1.22,1.22v0.01H24.68L24.68,53.73L24.68,53.73L24.68,53.73z M36.08,6.6c-0.22-0.37-0.09-0.85,0.29-1.07 c0.37-0.22,0.85-0.09,1.07,0.29l1,1.74c0.22,0.37,0.09,0.86-0.29,1.07c-0.37,0.22-0.85,0.09-1.07-0.28L36.08,6.6L36.08,6.6 L36.08,6.6L36.08,6.6z M42.33,9.18c1.93,0,3.69,0.78,4.95,2.05c1.26,1.26,2.05,3.02,2.05,4.95s-0.78,3.68-2.05,4.95 c-1.26,1.27-3.02,2.05-4.95,2.05s-3.68-0.78-4.95-2.05c-1.26-1.26-2.05-3.02-2.05-4.95s0.78-3.68,2.05-4.95 C38.65,9.97,40.4,9.18,42.33,9.18L42.33,9.18L42.33,9.18L42.33,9.18z M41.71,4.76c0-0.43,0.35-0.79,0.79-0.79 c0.43,0,0.79,0.35,0.79,0.79v2.01c0,0.43-0.35,0.79-0.79,0.79c-0.43,0-0.79-0.35-0.79-0.79V4.76L41.71,4.76L41.71,4.76L41.71,4.76z M47.51,5.98c0.22-0.37,0.69-0.5,1.07-0.28c0.37,0.22,0.5,0.69,0.29,1.07l-1,1.74c-0.22,0.37-0.69,0.5-1.07,0.29 c-0.37-0.22-0.5-0.69-0.28-1.07L47.51,5.98L47.51,5.98L47.51,5.98L47.51,5.98z M51.91,9.94c0.37-0.22,0.86-0.09,1.07,0.29 c0.21,0.37,0.09,0.85-0.29,1.07l-1.73,1c-0.37,0.22-0.85,0.09-1.07-0.29c-0.22-0.37-0.09-0.85,0.29-1.07L51.91,9.94L51.91,9.94 L51.91,9.94L51.91,9.94z M53.75,15.56c0.43,0,0.79,0.35,0.79,0.79s-0.35,0.79-0.79,0.79h-2.01c-0.43,0-0.79-0.35-0.79-0.79 s0.35-0.79,0.79-0.79H53.75L53.75,15.56L53.75,15.56L53.75,15.56z M52.53,21.36c0.37,0.22,0.5,0.69,0.29,1.07 c-0.22,0.37-0.69,0.5-1.07,0.29l-1.74-1c-0.37-0.22-0.5-0.69-0.28-1.07c0.22-0.37,0.69-0.5,1.07-0.28L52.53,21.36L52.53,21.36 L52.53,21.36L52.53,21.36z M48.58,25.76c0.22,0.37,0.09,0.86-0.29,1.07c-0.37,0.22-0.86,0.09-1.07-0.29l-1-1.74 c-0.22-0.37-0.09-0.85,0.29-1.07c0.37-0.22,0.85-0.09,1.07,0.29L48.58,25.76L48.58,25.76L48.58,25.76L48.58,25.76z M42.95,27.6 c0,0.43-0.35,0.79-0.79,0.79c-0.43,0-0.78-0.35-0.78-0.79v-2.01c0-0.43,0.35-0.79,0.78-0.79c0.43,0,0.79,0.35,0.79,0.79V27.6 L42.95,27.6L42.95,27.6L42.95,27.6z M37.15,26.38c-0.22,0.37-0.69,0.5-1.07,0.28c-0.37-0.22-0.5-0.69-0.29-1.07l1-1.74 c0.22-0.37,0.69-0.5,1.07-0.29c0.37,0.22,0.5,0.69,0.28,1.07L37.15,26.38L37.15,26.38L37.15,26.38L37.15,26.38z M32.75,22.43 c-0.37,0.22-0.86,0.09-1.07-0.29c-0.22-0.37-0.09-0.85,0.28-1.07l1.74-1c0.37-0.22,0.85-0.09,1.07,0.29 c0.22,0.37,0.09,0.85-0.29,1.07L32.75,22.43L32.75,22.43L32.75,22.43L32.75,22.43z M30.91,16.8c-0.43,0-0.79-0.35-0.79-0.79 c0-0.43,0.35-0.79,0.79-0.79h2.01c0.43,0,0.79,0.35,0.79,0.79c0,0.43-0.35,0.79-0.79,0.79H30.91L30.91,16.8L30.91,16.8L30.91,16.8z M32.13,11.01c-0.37-0.22-0.5-0.69-0.29-1.07c0.22-0.37,0.69-0.5,1.07-0.29l1.74,1c0.37,0.22,0.5,0.69,0.28,1.07 c-0.22,0.37-0.69,0.5-1.07,0.28L32.13,11.01L32.13,11.01L32.13,11.01L32.13,11.01z M32.49,80.44h34.27l-5.2-5.15H37.18L32.49,80.44 L32.49,80.44L32.49,80.44L32.49,80.44z M42.37,72.13h8.83l-2.1-2.98h-9.42L42.37,72.13L42.37,72.13L42.37,72.13L42.37,72.13z M37.3,38.49c-1.66-1.62-3.62-2.97-5.77-3.95c0.83,1.2,1.53,2.57,2.1,4.08c1.33,3.51,1.98,7.83,2.04,12.66h7.54 C42.89,46.29,40.69,41.81,37.3,38.49L37.3,38.49L37.3,38.49L37.3,38.49z M26.54,33c-0.76-0.13-1.53-0.22-2.32-0.27v18.56h9.01 c-0.06-4.53-0.66-8.55-1.89-11.79C30.26,36.6,28.67,34.36,26.54,33L26.54,33L26.54,33L26.54,33z M21.77,32.72 c-0.77,0.05-1.54,0.13-2.28,0.25c-2.16,1.37-3.76,3.63-4.85,6.56c-1.21,3.23-1.81,7.24-1.87,11.75h9.01V32.72L21.77,32.72 L21.77,32.72L21.77,32.72z M14.52,34.48c-2.21,0.99-4.21,2.36-5.9,4.02c-3.39,3.32-5.59,7.8-5.92,12.78h7.63 c0.06-4.8,0.71-9.11,2.02-12.61C12.93,37.11,13.65,35.7,14.52,34.48L14.52,34.48L14.52,34.48L14.52,34.48z" />
                                  </g>
                                </svg>
                              </div>
                              {packages.length !== 0 ? (
                                <>
                                  <select
                                    className="m-0 w-100 mainInputBox  custom-select"
                                    onChange={handlePackageChange}
                                    value={packageId || ""}
                                  >
                                    <option value="">
                                      Select Your Package
                                    </option>
                                    {packages?.map((pkg) => (
                                      <option key={pkg.id} value={pkg.id}>
                                        {pkg.route}
                                      </option>
                                    ))}
                                  </select>
                                </>
                              ) : (
                                <div className="mainInputBox d-flex align-items-center ps-5">
                                  Not available
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}

                      <div className="col-lg-3 col-md-3 z-1">
                        <button
                          type="submit"
                          disabled={loading}
                          style={{ minHeight: "50px" }}
                          className="text-nowrap primaryBtn w-100"
                        >
                          {loading ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "Search"
                          )}
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
