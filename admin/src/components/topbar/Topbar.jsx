import React from "react";
import "./topbar.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import BackgroundLetterAvatar, { getname } from "../../components/avatar/Avatar";
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
          <div className="topAvatar">
                    {JSON.parse(localStorage.getItem("user")).profilePic !== undefined ? <img className="topAvatar" src={JSON.parse(localStorage.getItem("user")).profilePic} alt=""/> :
                <div className="avtimgdoc"><BackgroundLetterAvatar {...getname(JSON.parse(localStorage.getItem("user")).hospitalname)}/></div>}
                </div>
        </div>
      </div>
    </div>
  );
}
