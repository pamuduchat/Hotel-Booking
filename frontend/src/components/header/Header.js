import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ type }) {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "header-container-list-mode" : "header-container"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="header-title">
              Book a hotel and Enjoy Your Vacation!
            </h1>
            <p className="header-description">
              Best deals are waiting for you on TravelNest. Grab your chance
              now!
            </p>
            {!user && (
              <button className="header-button">Sign in / Register</button>
            )}
            <div className="header-search">
              <div className="header-search-item">
                <FontAwesomeIcon icon={faBed} className="header-icon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  onChange={(e) =>
                    setDestination(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase()
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header-icon"
                />
                <span
                  className="header-search-text"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {/* <DateRangePicker
              onChange={(item) => setDate([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={date}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="backwards"
              className="date"
            /> */}
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
                ;
              </div>

              <div className="header-search-item">
                <button className="header-button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
