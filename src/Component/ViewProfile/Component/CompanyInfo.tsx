import { useState } from "react";

const CompanyInfo = ({ isEditable }: { isEditable: boolean }) => {
  const [editAddress, setEditAddress] = useState<string>(
    "No:19, New Street, Rangavilas Thottam, Muthiyalpet, Puducherry - 605003"
  );
  const [editPincode, setEditPincode] = useState<number>(605003);
  const handleEditAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditAddress(e.target.value);
  };

  const hadleEditPincode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = Number(e.target.value);
    setEditPincode(value);
  };
  return (
    <>
      <div className="row row-gap-3 personalInfoDiv">
        <div className="col-12 text-success font-weight-bold fs-3 mb-0">
          Company Info
        </div>

        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="company_name"
          >
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g. XYZ Pvt Ltd"
            readOnly
            value="Yas Tours"
            id="company_name"
            name="company_name"
            className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100`}
          />
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="type_of_company"
          >
            Company Type
          </label>
          <div className="select-wrapper">
            <input
              id="type_of_company"
              readOnly
              value="Private Limited"
              name="type_of_company"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100`}
            />

            {/* <IoIosArrowDown className={`dropdown-arrow`} /> */}
          </div>
        </div>

        <div className="col-12">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            placeholder="e.g. XYZ Street, Avenue Center"
            id="address"
            name="address"
            readOnly={!isEditable}
            value={editAddress}
            onChange={handleEditAddress}
            className={`form-control border border-secondary rounded-3 px-2 py-3 w-100 `}
          />
        </div>

        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="city"
          >
            City
          </label>
          <div className="select-wrapper">
            <input
              id="city"
              value="Pondicherry"
              name="city"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100`}
            />
            {/* <IoIosArrowDown className={`dropdown-arrow`} /> */}
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="state"
          >
            State
          </label>
          <div className="select-wrapper">
            <input
              id="state"
              name="state"
              value="Puducherry"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100 `}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6 pe-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="country"
          >
            Country
          </label>
          <div className="select-wrapper">
            <input
              id="country"
              value="Puducherry"
              name="country"
              className={`form-control border-0 border-secondary rounded-3 p-2 py-1 w-100 `}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6 ps-lg-2">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="pincode"
          >
            Pincode
          </label>
          <input
            placeholder="e.g. 123456"
            id="pincode"
            readOnly={!isEditable}
            name="pincode"
            value={editPincode}
            onChange={hadleEditPincode}
            maxLength={6}
            className={`form-control border border-secondary rounded-3 p-2 w-100`}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
