import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { logOut } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function Topbar() {

  const {dispatch} = useContext(AuthContext);

  const handleLogout = (e) => {
    logOut(dispatch);
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{JSON.parse(localStorage.getItem("user")).hospitalname}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topAvatar">
            {JSON.parse(localStorage.getItem("user")).profilePic !== undefined ? 
            <ImageLoader value={JSON.parse(localStorage.getItem("user")).profilePic} varient={"circle"} /> :
            <div className="avtimgdoc"><BackgroundLetterAvatar value={JSON.parse(localStorage.getItem("user")).hospitalname}/></div>}
          </div>
          <Link to={"/"} className="link" onClick={handleLogout}><div className="logoutbtn">Log Out</div></Link>
        </div>
      </div>
    </div>
  );
}


