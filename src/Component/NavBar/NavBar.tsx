import React, { useState, FormEvent } from "react";
import Container from "react-bootstrap/Container";
import Logo from "../../Assets/B2b_Main_Logo_.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const expand = "lg";

  return (
    <div className="navBarDiv">
      <Navbar expand={expand} className="navBarBackGround">
        <Container>
          <Navbar.Brand className="m-0 d-block d-lg-none" href="/">
            <img src={Logo} alt="MainLogo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-lg-row justify-content-around justify-content-lg-between">
              <Navbar.Brand className="m-0 d-none d-lg-block" href="/">
                <img src={Logo} alt="MainLogo" />
              </Navbar.Brand>
              <Nav className="justify-content-center row-gap-4 align-items-center">
                <NavLink className="py-0 px-4 NavBarLink" to="/" end>
                  {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>Home</span>
                  )}
                </NavLink>
                <NavLink className="py-0 px-4 NavBarLink" to="/aboutUs">
                  {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>About Us</span>
                  )}
                </NavLink>
                <NavLink className="py-0 px-4 NavBarLink" to="/services">
                  {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>Services</span>
                  )}
                </NavLink>
                <NavLink className="py-0 px-4 NavBarLink" to="/contact">
                  {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>Contact</span>
                  )}
                </NavLink>
              </Nav>
              <button className="primaryBtn" type="button" onClick={handleShow}>
                Agent Login
              </button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="inputBoxDiv">
              <label htmlFor="agentID">
                Agent ID <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="agentID"
                placeholder="&nbsp;"
                name="agentID"
                className="loginFormInputBox"
                required
                autoComplete="off"
              />
            </div>

            <div className="inputBoxDiv">
              <label htmlFor="password">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="&nbsp;"
                name="password"
                className="loginFormInputBox"
                required
                autoComplete="off"
              />
              <i
                onClick={togglePasswordVisibility}
                className={
                  showPassword
                    ? "fa fa-fw fa-eye passwordEye"
                    : "fa fa-fw fa-eye-slash passwordEye"
                }
              ></i>
            </div>

            <div
              className="mb-3 d-flex justify-content-between"
              style={{ fontSize: "var(--fontSize13)" }}
            >
              <label className="d-inline-flex gap-2 align-items-center justify-content-center">
                <input
                  type="checkbox"
                  name="remember"
                  className="ui-checkbox"
                />
                <span className="rememberMe">Remember me</span>
              </label>
              <div>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // handleForgetPassword logic here
                  }}
                  style={{ color: "var(--PrimaryColor)" }}
                >
                  Forget Password
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="primaryBtn" data-bs-dismiss="modal">
                Sign In
              </button>
            </div>
            <div
              className="text-center mt-5"
              style={{ fontSize: "var(--fontSize13)" }}
              onClick={handleRegister}
            >
              <Link to="#" onClick={handleClose}>
                <span style={{ color: "var(--SecondaryColor)" }}>
                  Become an Agent? &nbsp;
                </span>
                <span style={{ color: "var(--PrimaryColor)" }}>Register</span>
              </Link>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavBar;
