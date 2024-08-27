// import React from "react";
import "./Invoice.css";
import SUVCab from "../../Assets/SUV.svg";
import Footer from "../Footer/Footer";
import { TbDownload } from "react-icons/tb";

const upcomingBookingData = [
  {
    cabType: "Dzire, Etios",
    similar: "or similar",
    bookingId: "BTU01CT0000087",
    bookingType: "Airport Transfer",
    bookingDate: "Tue 05, Mar 2023 7:00 PM",
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
    endAddress: "Koyambedu Bus Stand, Chennai, Tamil Nadu 600107",
  },
];

const Invoice = () => {
  return (
    <>
      <div className="container">
        <div className="row row-gap-3 align-items-center justify-content-center py-3">
          <div className="col-12 col-md-8 DashBoardNavBarListTitle">
            Invoice
          </div>
          {upcomingBookingData.map((booking, index) => (
            <div key={index} className="col-12 col-md-8 mb-3">
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
                      <button>
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Invoice;
