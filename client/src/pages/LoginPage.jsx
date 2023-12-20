import { useEffect, useState } from "react";
import "../assets/scss/pages/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loading from "../components/Loading";

const initState = {
  email: "",
  password: "",
  error: "",
  isLoading: false,
  isAuthLoading: true,
};

const LoginPage = () => {
  const [pageState, setPageState] = useState(initState);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      handleChange("isAuthLoading", true);
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const res = await api.get("/api/auth/profile");
          if (res.data.id) {
            navigate("/");
          }
        } catch (e) {
          console.error(e);
        } finally {
          handleChange("isAuthLoading", false);
        }
      }
      handleChange("isAuthLoading", false);
    };
    getProfile();
  }, []);

  const handleChange = (name, value) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChange("isLoading", true);
    const { email, password } = pageState;
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
      setPageState(initState);
    } catch (e) {
      if (e.response?.status === 401)
        handleChange("error", e.response.data.message);
      else console.error(e);
    } finally {
      handleChange("isLoading", false);
    }
  };

  return pageState.isAuthLoading ? (
    <Loading />
  ) : (
    <form method="POST" onSubmit={handleSubmit} className="login-form">
      <h1>WELCOME</h1>
      <input
        value={pageState.email}
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        required
      />
      <input
        value={pageState.password}
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        required
      />
      {pageState.error && <p className="error-alert">{pageState.error}</p>}
      <button
        className="login-btn green"
        type="submit"
        disabled={pageState.isLoading}
      >
        {!pageState.isLoading ? "Login" : "Loading"}
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
