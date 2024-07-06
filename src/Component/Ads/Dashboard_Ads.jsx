import React from "react";
import car from "../../Asset/red_car.png";
import "./Dashboard_Ads.css";
import whiteDote from "../../Asset/Ads-white-dots.png";

const Dashboard_Ads = () => {
  return (
    
      <div className="Dashboard_Ads bg-image">
        <div className="Dashboard_Ads-left"></div>
        <div className="Dashboard_Ads-right">
          <img src={whiteDote} alt="" className="img" />
        </div>

        <div className="row">
          <div className="col-lg-7">
            <h2 className="Dashboard_Ads-title">
              Dreamsrental User Friendly App Available
            </h2>
            <p className="Dashboard_Ads-p">
              Appropriately monetize one-to-one interfaces rather than
              cutting-edge Competently disinte rmediate backward.
            </p>
          </div>
          <div className="col-lg-5">
            <img src={car} alt="" className="img-fluid " />
          </div>
        </div>
      </div>
    
  );
};

export default Dashboard_Ads;
