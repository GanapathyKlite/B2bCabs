import car from "../../Assets/red_car.png";
import "./Ads.css";
import whiteDote from "../../Assets/Ads-white-dots.png";

const Ads = () => {
  return (
    <div className="container  ">
      <div className="Ads bg-image">
        <div className="Ads-left"></div>
        <div className="Ads-right">
          <img src={whiteDote} alt="" className="img" />
        </div>

        <div className="row">
          <div className="col-lg-7">
            <h2 className="Ads-title">
              Dreamsrental User Friendly App Available
            </h2>
            <p className="Ads-p">
              Appropriately monetize one-to-one interfaces rather than
              cutting-edge Competently disinte rmediate backward.
            </p>
          </div>
          <div className="col-lg-5">
            <img src={car} alt="" className="img-fluid " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
