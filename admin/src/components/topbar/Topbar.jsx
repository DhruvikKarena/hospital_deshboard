import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { logOut } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";

export default function Topbar() {

  const {dispatch} = useContext(AuthContext);

  const handleLogout = (e) => {
    logOut(dispatch);
  }

  // const [hospital, setHospital] = useState([]);

  // useEffect(() => {
  //   const getHospital = async () => {
  //     try{

  //       const res = await axios.get("/hospital/find/"+JSON.parse(localStorage.getItem("user"))._id, {
  //         headers: {
  //           token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       setHospital(res.data);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   };
  //   getHospital();
  // },[])

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
            {JSON.parse(localStorage.getItem("user")).profilePic !== undefined ? <img className="topAvatar" src={JSON.parse(localStorage.getItem("user")).profilePic} alt=""/> :
            <div className="avtimgdoc"><BackgroundLetterAvatar value={JSON.parse(localStorage.getItem("user")).hospitalname}/></div>}
          </div>
          <Link to={"/"} className="link" onClick={handleLogout}><div className="logoutbtn">Log Out</div></Link>
        </div>
      </div>
    </div>
  );
}


