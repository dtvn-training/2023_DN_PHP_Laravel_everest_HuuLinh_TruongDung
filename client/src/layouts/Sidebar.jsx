import "../assets/scss/layouts/Sidebar.scss";

const paths = [
  { label: "Dashboard" },
  { label: "Campaign" },
  { label: "Account" },
];

const Sidebar = ({ name }) => {
  return (
    <div className="sidebar-container">
      <div className="info-container">
        <div className="avatar"></div>
        <h3>{name}</h3>
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
