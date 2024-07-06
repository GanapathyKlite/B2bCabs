import "./KeyFeatures.css";

const KeyFeatures = () => {
  return (
    <>
      <section className="py-5">
        <div className="keyFeaturesMainDiv">
          <div className="keyFeatureCircleLeft"></div>
          <div className="keyFeatureCircleRight"></div>

          <div className="container-fluid container-md keyFeaturesPoints">
            <div className="row flex-column row-gap-3 flex-lg-row justify-content-between align-items-center">
              <div className="col-12 col-lg-5">
                <div className="keyFeaturesTitleDiv">
                  <div className="d-flex flex-column">
                    <span className="keyFeaturesTitle">Key Features</span>
                    <span className="keyFeaturesSubTitle bottomLine">
                      Make YourTrip Your Way With Us
                    </span>
                  </div>
                  <div className="keyFeaturesText">
                    Insert your desired text here. This is a sample text. A
                    brief introduction about your cybersecurity company.
                  </div>
                </div>
              </div>
              <div className="col-12 row row-gap-4 col-lg-6 p-0">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="keyFeatureBox">
                    <div className="KeyFeaturesIcon"></div>
                    <div className="keyFeaturesBoxTitle">Corporate Account</div>
                    <div className="keyFeaturesBoxSubTitle">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit quibusdam iure laborum illo expedita
                      suscipit
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="keyFeatureBox">
                    <div className="KeyFeaturesIcon"></div>
                    <div className="keyFeaturesBoxTitle">Advance Booking</div>
                    <div className="keyFeaturesBoxSubTitle">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit quibusdam iure laborum illo expedita
                      suscipit
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="keyFeatureBox">
                    <div className="KeyFeaturesIcon"></div>
                    <div className="keyFeaturesBoxTitle">Airport Executive</div>
                    <div className="keyFeaturesBoxSubTitle">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit quibusdam iure laborum illo expedita
                      suscipit
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="keyFeatureBox">
                    <div className="KeyFeaturesIcon"></div>
                    <div className="keyFeaturesBoxTitle">Customer Support</div>
                    <div className="keyFeaturesBoxSubTitle">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit quibusdam iure laborum illo expedita
                      suscipit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFeatures;
