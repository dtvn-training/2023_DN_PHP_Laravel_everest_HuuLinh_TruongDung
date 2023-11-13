import { useNavigate } from "react-router-dom";
import "../assets/scss/layouts/Header.scss";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/ProfileSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (e) {
      console.error(e);
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
