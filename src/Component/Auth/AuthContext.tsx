import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosResponse } from "axios";
import axios from "axios";
import { Dayjs } from "dayjs";

interface AuthContextType {
  authToken: string | null;
  userData: {
    id: string | null;
    companyName: string | null;
    name: string | null;
    mobile: string | null;
    email: string | null;
    logo: string | null;
    currentBalance: string | null;
  };
  login: (formData: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse | undefined>;
  logout: () => void;
  inputValueOne: string;
  setInputValueOne: React.Dispatch<React.SetStateAction<string>>;
  inputValueTwo: string;
  setInputValueTwo: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: Dayjs | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  selectedDateRange: [Dayjs | null, Dayjs | null] | null;
  setSelectedDateRange: React.Dispatch<
    React.SetStateAction<[Dayjs | null, Dayjs | null] | null>
  >;
  tripType: string;
  setTripType: React.Dispatch<React.SetStateAction<string>>;
  hourTime: string;
  setHourTime: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<{
    id: string | null;
    companyName: string | null;
    name: string | null;
    mobile: string | null;
    email: string | null;
    logo: string | null;
    currentBalance: string | null;
  }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    sessionStorage.getItem("authToken")
  );
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [tripType, setTripType] = useState<string>("");
  const [hourTime, setHourTime] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [userData, setUserData] = useState(() => {
    const storedUserData = sessionStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : {
          id: null,
          companyName: null,
          name: null,
          mobile: null,
          email: null,
          logo: null,
          currentBalance: null,
        };
  });

  const login = async (formData: {
    email: string;
    password: string;
  }): Promise<AxiosResponse | undefined> => {
    try {
      const key = sessionStorage.getItem("authkey");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/agent/login`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        }
      );
      if (response.status === 200 && response.data.status) {
        const {
          token,
          id,
          company_name,
          name,
          mobile,
          email,
          logo,
          currentBalance,
        } = response.data;

        sessionStorage.setItem("authToken", token);

        const userData = {
          id,
          companyName: company_name,
          name,
          mobile,
          email,
          logo,
          currentBalance,
        };
        setUserData(userData);
        sessionStorage.setItem("userData", JSON.stringify(userData));
        setAuthToken(token);
      }
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Network Error");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("selectedDateRange");
    sessionStorage.removeItem("duration");
    sessionStorage.removeItem("endCitySuggestion");
    sessionStorage.removeItem("startCitySuggestion");
    sessionStorage.removeItem("canceldate");
    sessionStorage.removeItem("selectedDate");
    sessionStorage.removeItem("tripType");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("carData");
    sessionStorage.removeItem("holidaystartCity");
    sessionStorage.removeItem("holidayendCity");
    sessionStorage.removeItem("packageId");
    sessionStorage.removeItem("period");
    sessionStorage.removeItem("hourTime");
    sessionStorage.removeItem("km");
    sessionStorage.removeItem("authkey");

    setAuthToken(null);
    setUserData({
      id: null,
      companyName: null,
      name: null,
      mobile: null,
      email: null,
      logo: null,
      currentBalance: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userData,
        setUserData,
        login,
        logout,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
