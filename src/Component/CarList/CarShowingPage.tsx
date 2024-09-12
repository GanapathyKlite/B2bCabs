import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./CarList.css";

import CarListNavBar from "./Component/CarListNavBar";
import { useEffect } from "react";

const CarShowingPage: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.car) {
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate]);

  const car = location.state?.car;

  if (!car) {
    return null;
  }
  return (
    <>
      <CarListNavBar />
      
      <Footer/>
    </>
  );
};

export default CarShowingPage;
