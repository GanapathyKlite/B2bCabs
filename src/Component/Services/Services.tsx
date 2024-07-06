import "./Services.css";

export const Services = () => {
  return (
    <section className="we-offer-area text-center bg-gray pt-3 pb-5 px-lg-5 ">
      <div className="container-fluid ">
        <div className="row">
          <div className="centerDiv">
            <span>
              Our <span className="textPrimary">Services</span>
            </span>
            <span>
              What We <span className="textPrimary">Offer</span> For You
            </span>
          </div>
        </div>

        <div className="row our-offer-items less-carousel row-gap-4">
          {/* <!-- Single Item --> */}
          <div className="col-12 col-md-6 col-lg-3 equal-height">
            <div className="item">
              <i className="fa-solid fa-truck-plane"></i>
              <h4>Airport Transport</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          {/* <!-- End Single Item -->

                  <!-- Single Item --> */}
          <div className="col-12 col-md-6 col-lg-3 equal-height">
            <div className="item">
              <i className="fa-solid fa-calendar-days"></i>
              <h4>Daily Rental</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          {/* <!-- End Single Item -->

                  <!-- Single Item --> */}
          <div className="col-12 col-md-6 col-lg-3 equal-height">
            <div className="item">
              <i className="fa-solid fa-hourglass-half"></i>
              <h4>Hourly Rental</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          {/* <!-- End Single Item -->

                  <!-- Single Item --> */}
          <div className="col-12 col-md-6 col-lg-3 equal-height">
            <div className="item">
              <i className="fa-solid fa-cart-flatbed-suitcase"></i>
              <h4>Holiday Packages</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          {/* <!-- End Single Item --> */}
        </div>
      </div>
    </section>
  );
};
