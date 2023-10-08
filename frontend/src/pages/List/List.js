import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

export default function List() {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 1000000}`
  );

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  useEffect(() => {
    handleSearch();
  }, [dates]);

  const handleClick = () => {
    reFetch();
    handleSearch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-search-title">Search</h1>
            <div className="list-search-item">
              <label>Destination</label>
              <input
                type="text"
                placeholder="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1).toLowerCase()
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick();
                  }
                }}
              />
            </div>
            <div className="list-search-item">
              <label>Check-in Date: </label>
              <span
                onClick={() => {
                  setOpenDate(!openDate);
                }}
                onChange={(e) => {
                  handleClick();
                }}
              >
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div
              className="list-search-item"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            >
              <label>Options</label>
              <div className="list-search-item-options">
                <div className="list-search-option-item">
                  <span className="list-search-option-text">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="list-search-option-input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClick();
                      }
                    }}
                  />
                </div>
                <div className="list-search-option-item">
                  <span className="list-search-option-text">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="list-search-option-input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClick();
                      }
                    }}
                  />
                </div>
                <div className="list-search-option-item">
                  <span className="list-search-option-text">No of People</span>
                  <input
                    type="number"
                    className="list-search-option-input"
                    placeholder={options.adult}
                    min={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClick();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="list-result">
            {loading ? (
              "loading..."
            ) : (
              <>
                {data.map((item) => {
                  return <SearchItem item={item} key={item._id} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
