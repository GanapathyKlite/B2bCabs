import { HiOutlineArrowUp } from "react-icons/hi";
import { BsCurrencyRupee } from "react-icons/bs";
import { HiOutlineArrowDown } from "react-icons/hi";
import { BsExclamationCircleFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import resultNotFount from "../../../Assets/recordNotFound.png";
import { useState } from "react";

const transactions = [
  {
    date: "28 Jan 2024",
    transactionID: "BTU01CT0000087",
    transactionTitle: "Paid to",
    amount: "540",
    status: "Debited",
    icon: "up",
  },
  {
    date: "27 Jan 2024",
    transactionID: "BTU01CT0000076",
    transactionTitle: "Received from",
    amount: "1200",
    status: "Credited",
    icon: "down",
  },
  {
    date: "26 Jan 2024",
    transactionID: "BTU01CT0000091",
    transactionTitle: "Paid to",
    amount: "300",
    status: "Failed",
    icon: "up",
  },
  {
    date: "25 Jan 2024",
    transactionID: "BTU01CT0000102",
    transactionTitle: "Received from",
    amount: "750",
    status: "Credited",
    icon: "down",
  },
  {
    date: "24 Jan 2024",
    transactionID: "BTU01CT0000123",
    transactionTitle: "Paid to",
    amount: "500",
    status: "Debited",
    icon: "up",
  },
  {
    date: "23 Jan 2024",
    transactionID: "BTU01CT0000145",
    transactionTitle: "Received from",
    amount: "2500",
    status: "Credited",
    icon: "down",
  },
  {
    date: "22 Jan 2024",
    transactionID: "BTU01CT0000167",
    transactionTitle: "Paid to",
    amount: "950",
    status: "Failed",
    icon: "up",
  },
  {
    date: "21 Jan 2024",
    transactionID: "BTU01CT0000189",
    transactionTitle: "Received from",
    amount: "1800",
    status: "Credited",
    icon: "down",
  },
  {
    date: "20 Jan 2024",
    transactionID: "BTU01CT0000203",
    transactionTitle: "Paid to",
    amount: "620",
    status: "Debited",
    icon: "up",
  },
  {
    date: "19 Jan 2024",
    transactionID: "BTU01CT0000221",
    transactionTitle: "Received from",
    amount: "3400",
    status: "Credited",
    icon: "down",
  },
  {
    date: "18 Jan 2024",
    transactionID: "BTU01CT0000243",
    transactionTitle: "Paid to",
    amount: "1200",
    status: "Debited",
    icon: "up",
  },
  {
    date: "17 Jan 2024",
    transactionID: "BTU01CT0000265",
    transactionTitle: "Received from",
    amount: "2600",
    status: "Failed",
    icon: "down",
  },
  {
    date: "16 Jan 2024",
    transactionID: "BTU01CT0000287",
    transactionTitle: "Paid to",
    amount: "830",
    status: "Debited",
    icon: "up",
  },
  {
    date: "15 Jan 2024",
    transactionID: "BTU01CT0000309",
    transactionTitle: "Received from",
    amount: "1450",
    status: "Credited",
    icon: "down",
  },
  {
    date: "14 Jan 2024",
    transactionID: "BTU01CT0000331",
    transactionTitle: "Paid to",
    amount: "390",
    status: "Debited",
    icon: "up",
  },
];

const LastTransaction = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionID
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.transactionTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="transactionListDiv">
        <div className="searchBarDiv  col-7">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Quick Search"
          />
          <CiSearch />
        </div>
        {filteredTransactions.length === 0 ? (
          <div className="transactionList">
            <div className="resultNotFount">
              <img src={resultNotFount} alt="resultNotFount" />
              <div className="">No Record Found</div>
            </div>
          </div>
        ) : (
          <>
            {filteredTransactions.map((transaction, index) => (
              <div key={index} className="transactionList">
                <div className="d-flex gap-4">
                  <div className="transactionListDate">
                    <span
                      style={{
                        color:
                          transaction.icon === "up"
                            ? "#FC6666"
                            : "rgb(101 253 93)",
                        backgroundColor:
                          transaction.icon === "up"
                            ? "rgb(255 229 229)"
                            : "rgb(231 255 229)",
                      }}
                    >
                      {transaction.icon === "up" ? (
                        <HiOutlineArrowUp />
                      ) : (
                        <HiOutlineArrowDown />
                      )}
                      <span className="circleBackground"></span>
                    </span>
                    <span>{transaction.date}</span>
                  </div>

                  <div className="transactionListId">
                    <span>{transaction.transactionTitle}</span>
                    <span>{transaction.transactionID}</span>
                  </div>
                </div>

                <div className="transactionListAmount">
                  <span>
                    <BsCurrencyRupee />
                    {transaction.amount}
                  </span>
                  <span
                    style={{
                      color:
                        transaction.status === "Credited"
                          ? "#A0EEC0"
                          : "#FC6666",
                    }}
                  >
                    {transaction.status}
                    {transaction.status === "Failed" && (
                      <BsExclamationCircleFill />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LastTransaction;
