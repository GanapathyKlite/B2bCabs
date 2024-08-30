import "./Invoice.css";
import SUVCab from "../../Assets/SUV.svg";
import Footer from "../Footer/Footer";
import { TbDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import resultNotFount from "../../Assets/recordNotFound.png";
import React from "react";

const InvoiceDatas = [
  {
    cabType: "Dzire, Etios",
    similar: "or similar",
    bookingId: "BTU01CT0000087",
    bookingType: "Airport Transfer",
    bookingDate: "Tue 05, Mar 2023 7:00 PM",
    invoicePDF: "path/to/your/pdf1.pdf",
    startAddress:
      "No: 19, new street, rangavilas thottam, Muthiyalpet, Puducherry-605003",
    endAddress: "Elnet Software City, Tharamani, Chennai, Tamil Nadu 600113",
  },
  {
    cabType: "Innova, Ertiga",
    similar: "or similar",
    bookingId: "BTU01CT0000098",
    bookingType: "Daily Rental",
    bookingDate: "Wed 06, Mar 2023 9:00 AM",
    startAddress: "123, Anna Nagar, Chennai, Tamil Nadu 600040",
    invoicePDF: "path/to/your/pdf2.pdf",
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
];

const Invoice = () => {
  const navigate = useNavigate();
  const handleBreadCrumbClick = (path: string) => {
    navigate(path);
  };

  const [searchInvoice, setSearchInvoice] = React.useState<string>("");

  const filterInvoiceDetails = InvoiceDatas.filter(
    (InvoiceData) =>
      InvoiceData.cabType.toLowerCase().includes(searchInvoice.toLowerCase()) ||
      InvoiceData.similar.toLowerCase().includes(searchInvoice.toLowerCase()) ||
      InvoiceData.bookingId
        .toLowerCase()
        .includes(searchInvoice.toLowerCase()) ||
      InvoiceData.bookingType
        .toLowerCase()
        .includes(searchInvoice.toLowerCase()) ||
      InvoiceData.bookingDate
        .toLowerCase()
        .includes(searchInvoice.toLowerCase()) ||
      InvoiceData.startAddress
        .toLowerCase()
        .includes(searchInvoice.toLowerCase()) ||
      InvoiceData.endAddress.toLowerCase().includes(searchInvoice.toLowerCase())
  );
  const handleDownload = (pdfUrl: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;

    // Ensure that the filename is always a string
    const filename = pdfUrl.split("/").pop() || "download.pdf";
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="container">
        <div className="row align-items-center justify-content-center pt-3">
          <div className="col-12 col-md-9 col-lg-7 d-flex justify-content-between align-items-center">
            <div className="breadcrumbDiv">
              <span onClick={() => handleBreadCrumbClick("/dashboard")}>
                Dashboard
              </span>
              <IoIosArrowForward /> <span>Invoice Details</span>
            </div>
            <div className="signUpTitle">Invoice</div>
          </div>
        </div>
        <div className="row row-gap-3 align-items-center justify-content-center py-3">
          <div
            className="searchBarDiv col-12 col-md-9 col-lg-7"
            style={{ height: "58px" }}
          >
            <input
              type="text"
              style={{ height: "100%" }}
              placeholder="Quick Search"
              value={searchInvoice}
              onChange={(e) => setSearchInvoice(e.target.value)}
            />
            <CiSearch style={{ right: "7%" }} />
          </div>
          {filterInvoiceDetails.length === 0 ? (
            <div className="col-12 col-md-6 transactionList bg-secondary-subtle d-flex align-items-center justify-content-center py-4 rounded-4">
              <div className="resultNotFount w-50 d-flex align-items-center justify-content-center row-gap-2 flex-column">
                <img src={resultNotFount} alt="resultNotFount" />
                <div className="recordFound">No Record Found</div>
              </div>
            </div>
          ) : (
            <>
              {filterInvoiceDetails.map((booking, index) => (
                <div key={index} className="col-12 col-md-9 col-lg-7">
                  <div className="upcomingBookingList border p-2 p-md-4">
                    <div className="BGCircle"></div>

                    <div className="upcomingBookingDetailsListDiv">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex column-gap-3">
                          <div className="border upcomingBookingCabImg">
                            <img src={SUVCab} alt="" className="w-100" />
                          </div>

                          <div className="upcomingBookingCabType">
                            <span>{booking.cabType}</span>
                            <span>{booking.similar}</span>
                          </div>
                        </div>
                        <div className="upcomingBookingCabDetails">
                          <span>{booking.bookingId}</span>
                          <span>{booking.bookingType}</span>
                          <span>{booking.bookingDate}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row row-gap-3">
                        <div className="d-flex column-gap-3 col-12 col-lg-9">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <span className="addressStartAndEndCircle"></span>
                            <span className="dashLine"></span>
                            <span className="addressStartAndEndCircle"></span>
                          </div>
                          <div className="upcomingBookingAddressDetails col-11">
                            <p>{booking.startAddress}</p>
                            <p>{booking.endAddress}</p>
                          </div>
                        </div>
                        <div className="invoiceBtnDiv col-12 col-lg-3">
                          <button
                            onClick={() => handleDownload(booking.invoicePDF)}
                          >
                            Download
                            <span>
                              <TbDownload />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Invoice;
