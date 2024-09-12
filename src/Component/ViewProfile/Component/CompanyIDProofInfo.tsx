import samplePANImg from "../../../Assets/SAMPLE PAN.jpg";
import sampleRCImg from "../../../Assets/rc-renewal.webp"
import sampleGSTImg from "../../../Assets/sampleGST.jfif"

interface Profile {
  company_name?: string;
  name_title?: string;
  name?: string;
  email_id?: string;
  mobile_no?: string;
  al_mobile_no?: string;
  address?: string;
  pincode?: string;
  pan_no?: string;
  pan_front_side_img?: string;
  gst_no?: string;
  gst_front_side_img?: string;
  company_reg_cer_img?: string;
  account_no?: string;
  beneficiary_name?: string;
  ifc_code?: string;
  check_leaf_front_img?: string;
  company_logo?: string;
  current_balance?: string;
  type_of_company_name?: string;
  city_name?: string;
  state_name?: string;
  country_name?: string;
}

const CompanyIDProofInfo = ({ profile }: { profile: Profile } ) => {
  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
  const rcImage = `${imageURL}${profile.company_reg_cer_img}`;
  const gstImage = `${imageURL}${profile.gst_front_side_img}`;
  const panImage = `${imageURL}${profile.pan_front_side_img}`;
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
          {/* <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="pan_no"
            value="ABCTY1234D"
            name="pan_no"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          /> */}
          <div>
            {profile.pan_no}
          </div>
        </div>

        <div className="col-12 col-md-6 PANImgDiv">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="panimage"
          >
            PAN Image
          </label>
          <img 
          // src={samplePANImg} 
          src={panImage}
          id="panimage" alt="PANimage" />
        </div>

        <div className="col-12 col-lg-6">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="gst_no"
          >
            GST Number
          </label>
          {/* <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="gst_no"
            value="10AAJCR2207E1Z2"
            name="gst_no"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          /> */}
          <div>
            {profile.gst_no}
          </div>
        </div>

        <div className="col-12 col-md-6 GSTImgDiv">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiary_name"
          >
            GST Image
          </label>
          <img
          //  src={sampleGSTImg}
          src={gstImage}
            alt="GSTimage" />
        </div>

        <div className="col-12 col-md-6 GSTImgDiv">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiary_name"
          >
            R C Image
          </label>
          <img 
          // src={sampleRCImg}
          src={rcImage}
           alt="RCimage" />
        </div>

      </div>
    </>
  );
};

export default CompanyIDProofInfo;
