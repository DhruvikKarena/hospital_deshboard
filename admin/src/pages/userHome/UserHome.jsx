import "./userHome.css";
import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../../context/hospitalContext/HospitalContext";
import { getAllHospitals } from "../../context/hospitalContext/apiCalls";
import BackgroundLetterAvatar from "../../components/avatar/Avatar";
import Navbar from "../../components/navbar/Navbar";
import ImageLoader from '../../components/imageLoader/ImageLoader';

export default function UserHome() {

    const useGeoLocation = () => {

        const [location , setLocation] = useState({
            loaded: false,
            coordinates: {lat:"", lng:""}
        });
        
        const [loc, setLoc] = useState(false);

        const onSuccess = (location) => {
            setLocation({
                loaded: true,
                coordinates: {lat: location.coords.latitude , lng: location.coords.longitude}
            });
            setLoc(true);
        };

        useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onSuccess);
            }
            if(loc){
                getAllHospitals(cfr_location.coordinates, dispatch);
            }
        },[loc]);

        return location;
    }

    const {hospitals, dispatch} = useContext(HospitalContext);
    const cfr_location = useGeoLocation();

    return (
        <>
        <Navbar />
      <div className="featuredForPatient">
      <img className="coverimg"
        src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
        alt=""
      />
      </div>
    <div className="hospitalListForPatient">
    {hospitals.map((hospital) => 
    <div key={hospital[0]._id} className="hospitalInfoForPatient">
    <div className="hospitalInfoItemForPatient">
        {hospital[0].profilePic !== undefined ? <ImageLoader key={hospital[0].profilePic} value={hospital[0].profilePic} varient={"circle"} /> :
        <div className="hospitalPic"><BackgroundLetterAvatar value={hospital[0].hospitalname}/></div>}
        <span className="hospitalInfoName">{hospital[0].hospitalname}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
    <span className="hospitalInfoBeds">Phone Number: </span>
        <span className="hospitalInfoBeds">{hospital[0].phone_number}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
    <span className="hospitalInfoBeds">Vacent Beds: </span>
        <span className="hospitalInfoBeds">{hospital[0].vacant_bed}</span>
    </div>

    <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Address: </span>
            <span className="hospitalInfoBeds">{hospital[0].address}</span>
        </div>

        <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Numbers of Doctors: </span>
            <span className="hospitalInfoBeds">{hospital[0].doctors_info.length}</span>
        </div>

        <div className="hospitalInfoItemForPatient">
        <span className="hospitalInfoBeds">Numbers of Patients: </span>
            <span className="hospitalInfoBeds">{hospital[0].patient_info.length}</span>
        </div>

    </div>)}
    </div>
      </>
    );
}