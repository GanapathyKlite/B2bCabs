import "./WhyChooseUs.css";

const items = [
  {
    title: "Cost Efficiency",
    icon: "icon-cost",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "Time Saving",
    icon: "icon-time",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "Safety & Security",
    icon: "icon-safety",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "24/7 Availability",
    icon: "icon-availability",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "Technology Integration",
    icon: "icon-technology",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "Scalability",
    icon: "icon-scalability",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "All type of cabs",
    icon: "icon-cabs",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
  {
    title: "Holiday Packages",
    icon: "icon-holiday",
    description:
      "The epitome of romance, Bora Bora is one of the best travel destinations in the World.",
  },
];
export const WhyChooseUs = () => {
  return (
    <div className="bg-gray py-3 ">
      <section className="container">
        <div className="row">
          <div className="centerDiv">
            <span>
              Why Choose <span className="textPrimary">Us</span>
            </span>
            <span>
              What We <span className="textPrimary">Offer</span> For You
            </span>
          </div>
        </div>

        <div className="row row-gap-4 justify-content-center">
          {items.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="chooseUsMainDiv">
                <div className="iconDiv">
                  <i className={item.icon}></i>
                </div>
                <div className="chooseUsTitle">{item.title}</div>
                <div className="chooseUsPara">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
