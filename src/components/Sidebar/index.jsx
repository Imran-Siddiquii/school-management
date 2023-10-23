import { Link, useMatch } from "react-router-dom";
import "./sidebar.css";
import { Typography } from "@mui/material";
function NavLinkWithActive({ to, children }) {
  const match = useMatch(to);
  return (
    <li className={match ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
const Sidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo">
        <Link to="/">
          <img src="/Logo1.png" alt="Fitness Logo" width="100px" />
        </Link>
        <h2
          style={{
            textAlign: "center"
          }}
        >
          Student Management
        </h2>
      </div>
      <ul className="nav-links">
        <NavLinkWithActive to="/">Students</NavLinkWithActive>
        <NavLinkWithActive to="/teachers">Teachers</NavLinkWithActive>
        <NavLinkWithActive to="/classes">Classes</NavLinkWithActive>
        <NavLinkWithActive to="/school">School</NavLinkWithActive>
      </ul>
    </div>
  );
};
export default Sidebar;
