import React from "react";
import "./topbar.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
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
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={JSON.parse(localStorage.getItem("user")).profilePic || "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
