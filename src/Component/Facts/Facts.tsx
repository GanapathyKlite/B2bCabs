import "./Facts.css";
import car from "../../Assets/facts-left.png";
import line from "../../Assets/facts-right.png";

// React Icon Start
import { FaHeart } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";

// React Icon End

const Facts = () => {
  return (
    <section className="facts facts-number">
      <div className="facts-left">
        <img src={car} alt="" className="img-fluid" />
      </div>
      <div className="facts-right">
        <img src={line} alt="" className="img-fluid " />
      </div>
      <div className="container ">
        <div className="row mb-5 ">
          <h2 className="text-white text-center factsTitle">
            Facts By The Numbers
          </h2>
          <p className="col-lg-7 text-center factsPara m-auto text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            iusto maxime eos similique id dolore culpa quaerat dolorem quidem
            quod minus tempore, sed provident vel odio odit labore dolores!
            Fugit.
          </p>
        </div>

        <div className="row row-gap-4">
          <div className="col-lg-3 col-md-6 col-12 d-flex">
            <div className="count-group flex-fill ">
              <div className="d-flex align-items-center ">
                <div className="count-img">
                  <FaHeart />
                </div>
                <div className="count-content">
                  <h4>16K+</h4>
                  <p className="m-0">Happy Customer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 d-flex">
            <div className="count-group flex-fill ">
              <div className="d-flex align-items-center ">
                <div className="count-img">
                  <FaCar />
                </div>
                <div className="count-content">
                  <h4>2547+</h4>
                  <p className="m-0">Count of Cars</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 d-flex">
            <div className="count-group flex-fill ">
              <div className="d-flex align-items-center ">
                <div className="count-img">
                  <FaHeadphones />
                </div>
                <div className="count-content">
                  <h4>625K+</h4>
                  <p className="m-0">Car Center Solutions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 d-flex">
            <div className="count-group flex-fill ">
              <div className="d-flex align-items-center ">
                <div className="count-img">
                  <FaClockRotateLeft />
                </div>
                <div className="count-content">
                  <h4>200K+</h4>
                  <p className="m-0">Total Kilometer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facts;
