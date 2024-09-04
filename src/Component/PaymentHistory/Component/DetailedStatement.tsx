import React, { useState } from "react";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import "antd/dist/antd.css"; // Ensure Ant Design styles are imported
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const DetailedStatement: React.FC = () => {
  // State to track the selected radio button option
  const [selectedOption, setSelectedOption] = useState<string>("");

  // State to track custom date range selections
  const [customDates, setCustomDates] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  // Define the desired date format
  const dateFormat = "DD dddd'MM YYYY";

  // Function to disable dates outside the last two years and future dates
  const disabledDate = (current: Dayjs) => {
    const twoYearsAgo = dayjs().subtract(2, "year");
    return current && (current > dayjs().endOf("day") || current < twoYearsAgo);
  };

  // Handler for radio button changes
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  // Handler for Range Picker changes
  const handleRangeChange: RangePickerProps["onChange"] = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    // console.log("Selected Dates:", dates, "Formatted Strings:", dateStrings);
    setCustomDates(dates);
  };

  return (
    <div className="transactionListDiv">
      <div className="detailedStatement">
        <form>
          {/* Predefined Time Periods */}
          <div className="row row-gap-3">
            <div>View statement for:</div>
            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  id="lastMonth"
                  name="statementPeriod"
                  value="lastMonth"
                  checked={selectedOption === "lastMonth"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="lastMonth">Last Month</label>
              </div>
            </div>

            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  id="lastThreeMonth"
                  name="statementPeriod"
                  value="lastThreeMonth"
                  checked={selectedOption === "lastThreeMonth"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="lastThreeMonth">Last 3 Months</label>
              </div>
            </div>

            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  id="lastSixMonth"
                  name="statementPeriod"
                  value="lastSixMonth"
                  checked={selectedOption === "lastSixMonth"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="lastSixMonth">Last 6 Months</label>
              </div>
            </div>

            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  id="lastOneYear"
                  name="statementPeriod"
                  value="lastOneYear"
                  checked={selectedOption === "lastOneYear"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="lastOneYear">Last 1 Year</label>
              </div>
            </div>

            {/* Custom Time Period Option */}
            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  id="customPeriod"
                  name="statementPeriod"
                  value="custom"
                  checked={selectedOption === "custom"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="customPeriod">Custom</label>
              </div>
            </div>
          </div>

          <hr />

          {/* Custom Date Range Picker Section */}
          <div
            className="row row-gap-3 align-items-center justify-content-center"
            style={{
              cursor: selectedOption === "custom" ? "pointer" : "no-drop",
              opacity: selectedOption === "custom" ? 1 : 0.5, // Set opacity based on selection
              pointerEvents: selectedOption === "custom" ? "auto" : "none", // Disable interaction if not custom
            }}
          >
            <div>Choose a custom time period:</div>
            <div className="d-flex align-items-center gap-3">
              <RangePicker
                format={dateFormat}
                onChange={handleRangeChange}
                disabledDate={disabledDate}
                disabled={selectedOption !== "custom"}
              />
            </div>
          </div>

          <div className="row row-gap-3 align-items-center justify-content-center mt-3">
            <div className="col-12 col-md-6">
              <button className="primaryBtn w-100">SUBMIT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailedStatement;
