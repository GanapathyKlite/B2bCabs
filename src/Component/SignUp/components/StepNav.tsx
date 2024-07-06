import { FaCheck } from "react-icons/fa6";
import DesktopImage from "../../../Assets/bg-sidebar-desktop.svg";
import MobileImage from "../../../Assets/bg-sidebar-mobile.svg";
import "../SignUp.css";

type dataType = {
  currentIndex: number;
  completedSteps: boolean[];
};

const StepNav = ({ currentIndex, completedSteps }: dataType) => {
  const steps: string[] = [
    "Your Info",
    "Company Info",
    "Bank Info",
    "Company ID Proof",
  ];

  // Calculate the height of the progress line based on the current index
  const progressHeight = `${(currentIndex / (steps.length - 1)) * 100}%`;

  return (
    <>
      <img
        src={MobileImage}
        alt="Background Mobile"
        className="d-block d-lg-none mobileBackground w-100 object-fit-cover position-absolute"
      />
      <div className="position-relative col-12 col-lg-3">
        <img
          src={DesktopImage}
          alt="Background Desktop"
          className="position-absolute w-100 rounded-lg object-fit-cover rounded-3 d-none d-lg-block top-0 h-100"
        />

        <div className="z-index-50 position-relative p-4 d-flex flex-lg-column justify-content-center flex-row">
          <div className="position-relative d-flex flex-lg-column align-items-center gap-5">
            <div
              className="position-absolute bg-light w-1"
              style={{ height: "100%", zIndex: -1, left: "20px" }}
            ></div>
            <div
              className="position-absolute w-1 progress-line"
              style={{
                widows: progressHeight,
                zIndex: -1,
                left: "20px",
                backgroundColor: "rgb(16 50 81)",
              }}
            ></div>
            <div className="position-absolute bg-light w-1"></div>
            {steps.map((item, index) => (
              <div key={item} className="d-flex align-items-center gap-3 w-100">
                <div
                  className={`circle rounded-circle ${
                    currentIndex >= index ? "text-dark" : "bg-dark-subtle"
                  } ${
                    currentIndex === index
                      ? "bg-light animate-border"
                      : "cricleBackgroundColor"
                  }`}
                >
                  <svg className="svgCircle">
                    <circle
                      className="circle-border"
                      cx="50%"
                      cy="50%"
                      r="47%" /* Adjust the radius as needed */
                    />
                  </svg>
                  {completedSteps[index] && currentIndex > index ? (
                    <FaCheck style={{ color: "var(--whiteColor)" }} />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="d-none d-lg-block">
                  <h6 className="text-base font-weight-bold text-white m-0">
                    {item}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepNav;
