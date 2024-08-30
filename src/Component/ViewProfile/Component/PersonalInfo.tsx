import { useState } from "react";

const PersonalInfo = ({ isEditable }: { isEditable: boolean }) => {
  const [editMobileNumber, setEditMobileNumber] = useState<number>(8838167633);
  const handleEditMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobileNumber = Number(e.target.value);
    setEditMobileNumber(mobileNumber);
  };
  return (
    <>
      <div className="row row-gap-3 personalInfoDiv">
        <div className="col-12 text-success font-weight-bold fs-3 mb-0">
          Personal Info
        </div>
        <div className="col-2 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="title"
          >
            Title
          </label>
          <div className="select-wrapper">
            <input
              id="name_title"
              readOnly
              value="Mr"
              name="name_title"
              className="border-0 border-secondary rounded-3 p-2 py-1 w-100"
            />
            {/* <IoIosArrowDown className={`dropdown-arrow`} /> */}
          </div>
        </div>

        <div className="col-12 col-lg-5 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            type="text"
            placeholder="e.g. Johnny"
            readOnly
            value="Ganapathy"
            id="firstname"
            name="firstname"
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100`}
          />
        </div>

        <div className="col-12 col-lg-5 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="e.g. Depp"
            readOnly
            value="Manohkar"
            id="lastname"
            name="lastname"
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100 $`}
          />
        </div>
        <div className="col-12">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="email_id"
          >
            Email ID
          </label>
          <input
            type="text"
            placeholder="e.g. johnnydepp@gmail.com"
            readOnly
            value="Ganapathy@klitetechnology.com"
            id="email_id"
            name="email_id"
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100 min-height-[50px]`}
          />
        </div>
        <div className="col-12 col-lg-6 pe-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="mobile_no"
          >
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="e.g. 1234567890"
            id="mobile_no"
            name="mobile_no"
            disabled={!isEditable}
            value={editMobileNumber}
            onChange={handleEditMobileNumber}
            maxLength={10}
            className={`border border-secondary rounded-3 p-2 w-100`}
          />
        </div>
        <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column">
          <label
            className="text-success font-weight-semibold pb-2"
            htmlFor="al_mobile_no"
          >
            Alternate Mobile Number
          </label>
          <input
            type="text"
            placeholder="e.g. 0987654321"
            id="al_mobile_no"
            name="al_mobile_no"
            readOnly
            value="3367618388"
            maxLength={10}
            className={`border-0 border-secondary rounded-3 p-2 py-1 w-100`}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
