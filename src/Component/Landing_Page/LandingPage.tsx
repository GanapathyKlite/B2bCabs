import { Hero } from "../Hero/Hero";
import { Services } from "../Services/Services";
import Facts from "../Facts/Facts";
import { WhyChooseUs } from "../WhyChooseUs/WhyChooseUs";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import Ads from "../Ads/Ads";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Facts />
      <WhyChooseUs />
      <KeyFeatures />
      <Ads />
      <Footer />
    </div>
  );
};

export default LandingPage;
