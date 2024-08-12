import React from "react";
import "./Dashboard.css";
import DashboardHero from "./Component/DashboardHero";
import Footer from "../Footer/Footer";
import Ads from "../Ads/Ads";
// import DashboardNavbar from "./Component/DashboardNavBar";

const Dashboard: React.FC = () => {
  return (
    <>
      <DashboardHero />
      <Ads />
      <Footer />
    </>
  );
};

export default Dashboard;
