import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";
import "./ManageBooking.css";
import UpcomingBooking from "./Component/UpcomingBooking";
import PastBooking from "./Component/PastBooking";
import CanceledBooking from "./Component/CanceledBooking";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManageBooking() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const handleBreadCrumbClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div className="container">
        <div className="row row-gap-3 align-items-center justify-content-center py-3">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="pb-2 d-flex justify-content-between align-items-center">
              <div className="breadcrumbDiv">
                <span onClick={() => handleBreadCrumbClick("/dashboard")}>
                  Dashboard
                </span>
                <IoIosArrowForward /> <span>Manage Booking</span>
              </div>
              <div className="signUpTitle">Manage Booking Details</div>
            </div>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderColor: "divider" }}>
                <Tabs
                  sx={{ borderRadius: "10px" }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    className="flex-grow-1"
                    label="Upcoming Booking"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className="flex-grow-1"
                    label="Past Booking"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className="flex-grow-1"
                    label="Canceled Booking"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <UpcomingBooking />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <PastBooking />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <CanceledBooking />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
