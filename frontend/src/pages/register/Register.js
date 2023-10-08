import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import login_img from "../../images/login_img.jpg";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // To store form validation errors

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Reset previous errors
    setErrors({});

    // Perform form validation
    if (!credentials.username || !credentials.email || !credentials.password) {
      setErrors({ message: "All fields are required." });
      return;
    }

    // Validate email format (a basic example)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credentials.email)) {
      setErrors({ message: "Invalid email format." });
      return;
    }

    try {
      await axios.post("/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      setErrors({ message: "Registration failed. Please try again later." });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <img src={login_img} alt="Login image" />
        </div>
        <div className="login-right">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="login-input"
          />
          <button
            disabled={loading}
            onClick={handleRegister}
            className="login-button"
          >
            Register
          </button>
          <button onClick={handleLogin} className="register-button">
            Login
          </button>
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
          {error && <span className="error-message">{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Register;
