import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import login_img from "../../images/login_img.jpg";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // To store form validation errors

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Reset previous errors
    setErrors({});

    if (!credentials.username || !credentials.password) {
      setErrors({ message: "Username and password are required." });
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleRegister = () => {
    navigate("/register");
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
            value={credentials.username}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="login-input"
          />
          <button
            disabled={loading}
            onClick={handleLogin}
            className="login-button"
          >
            Login
          </button>
          <button onClick={handleRegister} className="register-button">
            Register
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

export default Login;
