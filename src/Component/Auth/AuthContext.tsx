import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { Dayjs } from 'dayjs';

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
  login: (formData: { email: string; password: string }) =>  Promise<AxiosResponse | undefined>;
  logout: () => void;
  inputValueOne: string;
  setInputValueOne: React.Dispatch<React.SetStateAction<string>>;
  inputValueTwo: string;
  setInputValueTwo: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: Dayjs | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  selectedDateRange: [Dayjs | null, Dayjs | null] | null;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<[Dayjs | null, Dayjs | null] | null>>;
  tripType: string;
  setTripType: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [tripType, setTripType] = useState<string>("Cab from Airport");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [userData, setUserData] = useState({
    id: null,
    companyName: null,
    name: null,
    mobile: null,
    email: null,
    logo: null,
    currentBalance: null,
  });

  const login = async (formData: { email: string; password: string }): Promise<AxiosResponse | undefined> => {
    try {
        const key = localStorage.getItem('authkey');
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/agent/login`, formData, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      });
      if (response.status === 200 && response.data.status) {
        const { token, id, company_name, name, mobile, email, logo, currentBalance } = response.data;
        
        localStorage.setItem('authToken', token);
        setUserData({
            id,
            companyName: company_name,
            name,
            mobile,
            email,
            logo,
            currentBalance,
          });
        setAuthToken(token);
      }
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
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
    <AuthContext.Provider value={{ authToken, userData, login, logout, inputValueOne, 
      setInputValueOne,
      inputValueTwo, 
      setInputValueTwo,
      selectedDate,
      setSelectedDate,
      selectedDateRange,
      setSelectedDateRange, tripType, setTripType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
