import { useEffect, useState } from "react";
import "../assets/scss/pages/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../validators";
import api from "../api/axios";
import Loading from "../components/Loading";

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [info, setInfo] = useState(initState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      setIsAuthLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const res = await api.get("/api/auth/profile");
          if (res.data.id) {
            navigate("/");
          }
        } catch (e) {
          console.error(e);
          setIsAuthLoading(false);
        }
      }
      setIsAuthLoading(false);
    };
    getProfile();
  }, []);

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
    const error = validateLoginForm(email, password);
    if (error.length === 0) {
      try {
        const res = await api.post("/api/auth/login", { email, password });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.access_token)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(res.data.refresh_token)
        );
        navigate("/");
        setInfo(initState);
        setError("");
      } catch (e) {
        if (e.response && e.response.status === 401) {
          setError(e.response.data.message);
        } else {
          console.error(e);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(error[0]);
      setIsLoading(false);
    }
  };

  return isAuthLoading ? (
    <Loading />
  ) : (
    <form method="POST" onSubmit={handleSubmit} className="login-form">
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
