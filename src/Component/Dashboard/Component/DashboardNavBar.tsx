import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../../../Assets/Profile.png";
import "./CSS/DashboardNavBar.css";
import Logo from "../../../Assets/B2b_Main_Logo_.svg";
import { IoAddCircle } from "react-icons/io5";
import { useAuth } from "../../Auth/AuthContext";

function DashboardNavbar() {
  const navigate = useNavigate();
  const { logout, userData } = useAuth();
  const handleLogout = () => {
    logout(); 
    navigate("/");
  };
  return (
    <Navbar expand="true" className="bg-body-tertiary z-3">
      <Container fluid>
        <Link to={"/dashboard"}>
          <Navbar.Brand>
            <img src={Logo} alt="Main Logo" style={{ width: "175px" }} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-lg"
          aria-labelledby="offcanvasNavbarLabel-lg"
          placement="end"
        >
          <div className="profile">
            <div className="d-flex flex-column gap-2">
              <div className="profileCirlce">
                {/* <div className="profileCirlce2"> */}
                <div className="profileImage">
                  <img
                    src={Profile}
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
                <p className="m-0">View Profile</p>
              </div>
              <hr className="my-0" />
              <div className="d-flex justify-content-between align-items-center">
                {/* <div><img src="" alt="" /></div> */}
                <div style={{ fontSize: "25px", fontWeight: "500" }}>
                  <span style={{ fontFamily: "Outfit , sans-serif" }}>₹</span>
                  &nbsp; {userData.currentBalance}
                </div>
                <div className="d-flex align-items-center primaryBtn">
                  <IoAddCircle />
                  &nbsp; Add
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
            <Nav className="justify-content-end flex-grow-1 gap-4">
              <div
                className="px-4 py-2 rounded rounded-3"
                style={{ backgroundColor: "var(--whiteColor)" }}
              >
                <h5>Manage Booking</h5>
                <Nav.Link className="ps-4" href="#action1">
                  Upcoming Booking
                </Nav.Link>
                <Nav.Link className="ps-4" href="#action2">
                  Canceled Booking
                </Nav.Link>
                <Nav.Link className="ps-4" href="#action2">
                  Past Booking
                </Nav.Link>
                <Nav.Link className="ps-4" href="#action2">
                  Driver Status
                </Nav.Link>
              </div>
              <div
                className="px-4 py-2 rounded rounded-3"
                style={{ backgroundColor: "var(--whiteColor)" }}
              >
                <h5>Finance Details</h5>
                <Nav.Link className="ps-4" href="#action1">
                  Invoice
                </Nav.Link>
                <Nav.Link className="ps-4" href="#action2">
                  Payment History
                </Nav.Link>
              </div>
              <div
                className="px-4 py-2 rounded rounded-3"
                style={{ backgroundColor: "var(--whiteColor)" }}
              >
                <h5>Support</h5>
                <Nav.Link className="ps-4" href="#action1">
                  Chart Support
                </Nav.Link>
                <Nav.Link className="ps-4" href="#action2">
                  User Management
                </Nav.Link>
                <Nav.Link className="ps-4" href="#action2">
                  Notification
                </Nav.Link>
                <Nav.Link className="ps-4 text-danger" href="#action2" onClick={handleLogout}>
                  Sign out
                </Nav.Link>
              </div>
              <div className="navAD"></div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbar;
