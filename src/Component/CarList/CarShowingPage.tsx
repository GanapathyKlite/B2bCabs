import Footer from "../Footer/Footer";
import "./CarList.css";
import CarHero from "./Component/CarHero";
import CarListNavBar from "./Component/CarListNavBar";

const CarShowingPage: React.FC = () => {
  return (
    <>
      <CarListNavBar />
      <CarHero />
      <Footer/>
    </>
  );
};

export default CarShowingPage;
