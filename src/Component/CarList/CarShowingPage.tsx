import "./CarList.css";
import CarHero from "./Component/CarHero";
import CarListNavBar from "./Component/CarListNavBar";

const CarShowingPage: React.FC = () => {
  return (
    <>
      <CarListNavBar />
      <CarHero />
    </>
  );
};

export default CarShowingPage;
