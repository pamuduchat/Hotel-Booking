import React, { useState, useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./registerHotel.css";

export default function RegisterHotel() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [cheapestPrice, setCheapestPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [distance, setDistance] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hotel = {
        name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        photos,
        cheapestPrice: Number(cheapestPrice),
        rating: Number(rating),
        featured: Boolean(featured),
      };

      console.log(hotel);
      //   const hotel = {
      //     name: "Araliya Hotel",
      //     type: "hotel",
      //     city: "Galle",
      //     address: "Unawatuna",
      //     distance: "500",
      //     title: "Premium Hotel in Unawatuna",
      //     desc: "A very nice place to stay",
      //     cheapestPrice: 150,
      //   };
      const res = await axios.post("/hotels/", hotel, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      console.log(res);
      setLoading(false);
      if (res.status === 200) {
        console.log("Hotel registered successfully");
      }
    } catch (error) {
      console.error("Error registering hotel:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="registerhotel-container">
        <div className="registerhotel-wrapper">
          <h1 className="registerhotel-title">Register Hotel</h1>
          <form className="registerhotel-form" onSubmit={handleSubmit}>
            <div className="registerhotel-form-item">
              <label>Name</label>
              <input
                type="text"
                placeholder="Hotel name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Type</label>
              <input
                type="text"
                placeholder="Hotel type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Distance</label>
              <input
                type="text"
                placeholder="Distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Photos</label>
              <input
                type="text"
                placeholder="Comma-separated photo URLs"
                value={photos}
                onChange={(e) => setPhotos(e.target.value.split(","))}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Description</label>
              <textarea
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Rating</label>
              <input
                type="number"
                placeholder="Rating (0-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="registerhotel-form-item">
              <label>Cheapest Price</label>
              <input
                type="number"
                placeholder="Cheapest Price"
                value={cheapestPrice}
                onChange={(e) => setCheapestPrice(e.target.value)}
              />
            </div>
            {/* <div className="registerhotel-form-item">
              <label>Featured</label>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
            </div> */}
            <button className="registerhotel-btn" type="submit">
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
