import { useAuth } from "../../Auth/AuthContext";
import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
// import Profile from "../../../Assets/Profile.png";
import "./CSS/DashboardNavBar.css";
import Logo from "../../../Assets/B2b_Main_Logo_.svg";
import walletIcon from "../../../Assets/wallet.svg";
// React Icon
import { IoAddCircle, IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { AxiosError } from "axios";
import {
  BsChatDotsFill,
  BsCurrencyRupee,
  BsPersonFillGear,
} from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCreditCard, FaFileInvoice } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";

import axios from "axios";
import { Notyf } from "notyf";

import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// ant Desing
import { Modal } from "antd";
// mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import useRazorpay from "react-razorpay";

const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});

function DashboardNavbar() {
  const modalBoxInputRef = useRef<HTMLInputElement>(null);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const [addCashModalBox, setAddCashModalBox] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("razorpay");
  const [loading, setLoading] = useState(false);

  const [Razorpay] = useRazorpay();

  const navigate = useNavigate();
  const { logout, userData, authToken } = useAuth();
  const [walletcash, setwalletcash] = useState(userData.currentBalance);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleLinkClick = (path: string) => {
    setShowOffcanvas(false);
    navigate(path);
  };

  const handleAddCash = () => {
    setShowOffcanvas(false);
    setAddCashModalBox(true);
  };

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (selectedPaymentMethod === "razorpay") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/razorpay/create/orderId`,
          {
            amount: amount,
            is_recharge: true,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200 && response.data.status) {
          const { orderId, receipt } = response.data.data;

          const options = {
            key: "rzp_test_FIbXKAkHk9VvXS",
            amount: amount,
            currency: "INR",
            name: "Klite cabs",
            description: "Credits towards consultation",
            image: profileImage,
            order_id: orderId,
            handler: async function (response: any) {
              let razorpay_order_id = response.razorpay_order_id;
              let razorpay_signature = response.razorpay_signature;
              let razorpay_payment_id = response.razorpay_payment_id;

              try {
                setLoading(false);
                setAddCashModalBox(false);

                const response = await axios.post(
                  `${
                    import.meta.env.VITE_API_BASE_URL
                  }/razorpay/capture-payment`,
                  {
                    receipt: receipt,
                    amount: amount,
                    is_recharge: true,
                    razorpay_order_id: razorpay_order_id,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    agent_id: userData.id,
                    payment_type: "Razorpay",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                if (response.status === 200 && response.data.status) {
                  setwalletcash(response.data.message.CurrentBalance);
                  let sessionDataString = sessionStorage.getItem("userData");
                  if (sessionDataString !== null) {
                    let sessionData = JSON.parse(sessionDataString);
                    sessionData.currentBalance =
                      response.data.message.CurrentBalance;
                    sessionStorage.setItem(
                      "userData",
                      JSON.stringify(sessionData)
                    );
                  }
                  notyf.success("Amount added to Wallet successfully");
                }
              } catch (error) {
                setLoading(false);
                setAddCashModalBox(false);
                console.log(error, "error");
              }
            },
            prefill: {
              name: userData.name || "",
              email: userData.email || "",
              contact: userData.mobile || "",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new Razorpay(options);

          // rzp1.on("payment.failed", function (response: any) {});

          rzp1.open();
        }
      } catch (error) {
        setLoading(false);
        setAddCashModalBox(false);
        if (error instanceof AxiosError) {
          notyf.error("Network error");
        }
        console.log(error, "error");
      }
    } else if (selectedPaymentMethod === "ccavenue") {
      console.log("it is cc avenue");
    }
    setLoading(false);
    setAddCashModalBox(false);
  };

  const addCashModalBoxOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setAddCashModalBox(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setAddCashModalBox(false);
  };

  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
  const profileImage = `${imageURL}${userData.logo}`;

  return (
    <>
      <Navbar
        expand="true"
        className="bg-body-tertiary z-3 dashBoardNavBarHeader"
      >
        <Container fluid>
          <Link to={"/dashboard"}>
            <Navbar.Brand>
              <img src={Logo} alt="Main Logo" style={{ width: "175px" }} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-lg"
            onClick={() => setShowOffcanvas(true)}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-lg"
            aria-labelledby="offcanvasNavbarLabel-lg"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <div className="profile">
              <div className="d-flex flex-column gap-2">
                <div className="profileCirlce">
                  {/* <div className="profileCirlce2"> */}
                  <div className="profileImage">
                    <img
                      src={profileImage}
                      alt="profileicon"
                      className="w-100 h-100"
                    />
                    {/* </div> */}
                  </div>
                </div>
                <div className="name" style={{ fontSize: "25px" }}>
                  {userData.name}
                </div>
                <div
                  className="viewProfile"
                  style={{ color: "var(--PrimaryColor)" }}
                >
                  <Nav.Link
                    onClick={() => handleLinkClick("/dashboard/viewprofile")}
                  >
                    View Profile
                  </Nav.Link>
                </div>
                <hr className="my-0" />
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "25px", fontWeight: "500" }}
                  >
                    <span style={{ width: "40px" }}>
                      <img src={walletIcon} alt="walletIcon" />
                    </span>
                    <span>
                      <BsCurrencyRupee />
                      {walletcash}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="primaryBtn" onClick={handleAddCash}>
                      <IoAddCircle />
                      &nbsp; Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Offcanvas.Header
              closeButton
              className="text-light closebutton"
              style={{ color: "var(--whiteColor)" }}
            ></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="gap-5">
                <div
                  className="ps-1 pe-3 rounded rounded-3"
                  style={{ backgroundColor: "var(--whiteColor)" }}
                >
                  <Nav.Link
                    className="py-2 dashBoardNavBarTitle"
                    onClick={() => handleLinkClick("/dashboard/managebooking")}
                  >
                    <span className="text-secondary">
                      <MdOutlineEditCalendar />
                    </span>
                    &nbsp; Manage Booking
                  </Nav.Link>

                  <Nav.Link
                    className="py-2 dashBoardNavBarTitle"
                    onClick={() => handleLinkClick("/dashboard/driverstatus")}
                  >
                    <span className="text-secondary">
                      <BsPersonFillGear />
                    </span>
                    &nbsp; Driver Status
                  </Nav.Link>

                  <Accordion className="bg-transparent shadow-none">
                    <AccordionSummary
                      expandIcon={<IoIosArrowDown />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="px-0 py-2 m-0 dashBoardNavBarTitle"
                    >
                      <span className="text-secondary">
                        <RiMoneyRupeeCircleFill />
                      </span>
                      &nbsp; Finance Details
                    </AccordionSummary>
                    <AccordionDetails>
                      <Nav.Link
                        className="py-2 dashBoardNavBarSubTitle"
                        onClick={() => handleLinkClick("/dashboard/invoice")}
                      >
                        <span>
                          <FaFileInvoice />
                        </span>
                        &nbsp; Invoice
                      </Nav.Link>
                      <Nav.Link
                        className="py-2 dashBoardNavBarSubTitle"
                        onClick={() =>
                          handleLinkClick("/dashboard/paymenthistory")
                        }
                      >
                        <span>
                          <FaCreditCard />
                        </span>
                        &nbsp; Payment History
                      </Nav.Link>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="bg-transparent shadow-none">
                    <AccordionSummary
                      className="px-0 py-2 m-0 dashBoardNavBarTitle"
                      expandIcon={<IoIosArrowDown />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <span className="text-secondary">
                        <BiSupport />
                      </span>
                      &nbsp;Support
                    </AccordionSummary>
                    <AccordionDetails>
                      <Nav.Link
                        className="py-2 dashBoardNavBarSubTitle"
                        href="#action1"
                      >
                        <span>
                          <BsChatDotsFill />
                        </span>
                        &nbsp; Chat Support
                      </Nav.Link>
                    </AccordionDetails>
                  </Accordion>

                  <Nav.Link
                    className="py-2 dashBoardNavBarTitle"
                    href="#action2"
                  >
                    <span className="text-secondary">
                      <FaUsers />
                    </span>
                    &nbsp;User Management
                  </Nav.Link>
                  <Nav.Link
                    className="py-2 dashBoardNavBarTitle"
                    href="#action2"
                  >
                    <span className="text-secondary">
                      <IoNotifications />
                    </span>
                    &nbsp; Notification
                  </Nav.Link>
                  <Nav.Link
                    className="text-danger"
                    href="#action2"
                    onClick={handleLogout}
                  >
                    <span>
                      <AiOutlineLogout />
                    </span>
                    &nbsp; Sign out
                  </Nav.Link>
                </div>

                {/* <div className="navAD"></div> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal
        title="Add Cash"
        footer={null}
        centered
        open={addCashModalBox}
        onOk={addCashModalBoxOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={400}
      >
        <div className="row align-items-center justify-content-center row-gap-3">
          <div className="col-12 addCashModalBoxDiv">
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              className="w-100"
              ref={modalBoxInputRef}
            />
          </div>

          <div className="col-6 d-flex align-items-center column-gap-2">
            <input
              type="radio"
              checked={selectedPaymentMethod === "razorpay"}
              name="paymentType"
              id="razorPayRadioBtn"
              value="razorpay"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="razorPayRadioBtn">Razor Pay</label>
          </div>
          <div className="col-6 d-flex align-items-center column-gap-2">
            <input
              type="radio"
              name="paymentType"
              id="ccAvenueRadioBtn"
              value="ccavenue"
              checked={selectedPaymentMethod === "ccavenue"}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor="ccAvenueRadioBtn">C C Avenue</label>
          </div>
          <div className="col-6">
            <button
              className="primaryBtn w-100"
              disabled={!amount || loading}
              onClick={handlePayment}
              style={{
                backgroundColor: !amount ? "grey" : "#089848",
                width: "100px",
              }}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "SUBMIT"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DashboardNavbar;
