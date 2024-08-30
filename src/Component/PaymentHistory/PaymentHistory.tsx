import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./PaymentHistory.css";
import Footer from "../Footer/Footer";
import LastTransaction from "./Component/LastTransaction";
import DetailedStatement from "./Component/DetailedStatement";
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

export default function BasicTabs() {
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
        <div className="row align-items-center justify-content-center pt-3">
          <div className="col-12 col-md-9 col-lg-7 d-flex justify-content-between align-items-center">
            <div className="breadcrumbDiv">
              <span onClick={() => handleBreadCrumbClick("/dashboard")}>
                Dashboard
              </span>
              <IoIosArrowForward /> <span>Payment Details</span>
            </div>
            <div className="signUpTitle">Payment History</div>
          </div>
        </div>
        <div className="row row-gap-3 align-items-center justify-content-center py-3">
          <div className="col-12 col-md-9 col-lg-7">
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    className="w-50"
                    label="Last 30 days Transaction"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className="w-50"
                    label="Detailed Statement"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <LastTransaction />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <DetailedStatement />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
