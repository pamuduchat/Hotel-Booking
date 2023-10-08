import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

export default function Reserve({ setOpen, hotelId }) {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [unavailableIds, setUnavailableIds] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );
  };

  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(date.toISOString().split("T")[0]);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(date.split("T")[0])
    );

    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unavailableRoomNumbers = data
      .flatMap((item) => item.roomNumbers)
      .filter((roomNumber) => !isAvailable(roomNumber))
      .map((roomNumber) => roomNumber._id);

    setUnavailableIds(unavailableRoomNumbers);
  }, [data]);

  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-close"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms: </span>
        {loading
          ? null
          : data.map((item, i) => (
              <div className="reserve-item" key={i}>
                <div className="reserve-item-info">
                  <div className="reserve-title">{item.title}</div>
                  <div className="reserve-description">{item.desc}</div>
                  <div className="reserve-max">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="reserve-price">{item.price}</div>
                </div>
                <div className="reserve-selectrooms">
                  {item.roomNumbers.map((roomNumber, i) => {
                    const isRoomBooked = unavailableIds.includes(
                      roomNumber._id
                    );
                    return (
                      <div className="room" key={i}>
                        <label>{roomNumber.number}</label>
                        {isRoomBooked ? (
                          <span>Booked</span>
                        ) : (
                          <input
                            disabled={isRoomBooked}
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

        <button onClick={handleClick} className="reserve-button">
          Reserve Now!
        </button>
      </div>
    </div>
  );
}
