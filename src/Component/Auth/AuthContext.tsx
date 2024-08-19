// src/Component/Auth/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import axios from 'axios';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
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
    <AuthContext.Provider value={{ authToken, userData, login, logout }}>
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
