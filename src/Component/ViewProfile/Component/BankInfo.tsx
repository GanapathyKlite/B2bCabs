import checkBook from "../../../Assets/checkBook.jpg";

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

const BankInfo = ( { profile }: { profile: Profile }) => {
  const imageURL = `${import.meta.env.VITE_API_IMG_URL}`;
  const CheckImage = `${imageURL}${profile.check_leaf_front_img}`;
  return (
    <>
      <div className="row row-gap-3 personalInfoDiv">
        <div className="col-12 text-success font-weight-bold fs-3 mb-0">
          Bank Info
        </div>

        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="account_no"
          >
            Account Number
          </label>
          {/* <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="account_no"
            value="01234567890123"
            name="account_no"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          /> */}
          <div>
          {profile.account_no}
          </div>
        
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiary_name"
          >
            Beneficiary Name
          </label>
          {/* <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="beneficiary_name"
            value="YasTrous"
            name="beneficiary_name"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          /> */}
          <div>
            {profile.beneficiary_name}
          </div>
        </div>
        <div className="col-12">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="ifc_code"
          >
            IFSC Code
          </label>
          {/* <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="ifc_code"
            name="ifc_code"
            value="ICIC0000269"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          /> */}
          <div>
            {profile.ifc_code}
          </div>
        </div>

        <div className="col-12 checkBookDiv">
          <img
          //  src={checkBook}
          src={CheckImage}
            alt="checkBook" />
        </div>
      </div>
    </>
  );
};

export default BankInfo;
