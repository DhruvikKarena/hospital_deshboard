import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/home" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul> 
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/doctors" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Doctors
              </li>
            </Link>
            <Link to="/patients" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Patients
              </li>
            </Link>
            <Link to="/hospitalInfo" className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Hospital Info
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
