import React, { useState, useEffect, ChangeEvent } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRupeeSign,
} from "react-icons/fa";
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
import { GoLocation } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { TbArrowsExchange2 } from "react-icons/tb";

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
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
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
    setInputValueOne(suggestion.address);
    sessionStorage.setItem("startCitySuggestion", JSON.stringify(suggestion));
    setSearchStartInputBox(false);
    if (endSearchInputRef2.current) {
      endSearchInputRef2.current.focus();
    }
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
    if (tripType === "Cab From Airport") {
      setTripType("Cab To Airport");
    } else {
      setTripType("Cab From Airport");
    }
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

  const endSearchInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleOpenSearchInputBox = () => {
    setSearchStartInputBox((prevState) => !prevState);
  };

  const handleOpenEndInputBox = () => {
    setSearchEndInputBox((prevState) => !prevState);
  };

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

  const handleToggle = (option: string) => {
    setSelectedOption(option);
    setInputValueOne(inputValueTwo);
    setInputValueTwo(inputValueOne);
    setStartCitySuggestion(endCitySuggestion);
    setEndCitySuggestion(startCitySuggestion);
  };

  // useEffect(() => {
  //   if (searchStartInputBox) {
  //     setIsStartReadOnly(false);
  //   } else {
  //     setIsStartReadOnly(true);
  //   }
  //   // if (searchEndInputBox) {
  //   //   setIsEndReadOnly(false);
  //   // } else {
  //   //   setIsEndReadOnly(true);
  //   // }
  // }, [searchStartInputBox]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]);
  const endSearchInputRef2 = React.useRef<HTMLInputElement>(null);
  const startSearchInputRef2 = React.useRef<HTMLInputElement>(null);
  const [isRotated, setIsRotated] = React.useState<boolean>(false);
  // const [isStartReadOnly, setIsStartReadOnly] = React.useState<boolean>(true);
  // const [isEndReadOnly, setIsEndReadOnly] = React.useState<boolean>(true);

  const [searchStartInputBox, setSearchStartInputBox] =
    React.useState<boolean>(false);
  const [searchEndInputBox, setSearchEndInputBox] =
    React.useState<boolean>(false);

  return (
    <>
      <div className="edit_search position-sticky d-none d-md-block top0">
        <div className="container">
          <form onSubmit={handleSearch}>
            <div className="row align-items-center">
              <div className="px-1 col-12 col-md-2">
                <div
                  className={`select-menu select-btn inputdiv cabListNavBarInputBoxDiv ${
                    isActive ? "active" : ""
                  }`}
                  onClick={toggleDropdown}
                >
                  <div
                    className={`d-flex flex-column w-100 mainInputBox cabListNavBarInputBox custom-select ps-2 ${
                      isSelectOpen ? "open" : ""
                    }`}
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    onBlur={() => setIsSelectOpen(false)}
                  >
                    <div className="cabNavBarLable">Trip Type</div>

                    {tripType ? (
                      <span className="sBtn-text">{tripType}</span>
                    ) : (
                      <span className="sBtn-text">{selectedOption}</span>
                    )}
                  </div>
                  <IoIosArrowDown className="dropdown-arrow carListNavBarDropDownArrow" />

                  <ul className="options">
                    {options.map((option, index) => (
                      <li
                        className="option"
                        key={index}
                        onClick={() => {
                          handleOptionClick(option.text);
                          setIsSelectOpen(!isSelectOpen);
                        }}
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
              </div>

              {tripType !== "Holidays Package" ? (
                <>
                  <div
                    className={`col-12 ps-1 pe-2 position-relative ${
                      tripType === "Hourly Rental" ? "col-md-4" : "col-md-3"
                    }`}
                  >
                    <div className="d-flex flex-column w-100 inputdiv cabListNavBarInputBoxDiv">
                      <div className="cabNavBarLable ps-3">FROM</div>
                      <input
                        onChange={handleChange}
                        type="text"
                        required
                        className="mainInputBox cabListNavBarInputBox"
                        ref={startSearchInputRef2}
                        value={inputValueOne}
                        autoComplete="off"
                        placeholder={`${
                          tripType === "Cab From Airport"
                            ? "Enter Airport Name"
                            : "Enter Pickup Address"
                        }`}
                        onClick={handleOpenSearchInputBox}
                      />

                      {tripType === "Cab From Airport" ? (
                        <FaPlaneArrival className="carListNavBarIcon" />
                      ) : (
                        <GoLocation className="carListNavBarIcon" />
                      )}

                      <div
                        className={`citySearchHiddenBox ${
                          searchStartInputBox ? "citySearchHiddenBoxShow" : ""
                        }`}
                      >
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
                          ) : null}
                          {tripType === "Cab From Airport" ? (
                            <>
                              {suggestions.length > 0 ? (
                                <ul className="p-0 m-0 d-flex flex-column">
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
                                  ) : null}
                                </ul>
                              ) : null}
                            </>
                          ) : null}
                          {tripType === "Cab To Airport" ? (
                            <>
                              {suggestions.length > 0 ? (
                                <ul className="p-0 m-0 d-flex flex-column">
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
                                  ) : null}
                                </ul>
                              ) : null}
                            </>
                          ) : null}
                          {tripType !== "Holidays Package" &&
                          tripType !== "Cab From Airport" &&
                          tripType !== "Cab To Airport" ? (
                            <>
                              <span>POPULAR CITY</span>
                              <ul className="p-0 m-0">
                                {popularCities.map((popularCitie, index) => (
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
                                ))}
                              </ul>
                            </>
                          ) : tripType === "Cab From Airport" &&
                            inputValueOne.length < 3 ? (
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
                              </ul>
                            </>
                          ) : null}
                          {tripType === "Cab To Airport" &&
                          inputValueOne.length < 3 ? (
                            <>
                              <span>RECENT SEARCHES</span>
                              <ul className="p-0 m-0">
                                {RecentSearches.map((recentsearch, index) => (
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
                                ))}
                              </ul>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`locationChangerArrowIcon carListNavBarArrowIcon`}
                      onClick={handleLocationChangerArrow}
                    >
                      <TbArrowsExchange2
                        className={`${isRotated ? "rotate" : ""}`}
                      />
                    </div>
                  </div>

                  {tripType !== "Hourly Rental" ? (
                    <div className="col-12 col-md-3 ps-2 pe-1">
                      <div className="d-flex flex-column w-100 inputdiv cabListNavBarInputBoxDiv">
                        <div className="cabNavBarLable ps-3">TO</div>
                        <input
                          onChange={handleChange2}
                          type="text"
                          required
                          className="mainInputBox cabListNavBarInputBox"
                          ref={endSearchInputRef2}
                          // readOnly={isEndReadOnly}
                          value={inputValueTwo}
                          autoComplete="off"
                          placeholder={`${
                            tripType === "Cab To Airport"
                              ? "Drop Location"
                              : "Drop Airport Location"
                          }`}
                          onClick={handleOpenEndInputBox}
                        />

                        {tripType === "Cab To Airport" ? (
                          <FaPlaneArrival className="carListNavBarIcon" />
                        ) : (
                          <GoLocation className="carListNavBarIcon" />
                        )}

                        <div
                          className={`citySearchHiddenBox ${
                            searchEndInputBox ? "citySearchHiddenBoxShow" : ""
                          }`}
                        >
                          <div className="popularCityListDiv">
                            {endFilteredCities.length > 0 ? (
                              <ul className="p-0 m-0 d-flex flex-column">
                                {endFilteredCities.map((city) => (
                                  <li
                                    key={city.id_city}
                                    onClick={() => handleEndCitySelect(city)}
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
                                    ) : null}
                                  </>
                                ) : null}
                                {tripType !== "Holidays Package" &&
                                tripType !== "Cab From Airport" &&
                                tripType !== "Cab To Airport" ? (
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
                                ) : null}
                              </>
                            )}
                            {tripType === "Cab To Airport" &&
                            inputValueTwo.length < 3 ? (
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
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 col-md-2 px-1">
                      <div
                        className={`select-menu select-btn inputdiv cabListNavBarInputBoxDiv ${
                          isActive ? "active" : ""
                        }`}
                        onClick={toggleDropdown}
                      >
                        <div
                          className={`d-flex flex-column w-100 mainInputBox cabListNavBarInputBox custom-select ps-2 ${
                            isSelectOpen ? "open" : ""
                          }`}
                          onClick={() => setIsSelectOpen(!isSelectOpen)}
                          onBlur={() => setIsSelectOpen(false)}
                        >
                          <div className="cabNavBarLable ps-2">Per Hour</div>

                          <select
                            className="inputbox m-0 w-100 ps-2 bg-transparent border-0"
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              appearance: "none",
                            }}
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
                        <IoIosArrowDown className="dropdown-arrow carListNavBarDropDownArrow" />
                      </div>

                      {/* <div className="d-flex flex">
                        <div className="cabNavBarLable ps-3">Per Hour</div>
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
                      </div> */}
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
                                onClick={() =>
                                  handleStartCitySelect(city, endSearchInputRef)
                                }
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
                  <div className="p-0 col-12 col-md-3">
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
                className={`px-1 ${
                  tripType === "Holidays Package" ? "col-lg-2" : "col-lg-3"
                }`}
              >
                <div className="d-flex inputdiv cabListNavBarInputBoxDiv">
                  <div
                    className="cabNavBarLable position-absolute z-3"
                    style={{ left: "15px", top: "5px" }}
                  >
                    PICK-UP DATE
                  </div>
                  <div className="datePickerDiv w-100">
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
                            value={selectedDate}
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
              <div className="col-12 col-md-1 d-flex align-items-center searchBtnDiv">
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
