import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-lists">
        <div className="footer-list">
          <div className="footer-list-item">About TravelNest </div>
          <div className="footer-list-item">TravelNet.info@gmail.com</div>
          <div className="footer-list-item">
            <i>
              <FaFacebook />
            </i>
          </div>
          <div className="footer-list-item">
            {" "}
            <i>
              <FaInstagram />
            </i>
          </div>
          <div className="footer-list-item">
            <i>
              <FaTwitter />
            </i>
          </div>
          <div className="footer-list-item">2023 Copyright: TravelNest</div>
        </div>
      </div>
    </div>
  );
}
