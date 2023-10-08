import React from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function FeaturedProperties() {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="featuredproperties">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => {
            return (
              <Link
                to={`/hotels/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="featuredproperties-item" key={item._id}>
                  <img
                    src={item.photos[0]}
                    alt=""
                    className="featuredproperties-img"
                  />
                  <span className="featuredproperties-name">{item.name}</span>
                  <span className="featuredproperties-city">{item.city}</span>
                  <span className="featuredproperties-price">
                    Starting from ${item.cheapestPrice}
                  </span>
                  {item.rating && (
                    <div className="featuredproperties-rating">
                      <button>{item.rating}</button>
                      <span>Excellent</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
}
