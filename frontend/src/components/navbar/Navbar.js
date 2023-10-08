import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">TravelNest</span>
        </Link>
        {user ? (
          <>
            <span
              className="nav-username"
              style={{
                fontweight: 600,
                border: "1px solid white",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              Welcome {user.username}
            </span>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="nav-items">
            {/* <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className="nav-button">Register</button>
            </Link> */}
            <span> </span>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className="nav-button"> Login </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
