import React from "react";
import "./Dashboard.css";
import DashboardHero from "./Component/DashboardHero";
import Footer from "../Footer/Footer";
// import DashboardNavbar from "./Component/DashboardNavBar";

const Dashboard: React.FC = () => {
  return (
    <>
      <DashboardHero />
      <Footer />
    </>
  );
};

export default Dashboard;
