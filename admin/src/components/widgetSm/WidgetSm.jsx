import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useContext } from "react";
import BackgroundLetterAvatar, { getname } from "../../components/avatar/Avatar";
import { getDoctors } from "../../context/doctorContext/apiCalls";
import { DoctorContext } from "../../context/doctorContext/DoctorContext"


export default function WidgetSm() {
  const { doctors, dispatch } = useContext(DoctorContext);

  useEffect(() => {
    getDoctors(dispatch);
  },[dispatch]);

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
