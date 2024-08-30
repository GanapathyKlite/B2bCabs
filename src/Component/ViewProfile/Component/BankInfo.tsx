import checkBook from "../../../Assets/checkBook.jpg";

const BankInfo = () => {
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
          <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="account_no"
            value="01234567890123"
            name="account_no"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          />
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="beneficiary_name"
          >
            Beneficiary Name
          </label>
          <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="beneficiary_name"
            value="YasTrous"
            name="beneficiary_name"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          />
        </div>
        <div className="col-12">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="ifc_code"
          >
            IFSC Code
          </label>
          <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            id="ifc_code"
            name="ifc_code"
            value="ICIC0000269"
            className="form-control border-0 border-secondary rounded-3 px-2 py-1 w-100"
          />
        </div>

        <div className="col-12 checkBookDiv">
          <img src={checkBook} alt="checkBook" />
        </div>
      </div>
    </>
  );
};

export default BankInfo;
