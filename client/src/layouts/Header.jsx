import { useNavigate } from "react-router-dom";
import "../assets/scss/layouts/Header.scss";
import axios from "../api/axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const token = accessToken.replace(/"/g, "");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const res = await axios.post("/api/auth/logout", {}, config);
        alert(res.data.message);
        localStorage.removeItem("accessToken");
        navigate("/login");
      } catch (e) {
        console.error(e);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header-container">
      <div className="left">
        <h4>Toggle sidebar</h4>
      </div>
      <div className="middle">
        <h1>LOGO</h1>
      </div>
      <div className="right">
        <div className="img-container"></div>
        <div className="dropdown-contents">
          <button type="button" onClick={() => handleLogout()}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
