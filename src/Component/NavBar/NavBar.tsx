import React, { useState, FormEvent, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Logo from "../../Assets/B2b_Main_Logo_.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Notyf } from "notyf";
import { Button, TextField, Typography, Box, LinearProgress, } from '@mui/material';

// Initialize Notyf instance with updated configuration
const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}
interface PasswordForm {
  newPassword: string;
  confirmPassword: string;
}
const NavBar: React.FC = () => {
  const isSignUpRoute = location.pathname.startsWith("/signup");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [shownewPassModal, setShownewPassModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false); // State for Offcanvas visibility
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' ,remember: false,});
  const [passwordFormData, setPasswordFormData] = useState<PasswordForm>({newPassword: '',confirmPassword: ''});
  const [countdown, setCountdown] = useState(30);
  const [showOTPField, setShowOTPField] = useState(true);
  const [showResendButton, setShowResendButton] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [show, setShow] = useState(false);
  const [issubmitButtonDisabled, setIssubmitButtonDisabled] = useState(false);
  const [isresendButtonDisabled, setIsresendButtonDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (showOTPField && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount or countdown end
    }

    if (countdown === 0) {
      setShowOTPField(false);
      setShowResendButton(true);
      setIsresendButtonDisabled(false);
      setOtp("");
    }
  }, [countdown, showOTPField]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe && storedEmail && storedPassword) {
      setFormData({
        email: storedEmail,
        password: storedPassword,
        remember: true,
      });
    }
  }, []);
  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(true);
    setShowOffcanvas(false);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleRegister = () => {
    navigate("/signup");
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === 'newPassword') {
      const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordValidation.test(value)) {
        setPasswordError('Password must contain atleast one capital letter, one special character, one integer and small letters, length should be more than 7');
      } else {
        setPasswordError(null);
      }
    }
  
    if (name === 'confirmPassword') {
      if (value !== passwordFormData.newPassword) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError(null);
      }
    }
  
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    });
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    try {
      if (formData.remember) {
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/agent/login`, formData);
      if (response.status === 200 && response.data.status) {
        const { token } = response.data; 
        
        localStorage.setItem('authToken', token); 
        navigate('/dashboard');
      } else if(response.status === 200 && response.data.status === false){
        const errorMessage = response?.data?.message;
        notyf.error(errorMessage);
      }
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        notyf.error(errorMessage);
      } else {
        notyf.error('An unexpected error occurred');
      }
    }
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const expand = "lg";
  
  const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const emailValue = e.target.value;
  setEmail(emailValue);
  setIsEmailValid(validateEmail(emailValue));
};

const handleEmailSubmit = async(e: React.FormEvent) => {
  e.preventDefault();
  if (isEmailValid) {
      try {
        setIssubmitButtonDisabled(true);
        setIsresendButtonDisabled(!isresendButtonDisabled);
        
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/agent/forgot-password`, { verifyEmail: email });
        if (response.status === 200 && response.data.status) {
          notyf.success(response.data.message);
          setShow(true);
          setShowOTPField(true);
          setShowResendButton(false);
          setCountdown(30);
        } else if(response.status === 200 && response.data.status === false){
          setIssubmitButtonDisabled(false);
          setIsresendButtonDisabled(false);
          const errorMessage = response?.data?.message;
          notyf.error(errorMessage);
        }
      } catch (error) {
        
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || 'An error occurred';
          notyf.error(errorMessage);
        } else {
          notyf.error('An unexpected error occurred');
        }
      }
  }
};

