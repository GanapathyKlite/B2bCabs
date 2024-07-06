import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  return (
    <>
      <div className="App">
        {isDashboardRoute ? <DashboardNavbar /> : <NavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/cablist" element={<CarShowingPage />} />
          <Route path="/dashboard/cabbooking" element={<CarBooking />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
