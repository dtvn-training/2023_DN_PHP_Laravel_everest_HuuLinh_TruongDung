import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/scss/layouts/Header.scss";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/ProfileSlice";

const urls = [
  { label: "Dashboard", path: "/" },
  { label: "Campaign", path: "/campaign_management" },
  { label: "Account", path: "/account_managemet" },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentUrl = location.pathname;
  const currentLabel = urls.find((url) => url.path === currentUrl)?.label;

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
        <div className="dropdown-nav-bar">
          <p>
            <i className="fa-solid fa-caret-down"></i>
            {currentLabel}
          </p>
          <div className="dropdown-contents">
            {urls.map((url, index) => (
              <Link to={url.path} key={index}>
                {url.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="middle">
        <h1>LOGO</h1>
      </div>
      <div className="right">
        <div className="img-container">
          <img src="/assets/img/OIP.jpg" />
        </div>
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
