import { useState } from "react";
import "../assets/scss/pages/LoginPage.scss";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../validators";
import api from "../api/axios";

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [info, setInfo] = useState(initState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = info;
    const { emailError, passwordError } = validateLoginForm(email, password);
    if (emailError === "" && passwordError === "") {
      try {
        api;
        const res = await api.post("/api/auth/login", { email, password });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.access_token)
        );
        navigate("/");
        setInfo(initState);
        setError("");
      } catch (e) {
        if (e.response && e.response.status === 401) {
          setError(e.response.data);
        } else {
          console.error(e);
        }
      }
    } else {
      setError(emailError || passwordError);
    }
    setIsLoading(false);
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h1>WELCOME</h1>
      <input
        value={info.email}
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        value={info.password}
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      {error && <p className="error-alert">{error}</p>}
      <button className="login-btn green" type="submit" disabled={isLoading}>
        {!isLoading ? "Login" : "Loading"}
      </button>
      <div className="login-option">
        <button className="blue" type="button">
          Facebook
        </button>
        <button className="red" type="button">
          Google
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