const handleOtp = async(e: React.FormEvent) => {
  e.preventDefault();
  if (isEmailValid) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/verifyOTP`, {"otp": otp,"EmailORMobile":email,"type":"agent"});
        if (response.status === 200 && response.data.status) {
          notyf.success(response.data.message);
          setShow(true);
          setShowResendButton(false); 
          setShowForgotPasswordModal(false);
          setShownewPassModal(true);
          
        } else if(response.status === 200 && response.data.status === false){
          const errorMessage = response?.data?.message;
          notyf.error(errorMessage);
        }
      } catch (error) {
        
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || 'An error occurred';
          notyf.error(errorMessage);
        } else {
          notyf.error('An unexpected error occurred');
        }
      }
  }
  
}
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const invalidKeys = ['e', 'E', '+', '-'];
  const isNavigationKey = [
    'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Delete', 'Home', 'End'
  ].includes(e.key);

  if (isNavigationKey || e.key === 'Enter') {
    return;
  }

  if (invalidKeys.includes(e.key) || !/\d/.test(e.key)) {
    e.preventDefault();
  }
};

const handlePasswordSubmit = async(e: FormEvent)=>{
  e.preventDefault();
  console.log("password submitted");
  
}
  return (
    <div className="navBarDiv">
      <Navbar expand={expand} className="navBarBackGround">
        <Container>
          <Navbar.Brand className="m-0 d-block d-lg-none" href="/">
            <img src={Logo} alt="MainLogo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            onClick={handleShowOffcanvas}
          />
          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-lg-row justify-content-around justify-content-lg-between">
              <Navbar.Brand className="m-0 d-none d-lg-block" href="/">
                <img src={Logo} alt="MainLogo" />
              </Navbar.Brand>
              {isSignUpRoute ? (
                <></>
              ) : (
                <Nav className="justify-content-center row-gap-4 align-items-center">
                  <NavLink
                    className="py-0 px-4 NavBarLink"
                    to="/"
                    end
                    onClick={handleCloseOffcanvas}
                  >
                    {({ isActive }) => (
                      <span className={isActive ? "active" : ""}>Home</span>
                    )}
                  </NavLink>
                  <NavLink
                    className="py-0 px-4 NavBarLink"
                    to="/aboutUs"
                    onClick={handleCloseOffcanvas}
                  >
                    {({ isActive }) => (
                      <span className={isActive ? "active" : ""}>About Us</span>
                    )}
                  </NavLink>
                  <NavLink
                    className="py-0 px-4 NavBarLink"
                    to="/services"
                    onClick={handleCloseOffcanvas}
                  >
                    {({ isActive }) => (
                      <span className={isActive ? "active" : ""}>Services</span>
                    )}
                  </NavLink>
                  <NavLink
                    className="py-0 px-4 NavBarLink"
                    to="/contact"
                    onClick={handleCloseOffcanvas}
                  >
                    {({ isActive }) => (
                      <span className={isActive ? "active" : ""}>Contact</span>
                    )}
                  </NavLink>
                </Nav>
              )}
              <button
                className="primaryBtn"
                type="button"
                onClick={handleShowModal}
              >
                Agent Login
              </button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal} centered>
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
                name="email"
                className="loginFormInputBox"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />
               <span
    onClick={togglePasswordVisibility}
    className="passwordEye"
  >
    {showPassword ? <FaEye /> : <FaEyeSlash />}
  </span>
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
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span className="rememberMe">Remember me</span>
              </label>
              <div>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                    // handleForgetPassword logic here
                    setShowForgotPasswordModal(true);
                  }}
                  style={{ color: "var(--PrimaryColor)" }}
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            <div>
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
              <Link to="#" onClick={handleCloseModal}>
                <span style={{ color: "var(--SecondaryColor)" }}>
                  Become an Agent? &nbsp;
                </span>
                <span style={{ color: "var(--PrimaryColor)" }}>Register</span>
              </Link>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showForgotPasswordModal} onHide={() => {
        setShowForgotPasswordModal(false);
        setShow(false);
        setOtp("");}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
      <Typography variant="body1" gutterBottom>
        Enter your registered Email id below to receive Login OTP
      </Typography>
      <Box
      >
        <div className="inputBoxDiv">
        <TextField
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email id"
          value={email}
          onChange={handleEmailChange}
           className="loginFormInputBox"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!isEmailValid && email !== ''}
          helperText={!isEmailValid && email !== '' ? 'Please enter a valid email' : ''}
        />
            </div>
       {!show ? (
         <Button
         disabled={!isEmailValid || issubmitButtonDisabled}
         onClick={handleEmailSubmit}
         type="submit"
         variant="contained"
         color="primary"
         fullWidth
         style={{
           marginTop: '20px',
           backgroundColor: !isEmailValid ? '#d3d3d3' : '#089848', 
           color: '#fff',
           cursor: !isEmailValid ? 'not-allowed' : 'pointer', 
           border: 'none',
         }}
       >
         Submit
       </Button>
       ):null}
       
      </Box>
      {show ? 
      (<Box >

{showOTPField && (
        <>
        <Typography >Verify OTP</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter the OTP"
            inputProps={{ maxLength: 4}}
            onChange={e=>{
              setOtp(e.target.value)
          }}
          onKeyDown={handleKeyDown}
            type="text"
          />
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
            Time remaining: {countdown} seconds
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(countdown / 30) * 100}
            style={{ marginTop: '10px' }}
          />
        </>
      )}
{showResendButton && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleEmailSubmit}
          style={{
            marginTop: '20px',
            backgroundColor: isresendButtonDisabled ? '#d3d3d3' : '#089848', 
            color: '#fff',
            cursor: isresendButtonDisabled ? 'not-allowed' : 'pointer', 
            border: 'none',
          }}
          disabled={ isresendButtonDisabled}
        >
          Resend OTP
        </Button>
      )}
      {!showResendButton && (
        <Button 
        disabled={!otp}
        onClick={handleOtp}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{
          marginTop: '20px',
          backgroundColor: !otp ? '#d3d3d3' : '#089848', 
          color: '#fff',
          cursor: !otp ? 'not-allowed' : 'pointer', 
          border: 'none',
        }}
        >Verify</Button>
      )

      }

        </Box>):null}
        </Modal.Body>
      </Modal>

      <Modal show={shownewPassModal} onHide={()=>{
        setShownewPassModal(false)
      }} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="loginForm" onSubmit={handlePasswordSubmit}>
            <div className="inputBoxDiv">
            
              <label htmlFor="newPassword">
                Enter New Password <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="newPassword"
                placeholder="&nbsp;Enter Your New Password"
                name="newPassword"
                className="loginFormInputBox"
                value={passwordFormData.newPassword}
                onChange={handlePasswordChange}
                required
                autoComplete="off"
              />
                      

              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>

            <div className="inputBoxDiv">
              <label htmlFor="confirmPassword">
               Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="&nbsp;Enter Your Confirm Password"
                name="confirmPassword"
                className="loginFormInputBox"
                value={passwordFormData.confirmPassword}
                onChange={handlePasswordChange}
                required
                autoComplete="off"
              />
              {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
              </div>
               <div className="d-flex justify-content-center">
              <button className="primaryBtn" data-bs-dismiss="modal">
                Submit
              </button>
            </div></form>
        </Modal.Body>
        </Modal>
    </div>
  );
};

export default NavBar;
