import samplePANImg from "../../../Assets/SAMPLE PAN.jpg";
import sampleRCImg from "../../../Assets/rc-renewal.webp"
import sampleGSTImg from "../../../Assets/sampleGST.jfif"

const CompanyIDProofInfo = () => {
  return (
    <>
      <div className="row row-gap-3 personalInfoDiv">
        <div className="col-12 text-success font-weight-bold fs-3 mb-0">
          Company ID Proof Info
        </div>

        <div className="col-12 col-lg-6">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="pan_no"
          >
            PAN Number
          </label>
          <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="pan_no"
            value="ABCTY1234D"
            name="pan_no"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          />
        </div>

        <div className="col-12 col-md-6 PANImgDiv">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="panimage"
          >
            PAN Image
          </label>
          <img src={samplePANImg} id="panimage" alt="checkBook" />
        </div>

        <div className="col-12 col-lg-6">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="gst_no"
          >
            GST Number
          </label>
          <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="gst_no"
            value="10AAJCR2207E1Z2"
            name="gst_no"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          />
        </div>

        <div className="col-12 col-md-6 GSTImgDiv">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiary_name"
          >
            GST Image
          </label>
          <img src={sampleGSTImg} alt="checkBook" />
        </div>

        <div className="col-12 col-md-6 GSTImgDiv">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiary_name"
          >
            R C Image
          </label>
          <img src={sampleRCImg} alt="checkBook" />
        </div>

      </div>
    </>
  );
};

export default CompanyIDProofInfo;
