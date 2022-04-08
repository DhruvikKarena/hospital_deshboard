import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import BackgroundLetterAvatar, { getname } from "../../components/avatar/Avatar";

export default function WidgetSm() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try{

        const res = await axios.get("/hospital/findDoctorinfo/"+JSON.parse(localStorage.getItem("user"))._id, {
          headers: {
            token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setDoctors(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getDoctors();
  },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Doctor's Information</span>
      <ul className="widgetSmList">
        {doctors.map((doctor) => ( 
        <li  key={doctor._id} className="widgetSmListItem">
          <div className="widgetSmImg">
              {doctor.profilePic !== undefined ? <img className="widgetSmImg" src={doctor.profilePic} alt=""/> :
            <div className="avtimgdoc"><BackgroundLetterAvatar {...getname(doctor.username)}/></div>}
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{doctor.username}</span>
            <span className="widgetSmUserTitle">{doctor.specilized_in}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
