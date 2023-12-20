import { useSelector } from "react-redux";
import "../assets/scss/layouts/Sidebar.scss";
import { profile } from "../redux/selector";
import { NavLink } from "react-router-dom";

const urls = [
  { label: "Dashboard", path: "/" },
  { label: "Campaign", path: "/campaign_management" },
  { label: "Account", path: "/account_managemet" },
];

const Sidebar = () => {
  const data = useSelector(profile);

  return (
    <div className="sidebar-container">
      <div className="info-container">
        <div className="avatar">
          <img src="/assets/img/OIP.jpg"/>
        </div>
        <h3>{data.first_name + " " + data.last_name}</h3>
      </div>
      <div className="nav-bar">
        {urls.map((url, i) => (
          <NavLink
            to={url.path}
            key={i}
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            {url.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
