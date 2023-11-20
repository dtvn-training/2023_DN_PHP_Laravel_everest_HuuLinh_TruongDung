import { useSelector } from "react-redux";
import "../assets/scss/layouts/Sidebar.scss";
import { profile } from "../redux/selector";

const paths = [
  { label: "Dashboard" },
  { label: "Campaign" },
  { label: "Account" },
];

const Sidebar = () => {
  const data = useSelector(profile);
console.log(data)
  return (
    <div className="sidebar-container">
      <div className="info-container">
        <div className="avatar"></div>
        <h3>{data.name}</h3>
      </div>
      <div className="nav-bar">
        {paths.map((path, i) => (
          <a href="/" key={i}>
            {path.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
