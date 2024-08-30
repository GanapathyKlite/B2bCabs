import { Hero } from "../Hero/Hero";
import { Services } from "../Services/Services";
import Facts from "../Facts/Facts";
import { WhyChooseUs } from "../WhyChooseUs/WhyChooseUs";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import Ads from "../Ads/Ads";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <div id="Hero">
        <Hero />
      </div>
      <div id="ourService">
        <Services />
      </div>
      <div id="Contact">
        <Facts />
      </div>
      <div id="whyChooseUs">
        <WhyChooseUs />
      </div>
      <KeyFeatures />
      <Ads />
      <Footer />
    </>
  );
};

export default LandingPage;
