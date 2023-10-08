import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";

export default function SearchItem({ item }) {
  return (
    <div className="search-item">
      <img src={item.photos[0]} alt="" className="search-item-img" />
      <div className="search-item-description">
        <h1 className="search-item-title">{item.name}</h1>
        <span className="search-item-distance">
          {item.distance} from {item.city}
        </span>
        <span className="search-item-taxiop">Free airport taxi</span>
        <span className="search-item-subtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="search-item-features">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="search-item-cancelopt">Free cancellation </span>
        <span className="search-item-canceloptsubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="search-item-details">
        {item.rating && (
          <div className="search-item-rating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="search-item-detail-texts">
          <span className="search-item-price">${item.cheapestPrice}</span>
          <span className="search-item-taxiopt">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="search-item-checkbutton">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
