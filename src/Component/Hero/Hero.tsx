import "./Hero.css";
import Car from "../../Assets/car.png";

export const Hero = () => {
  return (
    <>
      <section className="container-fluid container-lg heroHeight">
        <div className="pt-lg-5 pt-md-3"></div>
        <div className="row align-items-center">
          <section className="col-12 col-md-6 pt-5">
            <div
              className="mb-3"
              style={{ fontSize: "20px", color: "var(--PrimaryColor)" }}
            >
              Plan your trip now
            </div>
            <div
              className="mb-3 display-5"
              style={{
                color: "var(--textColor)",
              }}
            >
              Explore the world with comfortable car
            </div>
            <div
              className="mb-3 col-12 col-md-10"
              style={{
                fontSize: "17px",
                color: "var(--paraColor)",
                fontFamily: "Inter !important",
              }}
            >
              Embark on unforgettable adventures and discover the world in
              unparalleled comfort and style with our fleet of exceptionally
              comfortable cars.
            </div>
          </section>
          <section className="col-12 col-md-6 pt-5">
            <img src={Car} alt="CarImg" className="w-100" />
          </section>
        </div>
      </section>
    </>
  );
};
