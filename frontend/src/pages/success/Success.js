import "./success.css";
import SuccessImg from "../../images/success.jpg";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

function Success() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="booking">
          <h2>Hotel Booking Successful.</h2>
          <h4>Check your email for further details.</h4>
        </div>
        <div className="center-container">
          <img src={SuccessImg} alt="success" className="centered-image" />
        </div>
      </div>
    </>
  );
}

export default Success;
