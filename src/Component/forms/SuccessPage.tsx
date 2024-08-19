import thanksIcon from "../../Assets/icon-thank-you.svg";
// import Lottie from "lottie-react";
import Confetti from "react-confetti";
import { useState, useEffect } from 'react';

// import successAnimation from "../../Assets/animations/success.json";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const goBackHome = () => {
    navigate("/");
  };
  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);
  return (
    <div className="d-flex h-100 flex-column row-gap-3 h-full w-full justify-content-center align-items-center font-mono">
      <Confetti className="w-100" />
      <img src={thanksIcon} alt="Thank you icon" />
      {/* <Lottie animationData={successAnimation} style={{ height: 200 }} /> */}
      {/* <img src={thanksIcon} alt="Thank you icon" width="100px" /> */}
      <h3 className="font-black">Successfully Submitted Thank You!</h3>
      <p className="m-0 tracking-tighter text-center text-base">
        You will Received Login credentials through your Register Email Id.{" "}
        <br />
        After Document Verification.
      </p>
      <button className="primaryBtn" onClick={goBackHome}>Home</button>
      <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '2px solid #000',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '20px 0'
      }}
      >
        {countdown}
      </div>
    </div>
  );
};

export default SuccessPage;
