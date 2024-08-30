import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./Component/Landing_Page/LandingPage";
import NavBar from "./Component/NavBar/NavBar";
import { AboutUs } from "./Component/AboutUs/AboutUs";
import { Services } from "./Component/Services/Services";
import { Contact } from "./Component/Contact/Contact";
import SignUp from "./Component/SignUp/SignUp";
import Dashboard from "./Component/Dashboard/Dashboard";
import CarBooking from "./Component/CarBookingDetails/CarBooking";
import DashboardNavbar from "./Component/Dashboard/Component/DashboardNavBar";
import CarShowingPage from "./Component/CarList/CarShowingPage";
import PrivateRoute from "./Component/Auth/PrivateRoute";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import UpcomingBooking from "./Component/UpcomingBooking/UpcomingBooking";
// import CanceledBooking from "./Component/CanceledBooking/CanceledBooking";
// import PastBooking from "./Component/PastBooking/PastBooking";
import Invoice from "./Component/Invoice/Invoice";
import DriverStatus from "./Component/DriverStatus/DriverStatus";
import PaymentHistory from "./Component/PaymentHistory/PaymentHistory";
import ViewProfile from "./Component/ViewProfile/ViewProfile";
import ManageBooking from "./Component/ManageBooking/ManageBooking";
import { useAuth } from './Component/Auth/AuthContext';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const publicRoutes = ['/', '/aboutUs', '/services', '/contact', '/signup'];

  useEffect(() => {
    if (!authToken && !publicRoutes.includes(location.pathname)) {
      navigate('/');
    }
  }, [authToken, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      window.history.pushState(null, '', window.location.href);
  
      window.onpopstate = () => {
        if (location.pathname === '/dashboard') {
          window.history.go(1); 
        }
      };
    }
  
    return () => {
      window.onpopstate = null;
    };
  }, [location.pathname]);


  return (
    <div className="App">
      {isDashboardRoute ? <DashboardNavbar /> : <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute redirectTo="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/cablist" element={<CarShowingPage />} />
          <Route path="/dashboard/cabbooking" element={<CarBooking />} />
          <Route path="/dashboard/managebooking" element={<ManageBooking />} />         
          <Route path="/dashboard/driverstatus" element={<DriverStatus />} />
          <Route path="/dashboard/invoice" element={<Invoice />} />
          <Route
            path="/dashboard/paymenthistory"
            element={<PaymentHistory />}
          />
          <Route path="/dashboard/viewprofile" element={<ViewProfile />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
