import Logo from "../../Assets/B2b_WhiteText_Main_Logo_.svg";
import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
        <div className="footer-top">
          <div className="container">
            <div className="row row-gap-3">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="widget company-intro-widget">
                  <div className="mb-3" style={{ width: "200px" }}>
                    <img src={Logo} alt="Main Logo" />
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever.
                  </p>
                  <ul className="company-footer-contact-list">
                    <li className="d-flex gap-2 align-items-center justify-content-start">
                      <FaPhone />
                      1234567890
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="widget course-links-widget">
                  <h5 className="widget-title">OUR AGENCY</h5>
                  <ul className="courses-link-list">
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Services
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Insurance
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Agency
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Tourism
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Payment
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="widget course-links-widget">
                  <h5 className="widget-title">PARTNERS</h5>
                  <ul className="courses-link-list">
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Bookings
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Rentcars
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        HostelWorld
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        Trivago
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <IoIosArrowForward className="me-1" />
                        TripAdvisor
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="widget newsletter-widget">
                  <h5 className="widget-title">KEEP IN TOUCH</h5>
                  <div className="footer-newsletter">
                    <p>Travel with us</p>
                    <form className="news-letter-form">
                      <input
                        type="email"
                        name="news-email"
                        id="news-email"
                        placeholder="Your email address"
                      />
                      {/* <input className='btn' type="submit" value="Send"/> */}
                      <button className="primaryBtn" type="submit">
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 text-sm-left text-center">
                <span className="copy-right-text">
                  Copyright © 2024{" "}
                  <a href="https://codepen.io/anupkumar92">B2b Cabs</a> All
                  Rights Reserved.
                </span>
              </div>
              <div className="col-md-6 col-sm-6">
                <ul className="terms-privacy d-flex justify-content-sm-end justify-content-center">
                  <li>
                    <a href="/">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="/">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
