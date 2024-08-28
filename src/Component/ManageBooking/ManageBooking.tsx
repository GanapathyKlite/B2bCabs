import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";
import UpcomingBooking from "../UpcomingBooking/UpcomingBooking";
import PastBooking from "../PastBooking/PastBooking";
import CanceledBooking from "../CanceledBooking/CanceledBooking";

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

  return (
    <>
      <div className="container">
        <div className="row row-gap-3 align-items-center justify-content-center py-3">
          <div className="col-12 col-md-9 col-lg-7">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderColor: "divider" }}>
                <Tabs
                  sx={{ borderRadius: "10px" }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Upcoming Booking" {...a11yProps(0)} />
                  <Tab label="Past Booking" {...a11yProps(1)} />
                  <Tab label="Canceled Booking" {...a11yProps(2)} />
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
